import { useMemo } from 'react';
import { useBuildStore } from '@/stores/build-store.ts';
import { useConfigStore } from '@/stores/config-store.ts';
import { calculate } from '@/engine/pipeline.ts';
import type { CalculationResult } from '@/engine/types/calc.ts';

export function useCalculation(): CalculationResult {
  const loadout = useBuildStore((s) => s.loadout);
  const config = useConfigStore((s) => s.config);

  return useMemo(() => {
    try {
      return calculate(loadout, config);
    } catch (e) {
      console.error('Calculation error:', e);
      return createEmptyResult();
    }
  }, [loadout, config]);
}

function createEmptyResult(): CalculationResult {
  return {
    totalDPS: 0,
    hitDPS: 0,
    totalHitDamage: 0,
    critChance: 0,
    critMultiplier: 1.5,
    expectedCritDamage: 1,
    doubleDmgChance: 0,
    expectedDoubleDmg: 1,
    attacksPerSecond: 0,
    damageBreakdown: {
      physical: { baseDamage: 0, incTotal: 0, moreMultipliers: [], finalHitDamage: 0, afterResist: 0, afterArmor: 0 },
      fire: { baseDamage: 0, incTotal: 0, moreMultipliers: [], finalHitDamage: 0, afterResist: 0, afterArmor: 0 },
      cold: { baseDamage: 0, incTotal: 0, moreMultipliers: [], finalHitDamage: 0, afterResist: 0, afterArmor: 0 },
      lightning: { baseDamage: 0, incTotal: 0, moreMultipliers: [], finalHitDamage: 0, afterResist: 0, afterArmor: 0 },
      erosion: { baseDamage: 0, incTotal: 0, moreMultipliers: [], finalHitDamage: 0, afterResist: 0, afterArmor: 0 },
    },
    incBreakdown: [],
    moreBreakdown: [],
    effectiveResistances: { physical: 0, fire: 0, cold: 0, lightning: 0, erosion: 0 },
    armorMitigation: 0,
  };
}
