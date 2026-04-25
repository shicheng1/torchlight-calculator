import { useState, useEffect, useMemo } from 'react';
import { useBuildStore } from '@/stores/build-store.ts';
import { useConfigStore } from '@/stores/config-store.ts';
import { calculate } from '@/engine/pipeline.ts';
import type { CalculationResult } from '@/engine/types/calc.ts';

// 缓存计算结果，避免重复计算
let lastLoadout: any = null;
let lastConfig: any = null;
let lastResult: CalculationResult | null = null;

export function useCalculation(): CalculationResult {
  const loadout = useBuildStore((s) => s.loadout);
  const config = useConfigStore((s) => s.config);
  const [result, setResult] = useState<CalculationResult>(createEmptyResult());

  // 检查是否需要重新计算
  const needsRecalculation = useMemo(() => {
    return !lastResult || 
      JSON.stringify(loadout) !== JSON.stringify(lastLoadout) ||
      JSON.stringify(config) !== JSON.stringify(lastConfig);
  }, [loadout, config]);

  useEffect(() => {
    if (needsRecalculation) {
      const calculateResult = async () => {
        try {
          const newResult = await calculate(loadout, config);
          // 更新缓存
          lastLoadout = JSON.parse(JSON.stringify(loadout));
          lastConfig = JSON.parse(JSON.stringify(config));
          lastResult = newResult;
          setResult(newResult);
        } catch (e) {
          console.error('Calculation error:', e);
          setResult(createEmptyResult());
        }
      };

      calculateResult();
    }
  }, [needsRecalculation, loadout, config]);

  // 如果有缓存结果，直接返回
  if (lastResult && !needsRecalculation) {
    return lastResult;
  }

  return result;
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
