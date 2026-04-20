import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CalculationConfig } from '@/engine/types/calc.ts';
import { DEFAULT_CONFIG } from '@/engine/constants/defaults.ts';

interface ConfigState {
  config: CalculationConfig;
  updateConfig: (partial: Partial<CalculationConfig>) => void;
  resetConfig: () => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      config: { ...DEFAULT_CONFIG },

      updateConfig: (partial) => set((state) => ({
        config: { ...state.config, ...partial }
      })),

      resetConfig: () => set({ config: { ...DEFAULT_CONFIG } }),
    }),
    {
      name: 'torchlight-config',
    }
  )
);
