import { AppLayout } from '@/components/layout/AppLayout.tsx';
import { TabBar } from '@/components/common/TabBar.tsx';
import { SkillPanel } from '@/components/skill/SkillPanel.tsx';
import { GearPanel } from '@/components/gear/GearPanel.tsx';
import { TalentPanel } from '@/components/talent/TalentPanel.tsx';
import { PactspiritPanel } from '@/components/pactspirit/PactspiritPanel.tsx';
import { MemoryPanel } from '@/components/memory/MemoryPanel.tsx';
import { SlatePanel } from '@/components/slate/SlatePanel.tsx';
import { ConfigPanel } from '@/components/config/ConfigPanel.tsx';
import { CalcResultPanel } from '@/components/calc-result/CalcResultPanel.tsx';
import { DamageBreakdown } from '@/components/calc-result/DamageBreakdown.tsx';
import { useUIStore } from '@/stores/ui-store.ts';
import { useBuildStore } from '@/stores/build-store.ts';
import { useConfigStore } from '@/stores/config-store.ts';
import { exportBuild, importBuild, importFromJSON, generateShareLink, importFromUrl } from '@/utils/import-export.ts';
import { useState, useCallback, useEffect } from 'react';

function TabContent() {
  const activeTab = useUIStore((s) => s.activeTab);

  switch (activeTab) {
    case 'skill':
      return <SkillPanel />;
    case 'gear':
      return <GearPanel />;
    case 'talent':
      return <TalentPanel />;
    case 'pactspirit':
      return <PactspiritPanel />;
    case 'memory':
      return <MemoryPanel />;
    case 'slate':
      return <SlatePanel />;
    case 'config':
      return <ConfigPanel />;
    default:
      return <SkillPanel />;
  }
}

