import { create } from 'zustand';

type TabId = 'skill' | 'gear' | 'talent' | 'pactspirit' | 'memory' | 'slate' | 'config';

interface UIState {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  showDamageBreakdown: boolean;
  toggleDamageBreakdown: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  activeTab: 'skill',
  setActiveTab: (tab) => set({ activeTab: tab }),
  showDamageBreakdown: false,
  toggleDamageBreakdown: () => set((state) => ({
    showDamageBreakdown: !state.showDamageBreakdown,
  })),
}));
