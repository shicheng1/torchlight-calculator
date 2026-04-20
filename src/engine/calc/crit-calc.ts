import type { SkillTag } from '../types/mod.ts';
import type { AggregatedMods } from '../types/calc.ts';
import { BASE_CRIT_MULTIPLIER } from '../constants/defaults.ts';

export interface CritResult {
  critChance: number;       // 0-1
  critMultiplier: number;   // 伤害倍率（如 3.5 表示 350%）
  expectedCritDamage: number; // 暴击期望系数
}

/**
 * 计算暴击相关数值
 */
export function calcCrit(
  baseCritRating: number,
  aggregated: AggregatedMods,
  skillTags: SkillTag[],
  isMinion: boolean = false
): CritResult {
  const isAttack = skillTags.includes('attack');
  const modType = isMinion ? 'minion' : (isAttack ? 'attack' : 'spell');

  // === 暴击值计算 ===
  // INC 加成
  let incTotal = 0;
  for (const [mt, value] of Object.entries(aggregated.incCritRating)) {
    if (mt === 'global' || mt === modType) {
      incTotal += value ?? 0;
    }
  }

  // More 加成
  const moreMultipliers = aggregated.moreCritRating
    .filter(m => m.modType === 'global' || m.modType === modType)
    .map(m => 1 + m.value / 100);

  // 最终暴击值
  let finalRating = baseCritRating * (1 + incTotal / 100);
  for (const mult of moreMultipliers) {
    finalRating *= mult;
  }

  // 暴击率 = 最终暴击值 / 100，上限 100%
  const critChance = Math.min(1, finalRating / 100);

  // === 暴击伤害计算 ===
  let critDmgInc = 0;
  for (const [mt, value] of Object.entries(aggregated.incCritDmg)) {
    if (mt === 'global' || mt === modType) {
      critDmgInc += value ?? 0;
    }
  }

  const moreCritDmg = aggregated.moreCritDmg
    .filter(m => m.modType === 'global' || m.modType === modType)
    .map(m => 1 + m.value / 100);

  let critMultiplier = BASE_CRIT_MULTIPLIER * (1 + critDmgInc / 100);
  for (const mult of moreCritDmg) {
    critMultiplier *= mult;
  }

  // 暴击期望 = (1 × 不暴击率) + (暴击伤害 × 暴击率)
  const expectedCritDamage =
    (1 * (1 - critChance)) + (critMultiplier * critChance);

  return { critChance, critMultiplier, expectedCritDamage };
}
