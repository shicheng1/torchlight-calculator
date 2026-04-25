// 游戏版本信息
export interface GameVersion {
  version: string;
  timestamp: number;
  dataHash: string;
}

// 同步状态
export type SyncStatus = 'idle' | 'checking' | 'downloading' | 'processing' | 'completed' | 'error';

// 同步结果
export interface SyncResult {
  success: boolean;
  version?: GameVersion;
  error?: string;
  updatedData?: string[];
}

// 数据类型
export type DataType = 'skills' | 'talents' | 'gear' | 'pactspirit' | 'heroes' | 'slate' | 'hero-memory';

// 同步配置
export interface SyncConfig {
  autoSync: boolean;
  syncInterval: number; // 秒
  retryAttempts: number;
  maxRetries: number;
}

// 数据源配置
export interface DataSourceConfig {
  baseUrl: string;
  apiKey?: string;
  timeout: number;
}

// 数据文件结构
export interface DataFile {
  type: DataType;
  version: string;
  lastUpdated: number;
  data: any;
}

// 同步事件
export interface SyncEvent {
  type: 'sync_started' | 'sync_progress' | 'sync_completed' | 'sync_error';
  status: SyncStatus;
  progress?: number;
  message?: string;
  result?: SyncResult;
}
