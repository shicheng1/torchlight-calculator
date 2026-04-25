import React, { useState, useEffect } from 'react';
import { dataService } from '@/data/sync/data-adapter.ts';
import type { SyncEvent } from '@/data/sync/types.ts';

const SyncStatus: React.FC = () => {
  const [status, setStatus] = useState(dataService.getSyncStatus());
  const [version, setVersion] = useState(dataService.getCurrentVersion());
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 监听同步事件
    const handleSyncEvent = (event: SyncEvent) => {
      setStatus(event.status);
      setProgress(event.progress || 0);
      setMessage(event.message || '');
      if (event.result?.version) {
        setVersion(event.result.version);
      }
    };

    dataService.onSyncEvent('sync_started', handleSyncEvent);
    dataService.onSyncEvent('sync_progress', handleSyncEvent);
    dataService.onSyncEvent('sync_completed', handleSyncEvent);
    dataService.onSyncEvent('sync_error', handleSyncEvent);

    // 初始化版本信息
    setVersion(dataService.getCurrentVersion());

    return () => {
      dataService.offSyncEvent('sync_started', handleSyncEvent);
      dataService.offSyncEvent('sync_progress', handleSyncEvent);
      dataService.offSyncEvent('sync_completed', handleSyncEvent);
      dataService.offSyncEvent('sync_error', handleSyncEvent);
    };
  }, []);

  const handleCheckUpdates = async () => {
    await dataService.checkForUpdates();
  };

  const getStatusText = () => {
    switch (status) {
      case 'idle':
        return '就绪';
      case 'checking':
        return '检查更新...';
      case 'downloading':
        return '下载数据...';
      case 'processing':
        return '处理数据...';
      case 'completed':
        return '同步完成';
      case 'error':
        return '同步失败';
      default:
        return '未知状态';
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case 'idle':
        return 'text-gray-600';
      case 'checking':
      case 'downloading':
      case 'processing':
        return 'text-blue-600';
      case 'completed':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700">数据同步</h3>
        <button
          onClick={handleCheckUpdates}
          disabled={status !== 'idle' && status !== 'completed' && status !== 'error'}
          className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          检查更新
        </button>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-500">状态:</span>
          <span className={getStatusClass()}>{getStatusText()}</span>
        </div>
        
        {version && (
          <div className="flex justify-between">
            <span className="text-gray-500">版本:</span>
            <span className="text-gray-700">{version.version}</span>
          </div>
        )}
        
        {message && (
          <div className="flex justify-between">
            <span className="text-gray-500">详情:</span>
            <span className="text-gray-700 truncate max-w-[200px]">{message}</span>
          </div>
        )}
        
        {(status === 'downloading' || status === 'processing') && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-right mt-1 text-gray-500">
              {Math.round(progress)}%
            </div>
          </div>
        )}
        
        <div className="mt-4 text-xs text-gray-500">
          <p>自动同步: 每小时检查一次更新</p>
          <p>数据来源: 官方编年史</p>
        </div>
      </div>
    </div>
  );
};

export default SyncStatus;
