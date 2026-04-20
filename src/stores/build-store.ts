import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Loadout, PactspiritConfig, HeroMemoryConfig, DivinitySlateConfig } from '@/engine/types/calc.ts';
import type { EquipmentSlot } from '@/engine/types/gear.ts';

interface BuildState {
  loadout: Loadout;
  // 英雄
  setHero: (heroId: string, traitId: string) => void;
  setLevel: (level: number) => void;
  // 技能
  setActiveSkill: (groupIndex: number, skillId: string) => void;
  setSkillLevel: (groupIndex: number, isSupport: boolean, supportIndex: number, level: number) => void;
  addSupportSkill: (groupIndex: number, skillId: string) => void;
  removeSupportSkill: (groupIndex: number, supportIndex: number) => void;
  addSkillGroup: () => void;
  removeSkillGroup: (index: number) => void;
  setSelectedSkillGroup: (index: number) => void;
  // 装备
  setGear: (slot: EquipmentSlot, gear: import('@/engine/types/gear.ts').GearInstance | null) => void;
  clearGear: (slot: EquipmentSlot) => void;
  // 天赋板选择
  setTalentBoards: (boardIds: string[]) => void;
  // 天赋点
  setTalentPoints: (nodeId: string, points: number) => void;
  // 核心天赋
  setCoreTalent: (boardId: string, slotIndex: number, optionId: string | null) => void;
  // 契灵
  setPactspirit: (slot: number, config: PactspiritConfig | null) => void;
  // 追忆
  setHeroMemory: (slot: number, config: HeroMemoryConfig | null) => void;
  // 石板
  addSlate: (config: DivinitySlateConfig) => void;
  removeSlate: (index: number) => void;
  // 导入/导出
  importBuild: (loadout: Loadout) => void;
  exportBuild: () => Loadout;
  // 重置
  resetBuild: () => void;
}

const defaultSkillGroup = {
  activeSkill: { skillId: 'summon_spider_tank', level: 20, quality: 0, enabled: true },
  supportSkills: [] as { skillId: string; level: number; quality: number; enabled: boolean }[],
  enabled: true,
};

const defaultLoadout: Loadout = {
  hero: { heroId: 'moto', traitId: 'moto_charge_summon', level: 95 },
  gear: {
    weapon_main: null, weapon_off: null,
    helmet: null, chest: null, gloves: null, boots: null,
    neck: null, ring1: null, ring2: null, belt: null,
  },
  skillGroups: [{ ...defaultSkillGroup }],
  selectedSkillGroupIndex: 0,
  talentBoards: [], // 最多选择4个天赋板
  talents: [],
  coreTalents: [],
  divinitySlates: [],
  heroMemories: [],
  pactspirits: [],
};