export default function App() {
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportText, setExportText] = useState('');
  const [shareLink, setShareLink] = useState('');
  const [isMobileResultOpen, setIsMobileResultOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // 从URL导入配置
  useEffect(() => {
    const result = importFromUrl();
    if (result) {
      useBuildStore.getState().importBuild(result.loadout);
      useConfigStore.getState().updateConfig(result.config);
    }
  }, []);

  const handleExport = useCallback(() => {
    const loadout = useBuildStore.getState().loadout;
    const config = useConfigStore.getState().config;
    const code = exportBuild(loadout, config);
    const link = generateShareLink(loadout, config);
    setExportText(code);
    setShareLink(link);
    setShowExportModal(true);
    setCopySuccess(false);
  }, []);

  const handleImport = useCallback(() => {
    setImportError('');
    const result = importBuild(importText) ?? importFromJSON(importText);
    if (result) {
      useBuildStore.getState().importBuild(result.loadout);
      useConfigStore.getState().updateConfig(result.config);
      setShowImportModal(false);
      setImportText('');
    } else {
      setImportError('导入失败：无效的 BD 数据');
    }
  }, [importText]);

  const handleReset = useCallback(() => {
    if (window.confirm('确定要重置所有配置吗？此操作不可撤销。')) {
      useBuildStore.getState().resetBuild();
      useConfigStore.getState().resetConfig();
    }
  }, []);

  const handleCopyExport = useCallback(() => {
    navigator.clipboard.writeText(exportText).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }).catch(() => {
      // Fallback: select text
    });
  }, [exportText]);

  const handleCopyShareLink = useCallback(() => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }).catch(() => {
      // Fallback: select text
    });
  }, [shareLink]);

  return (
    <AppLayout
      onImport={() => setShowImportModal(true)}
      onExport={handleExport}
      onReset={handleReset}
    >
      <div className="flex flex-col flex-1 overflow-hidden">
        <TabBar />
        
        {/* 主体内容区 */}
        <div className="flex flex-1 overflow-hidden">
          {/* 左侧配置区域 */}
          <div className="flex-1 overflow-hidden">
            <TabContent />
          </div>
          
          {/* 右侧计算结果面板 - 桌面端 */}
          <div className="hidden md:block w-96 border-l border-[#e94560]/20 p-5 overflow-y-auto bg-[#16213e]/80 shadow-lg shadow-[#000]/30">
            <CalcResultPanel />
            <DamageBreakdown />
          </div>
        </div>
        
        {/* 移动端计算结果按钮 */}
        <div className="md:hidden fixed bottom-4 right-4 z-40">
          <button
            onClick={() => setIsMobileResultOpen(!isMobileResultOpen)}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#e94560] hover:bg-[#d63850] text-white shadow-lg shadow-[#e94560]/30 transition-all duration-300"
          >
            <span className="text-lg">📊</span>
            <span className="font-medium">{isMobileResultOpen ? '收起结果' : '查看结果'}</span>
          </button>
        </div>
        
        {/* 移动端计算结果面板 */}
        {isMobileResultOpen && (
          <div className="md:hidden fixed inset-x-0 bottom-0 z-30 bg-[#16213e] border-t border-[#e94560]/30 shadow-lg shadow-[#000]/50 max-h-[80vh] overflow-y-auto">
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#e94560]">计算结果</h3>
                <button
                  onClick={() => setIsMobileResultOpen(false)}
                  className="px-3 py-1 rounded-full bg-[#1a1a40] hover:bg-[#252550] transition-colors"
                >
                  ✕
                </button>
              </div>
              <CalcResultPanel />
              <DamageBreakdown />
            </div>
          </div>
        )}
      </div>

      {/* 导入弹窗 */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-[#0f3460] to-[#16213e] rounded-xl p-6 w-96 max-w-[90vw] space-y-4 shadow-2xl shadow-[#000]/50">
            <h3 className="text-lg font-bold text-[#e94560]">导入 BD</h3>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="粘贴 BD 代码或 JSON..."
              className="w-full h-40 bg-[#1a1a40] border border-[#e94560]/30 rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#e94560]/50 focus:border-transparent transition-all"
            />
            {importError && (
              <div className="text-sm text-[#e94560] bg-[#e94560]/10 border border-[#e94560]/30 rounded-lg p-3">
                {importError}
              </div>
            )}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setShowImportModal(false); setImportText(''); setImportError(''); }}
                className="px-4 py-2 rounded-lg bg-[#1a1a40] hover:bg-[#252550] text-sm transition-all duration-200"
              >
                取消
              </button>
              <button
                onClick={handleImport}
                className="px-4 py-2 rounded-lg bg-[#e94560] hover:bg-[#d63850] text-white text-sm transition-all duration-200 shadow-md shadow-[#e94560]/20"
              >
                导入
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 导出弹窗 */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-[#0f3460] to-[#16213e] rounded-xl p-6 w-96 max-w-[90vw] space-y-4 shadow-2xl shadow-[#000]/50">
            <h3 className="text-lg font-bold text-[#e94560]">导出 BD</h3>
            
            {/* 分享链接 */}
            <div>
              <label className="block text-xs text-[#a0a0a0] mb-2 font-medium">分享链接</label>
              <div className="flex gap-2">
                <input
                  value={shareLink}
                  readOnly
                  className="flex-1 bg-[#1a1a40] border border-[#e94560]/30 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]/50 focus:border-transparent transition-all"
                />
                <button
                  onClick={handleCopyShareLink}
                  className="px-3 py-2 rounded-lg bg-[#e94560] hover:bg-[#d63850] text-white text-sm transition-all duration-200 shadow-md shadow-[#e94560]/20 whitespace-nowrap"
                >
                  {copySuccess ? '已复制！' : '复制'}
                </button>
              </div>
            </div>
            
            {/* 配置代码 */}
            <div>
              <label className="block text-xs text-[#a0a0a0] mb-2 font-medium">配置代码</label>
              <textarea
                value={exportText}
                readOnly
                className="w-full h-32 bg-[#1a1a40] border border-[#e94560]/30 rounded-lg px-4 py-3 text-sm resize-none font-mono focus:outline-none focus:ring-2 focus:ring-[#e94560]/50 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 rounded-lg bg-[#1a1a40] hover:bg-[#252550] text-sm transition-all duration-200"
              >
                关闭
              </button>
              <button
                onClick={handleCopyExport}
                className="px-4 py-2 rounded-lg bg-[#e94560] hover:bg-[#d63850] text-white text-sm transition-all duration-200 shadow-md shadow-[#e94560]/20"
              >
                {copySuccess ? '已复制！' : '复制代码'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
