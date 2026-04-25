import type { GameVersion, SyncStatus, SyncResult, DataType, SyncConfig, DataSourceConfig, SyncEvent } from './types.ts';

class SyncManager {
  private syncStatus: SyncStatus = 'idle';
  private currentVersion: GameVersion | null = null;
  private config: SyncConfig;
  private dataSource: DataSourceConfig;
  private eventListeners: Map<string, ((event: SyncEvent) => void)[]> = new Map();
  private retryCount: number = 0;
  private syncIntervalId: number | null = null;

  constructor(config: Partial<SyncConfig> = {}, dataSource: Partial<DataSourceConfig> = {}) {
    this.config = {
      autoSync: config.autoSync ?? true,
      syncInterval: config.syncInterval ?? 3600, // 1小时
      retryAttempts: config.retryAttempts ?? 3,
      maxRetries: config.maxRetries ?? 5,
    };

    this.dataSource = {
      baseUrl: dataSource.baseUrl ?? 'https://api.torchlightinfinite.com/data',
      apiKey: dataSource.apiKey,
      timeout: dataSource.timeout ?? 30000, // 30秒
    };

    // 初始化时加载本地版本信息
    this.loadLocalVersion();

    // 启动自动同步
    if (this.config.autoSync) {
      this.startAutoSync();
    }
  }

  private loadLocalVersion(): void {
    try {
      const storedVersion = localStorage.getItem('torchlight_sync_version');
      if (storedVersion) {
        this.currentVersion = JSON.parse(storedVersion);
      }
    } catch (error) {
      console.error('Failed to load local version:', error);
    }
  }

  private saveLocalVersion(version: GameVersion): void {
    try {
      localStorage.setItem('torchlight_sync_version', JSON.stringify(version));
      this.currentVersion = version;
    } catch (error) {
      console.error('Failed to save local version:', error);
    }
  }

  private startAutoSync(): void {
    if (this.syncIntervalId) {
      clearInterval(this.syncIntervalId);
    }

    this.syncIntervalId = window.setInterval(() => {
      this.checkForUpdates();
    }, this.config.syncInterval * 1000);
  }

  private stopAutoSync(): void {
    if (this.syncIntervalId) {
      clearInterval(this.syncIntervalId);
      this.syncIntervalId = null;
    }
  }

  private emitEvent(event: SyncEvent): void {
    const listeners = this.eventListeners.get(event.type) || [];
    listeners.forEach(listener => listener(event));
  }

