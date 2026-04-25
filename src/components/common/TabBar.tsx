import { useUIStore } from '@/stores/ui-store.ts';

const TABS = [
  { id: 'skill' as const, label: '技能', icon: '⚔️' },
  { id: 'gear' as const, label: '装备', icon: '🛡️' },
  { id: 'talent' as const, label: '天赋', icon: '🎯' },
  { id: 'pactspirit' as const, label: '契灵', icon: '👻' },
  { id: 'memory' as const, label: '追忆', icon: '💭' },
  { id: 'slate' as const, label: '石板', icon: '📜' },
  { id: 'config' as const, label: '配置', icon: '⚙️' },
];

export function TabBar() {
  const { activeTab, setActiveTab } = useUIStore();

  return (
    <div className="flex border-b border-[#e94560]/20 bg-[#16213e] shadow-md shadow-[#000]/20 overflow-x-auto scrollbar-hide">
      {TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-5 py-3 text-sm transition-all duration-200 relative whitespace-nowrap ${
            activeTab === tab.id
              ? 'text-[#e94560] font-medium'
              : 'text-[#a0a0a0] hover:text-[#eaeaea]'
          }`}
        >
          <span className="text-lg">{tab.icon}</span>
          <span>{tab.label}</span>
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#e94560] to-[#ff6b35] shadow-sm shadow-[#e94560]/50" />
          )}
        </button>
      ))}
    </div>
  );
}
