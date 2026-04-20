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
import { exportBuild, importBuild, exportToJSON, importFromJSON } from '@/utils/import-export.ts';
import { useState, useCallback } from 'react';

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

  const handleExport = useCallback(() => {
    const loadout = useBuildStore.getState().loadout;
    const config = useConfigStore.getState().config;
    const code = exportBuild(loadout, config);
    setExportText(code);
    setShowExportModal(true);
  }, []);

  const handleExportJSON = useCallback(() => {
    const loadout = useBuildStore.getState().loadout;
    const config = useConfigStore.getState().config;
    const json = exportToJSON(loadout, config);
    setExportText(json);
    setShowExportModal(true);
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
    navigator.clipboard.writeText(exportText).catch(() => {
      // Fallback: select text
    });
  }, [exportText]);

  return (
    <AppLayout
      onImport={() => setShowImportModal(true)}
      onExport={handleExport}
      onReset={handleReset}
    >
      <div className="flex flex-col flex-1 overflow-hidden">
        <TabBar />
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <TabContent />
          </div>
          <div className="w-80 border-l border-[#e94560]/20 p-4 overflow-y-auto">
            <CalcResultPanel />
            <DamageBreakdown />
          </div>
        </div>
      </div>

      {/* 导入弹窗 */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#0f3460] rounded-lg p-6 w-96 max-w-[90vw] space-y-4">
            <h3 className="text-lg font-bold">导入 BD</h3>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="粘贴 BD 代码或 JSON..."
              className="w-full h-32 bg-[#1a1a40] border border-[#e94560]/30 rounded px-3 py-2 text-sm resize-none"
            />
            {importError && (
              <div className="text-sm text-[#e94560]">{importError}</div>
            )}
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => { setShowImportModal(false); setImportText(''); setImportError(''); }}
                className="px-4 py-2 rounded bg-[#1a1a40] hover:bg-[#252550] text-sm"
              >
                取消
              </button>
              <button
                onClick={handleImport}
                className="px-4 py-2 rounded bg-[#e94560] hover:bg-[#d63850] text-white text-sm"
              >
                导入
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 导出弹窗 */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#0f3460] rounded-lg p-6 w-96 max-w-[90vw] space-y-4">
            <h3 className="text-lg font-bold">导出 BD</h3>
            <textarea
              value={exportText}
              readOnly
              className="w-full h-32 bg-[#1a1a40] border border-[#e94560]/30 rounded px-3 py-2 text-sm resize-none font-mono"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 rounded bg-[#1a1a40] hover:bg-[#252550] text-sm"
              >
                关闭
              </button>
              <button
                onClick={handleCopyExport}
                className="px-4 py-2 rounded bg-[#e94560] hover:bg-[#d63850] text-white text-sm"
              >
                复制
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