  on(event: SyncEvent['type'], listener: (event: SyncEvent) => void): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(listener);
  }

  off(event: SyncEvent['type'], listener: (event: SyncEvent) => void): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      this.eventListeners.set(event, listeners.filter(l => l !== listener));
    }
  }

  async checkForUpdates(): Promise<SyncResult> {
    if (this.syncStatus !== 'idle') {
      return {
        success: false,
        error: 'Sync already in progress',
      };
    }

    this.syncStatus = 'checking';
    this.emitEvent({
      type: 'sync_started',
      status: this.syncStatus,
      message: 'Checking for updates...',
    });

    try {
      // 添加超时处理
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.dataSource.timeout);
      
      const response = await fetch(`${this.dataSource.baseUrl}/version`, {
        headers: this.dataSource.apiKey ? { 'X-API-Key': this.dataSource.apiKey } : {},
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Failed to check version: ${response.status}`);
      }

      const latestVersion: GameVersion = await response.json();

      // 检查是否需要更新
      if (!this.currentVersion || latestVersion.version !== this.currentVersion.version || latestVersion.dataHash !== this.currentVersion.dataHash) {
        return this.performSync(latestVersion);
      }

      this.syncStatus = 'completed';
      this.emitEvent({
        type: 'sync_completed',
        status: this.syncStatus,
        message: 'Data is already up to date',
        result: {
          success: true,
          version: this.currentVersion,
        },
      });

      return {
        success: true,
        version: this.currentVersion,
      };
    } catch (error) {
      this.syncStatus = 'error';
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      this.emitEvent({
        type: 'sync_error',
        status: this.syncStatus,
        message: `Failed to check for updates: ${errorMessage}`,
        result: {
          success: false,
          error: errorMessage,
        },
      });

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  private async performSync(latestVersion: GameVersion): Promise<SyncResult> {
    this.syncStatus = 'downloading';
    this.emitEvent({
      type: 'sync_progress',
      status: this.syncStatus,
      progress: 0,
      message: 'Downloading latest data...',
    });

    try {
      const updatedData: string[] = [];
      const dataTypes: DataType[] = ['skills', 'talents', 'gear', 'pactspirit', 'heroes', 'slate', 'hero-memory'];

      for (let i = 0; i < dataTypes.length; i++) {
        const dataType = dataTypes[i];
        await this.downloadAndProcessData(dataType, latestVersion);
        updatedData.push(dataType);

        const progress = ((i + 1) / dataTypes.length) * 100;
        this.emitEvent({
          type: 'sync_progress',
          status: this.syncStatus,
          progress,
          message: `Downloading ${dataType} data...`,
        });
      }

      this.saveLocalVersion(latestVersion);
      this.syncStatus = 'completed';
      this.retryCount = 0;

      const result: SyncResult = {
        success: true,
        version: latestVersion,
        updatedData,
      };

      this.emitEvent({
        type: 'sync_completed',
        status: this.syncStatus,
        message: 'Data sync completed successfully',
        result,
      });

      return result;
    } catch (error) {
      this.syncStatus = 'error';
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // 重试逻辑
      if (this.retryCount < this.config.retryAttempts) {
        this.retryCount++;
        this.emitEvent({
          type: 'sync_error',
          status: this.syncStatus,
          message: `Sync failed, retrying (${this.retryCount}/${this.config.retryAttempts})...`,
        });
        
        // 延迟重试
        await new Promise(resolve => setTimeout(resolve, 1000 * this.retryCount));
        return this.performSync(latestVersion);
      }

      this.emitEvent({
        type: 'sync_error',
        status: this.syncStatus,
        message: `Sync failed after ${this.retryCount} attempts: ${errorMessage}`,
        result: {
          success: false,
          error: errorMessage,
        },
      });

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  private async downloadAndProcessData(dataType: DataType, version: GameVersion): Promise<void> {
    // 添加超时处理
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.dataSource.timeout);
    
    const response = await fetch(`${this.dataSource.baseUrl}/${dataType}`, {
      headers: this.dataSource.apiKey ? { 'X-API-Key': this.dataSource.apiKey } : {},
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to download ${dataType} data: ${response.status}`);
    }

    const data = await response.json();

    // 验证数据
    if (!this.validateData(dataType, data)) {
      throw new Error(`Invalid ${dataType} data`);
    }

    // 存储数据
    this.storeData(dataType, data, version);
  }

  private validateData(dataType: DataType, data: any): boolean {
    // 简单的验证逻辑，实际项目中可能需要更复杂的验证
    switch (dataType) {
      case 'skills':
        return typeof data === 'object' && data !== null;
      case 'talents':
        return Array.isArray(data) || (typeof data === 'object' && data !== null);
      case 'gear':
        return typeof data === 'object' && data !== null;
      case 'pactspirit':
        return typeof data === 'object' && data !== null;
      case 'heroes':
        return typeof data === 'object' && data !== null;
      case 'slate':
        return typeof data === 'object' && data !== null;
      case 'hero-memory':
        return typeof data === 'object' && data !== null;
      default:
        return false;
    }
  }

  private storeData(dataType: DataType, data: any, version: GameVersion): void {
    try {
      const dataFile = {
        type: dataType,
        version: version.version,
        lastUpdated: Date.now(),
        data,
      };

      localStorage.setItem(`torchlight_data_${dataType}`, JSON.stringify(dataFile));
    } catch (error) {
      console.error(`Failed to store ${dataType} data:`, error);
      throw new Error(`Failed to store ${dataType} data`);
    }
  }

  getData<T>(dataType: DataType): T | null {
    try {
      const storedData = localStorage.getItem(`torchlight_data_${dataType}`);
      if (storedData) {
        const dataFile = JSON.parse(storedData);
        return dataFile.data as T;
      }
      return null;
    } catch (error) {
      console.error(`Failed to get ${dataType} data:`, error);
      return null;
    }
  }

  getStatus(): SyncStatus {
    return this.syncStatus;
  }

  getCurrentVersion(): GameVersion | null {
    return this.currentVersion;
  }

  setConfig(config: Partial<SyncConfig>): void {
    this.config = {
      ...this.config,
      ...config,
    };

    if (this.config.autoSync) {
      this.startAutoSync();
    } else {
      this.stopAutoSync();
    }
  }

  setDataSource(dataSource: Partial<DataSourceConfig>): void {
    this.dataSource = {
      ...this.dataSource,
      ...dataSource,
    };
  }

  destroy(): void {
    this.stopAutoSync();
    this.eventListeners.clear();
  }
}

// 导出单例实例
export const syncManager = new SyncManager();
export default SyncManager;