export const useBuildStore = create<BuildState>()(
  persist(
    (set, get) => ({
      loadout: { ...defaultLoadout },

      setHero: (heroId, traitId) => set((state) => ({
        loadout: { ...state.loadout, hero: { ...state.loadout.hero, heroId, traitId } }
      })),

      setLevel: (level) => set((state) => ({
        loadout: { ...state.loadout, hero: { ...state.loadout.hero, level } }
      })),

      setActiveSkill: (groupIndex, skillId) => set((state) => {
        const groups = [...state.loadout.skillGroups];
        groups[groupIndex] = {
          ...groups[groupIndex],
          activeSkill: { ...groups[groupIndex].activeSkill, skillId },
        };
        return { loadout: { ...state.loadout, skillGroups: groups } };
      }),

      setSkillLevel: (groupIndex, isSupport, supportIndex, level) => set((state) => {
        const groups = [...state.loadout.skillGroups];
        if (isSupport) {
          const supports = [...groups[groupIndex].supportSkills];
          supports[supportIndex] = { ...supports[supportIndex], level };
          groups[groupIndex] = { ...groups[groupIndex], supportSkills: supports };
        } else {
          groups[groupIndex] = {
            ...groups[groupIndex],
            activeSkill: { ...groups[groupIndex].activeSkill, level },
          };
        }
        return { loadout: { ...state.loadout, skillGroups: groups } };
      }),

      addSupportSkill: (groupIndex, skillId) => set((state) => {
        const groups = [...state.loadout.skillGroups];
        groups[groupIndex] = {
          ...groups[groupIndex],
          supportSkills: [
            ...groups[groupIndex].supportSkills,
            { skillId, level: 20, quality: 0, enabled: true },
          ],
        };
        return { loadout: { ...state.loadout, skillGroups: groups } };
      }),

      removeSupportSkill: (groupIndex, supportIndex) => set((state) => {
        const groups = [...state.loadout.skillGroups];
        const supports = groups[groupIndex].supportSkills.filter((_, i) => i !== supportIndex);
        groups[groupIndex] = { ...groups[groupIndex], supportSkills: supports };
        return { loadout: { ...state.loadout, skillGroups: groups } };
      }),

      addSkillGroup: () => set((state) => ({
        loadout: {
          ...state.loadout,
          skillGroups: [...state.loadout.skillGroups, { ...defaultSkillGroup }],
        }
      })),

      removeSkillGroup: (index) => set((state) => {
        const groups = state.loadout.skillGroups.filter((_, i) => i !== index);
        const selected = Math.min(state.loadout.selectedSkillGroupIndex, Math.max(0, groups.length - 1));
        return { loadout: { ...state.loadout, skillGroups: groups, selectedSkillGroupIndex: selected } };
      }),

      setSelectedSkillGroup: (index) => set((state) => ({
        loadout: { ...state.loadout, selectedSkillGroupIndex: index }
      })),

      setGear: (slot, gear) => set((state) => ({
        loadout: { ...state.loadout, gear: { ...state.loadout.gear, [slot]: gear } }
      })),

      clearGear: (slot) => set((state) => ({
        loadout: { ...state.loadout, gear: { ...state.loadout.gear, [slot]: null } }
      })),

      setTalentBoards: (boardIds) => set((state) => ({
        loadout: { ...state.loadout, talentBoards: boardIds.slice(0, 4) } // 最多4个天赋板
      })),

      setTalentBoardsWithCleanup: (boardIds: string[], boardToRemove?: string) => set((state) => {
    const newBoards = boardIds.slice(0, 4);
    // 清理被移除天赋板的天赋点和核心天赋
    let newTalents = [...state.loadout.talents];
    let newCoreTalents = Array.isArray(state.loadout.coreTalents) ? [...state.loadout.coreTalents] : [];

    if (boardToRemove) {
      const boardData = getAllTalentBoards().find(b => b.id === boardToRemove);
      if (boardData) {
        const nodeIdsToRemove = boardData.nodes.map(n => n.id);
        newTalents = state.loadout.talents.filter(t => !nodeIdsToRemove.includes(t.nodeId));
        newCoreTalents = (Array.isArray(state.loadout.coreTalents) ? state.loadout.coreTalents : []).filter(
          ct => ct.boardId !== boardToRemove
        );
      }
    }

    return {
      loadout: {
        ...state.loadout,
        talentBoards: newBoards,
        talents: newTalents,
        coreTalents: newCoreTalents
      }
    };
  }),

      setTalentPoints: (nodeId, points) => set((state) => {
        const talents = state.loadout.talents.map(t =>
          t.nodeId === nodeId ? { ...t, points } : t
        );
        const existing = talents.find(t => t.nodeId === nodeId);
        if (!existing && points > 0) {
          talents.push({ nodeId, points });
        }
        return { loadout: { ...state.loadout, talents } };
      }),

      setCoreTalent: (boardId, slotIndex, optionId) => set((state) => {
        const coreTalents = Array.isArray(state.loadout.coreTalents) ? state.loadout.coreTalents.filter(
          ct => !(ct.boardId === boardId && ct.slotIndex === slotIndex)
        ) : [];
        if (optionId !== null) {
          coreTalents.push({ boardId, slotIndex, optionId });
        }
        return { loadout: { ...state.loadout, coreTalents } };
      }),

      setPactspirit: (slot, config) => set((state) => {
        const pactspirits = [...state.loadout.pactspirits];
        if (config === null) {
          pactspirits[slot] = undefined as never;
          // Remove undefined entries
          const filtered = pactspirits.filter(Boolean);
          return { loadout: { ...state.loadout, pactspirits: filtered } };
        }
        // Ensure array is long enough
        while (pactspirits.length <= slot) {
          pactspirits.push(undefined as never);
        }
        pactspirits[slot] = config;
        return { loadout: { ...state.loadout, pactspirits: pactspirits.filter(Boolean) } };
      }),

      setHeroMemory: (slot, config) => set((state) => {
        const heroMemories = [...state.loadout.heroMemories];
        if (config === null) {
          heroMemories[slot] = undefined as never;
          const filtered = heroMemories.filter(Boolean);
          return { loadout: { ...state.loadout, heroMemories: filtered } };
        }
        while (heroMemories.length <= slot) {
          heroMemories.push(undefined as never);
        }
        heroMemories[slot] = config;
        return { loadout: { ...state.loadout, heroMemories: heroMemories.filter(Boolean) } };
      }),

      addSlate: (config) => set((state) => ({
        loadout: {
          ...state.loadout,
          divinitySlates: [...state.loadout.divinitySlates, config],
        }
      })),

      removeSlate: (index) => set((state) => ({
        loadout: {
          ...state.loadout,
          divinitySlates: state.loadout.divinitySlates.filter((_, i) => i !== index),
        }
      })),

      importBuild: (loadout) => set({ loadout }),

      exportBuild: () => get().loadout,

      resetBuild: () => set({ loadout: { ...defaultLoadout } }),
    }),
    {
      name: 'torchlight-build',
    }
  )
);
