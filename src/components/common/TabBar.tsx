import { useUIStore } from '@/stores/ui-store.ts';

const TABS = [
  { id: 'skill' as const, label: '技能' },
  { id: 'gear' as const, label: '装备' },
  { id: 'talent' as const, label: '天赋' },
  { id: 'pactspirit' as const, label: '契灵' },
  { id: 'memory' as const, label: '追忆' },
  { id: 'slate' as const, label: '石板' },
  { id: 'config' as const, label: '配置' },
];

export function TabBar() {
  const { activeTab, setActiveTab } = useUIStore();

  return (
    <div className="flex border-b border-[#e94560]/20 bg-[#16213e]/50">
      {TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 text-sm transition-colors relative ${
            activeTab === tab.id
              ? 'text-[#e94560] font-medium'
              : 'text-[#a0a0a0] hover:text-[#eaeaea]'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e94560]" />
          )}
        </button>
      ))}
    </div>
  );
}
