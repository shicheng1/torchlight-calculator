import type { SkillTag } from '../types/mod.ts';
import type { AggregatedMods } from '../types/calc.ts';
import { BASE_CRIT_MULTIPLIER } from '../constants/defaults.ts';

export interface CritResult {
  critChance: number;       // 0-1
  critMultiplier: number;   // 伤害倍率（如 3.5 表示 350%）
  expectedCritDamage: number; // 暴击期望系数
  critRatingBreakdown: {
    base: number;
    flat: number;
    inc: number;
    more: number[];
    final: number;
  };
  critDmgBreakdown: {
    base: number;
    inc: number;
    more: number[];
    final: number;
  };
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
  
  // 技能标签相关的暴击类型
  const relevantCritTypes = [modType, 'global'];
  if (skillTags.includes('projectile')) relevantCritTypes.push('projectile');
  if (skillTags.includes('melee')) relevantCritTypes.push('melee');
  if (isAttack && skillTags.includes('ranged')) relevantCritTypes.push('ranged_attack');

  // === 暴击值计算 ===
  // 基础暴击值
  let finalRating = baseCritRating;
  
  // 固定暴击值加成（Flat Crit Rating）
  let flatCritRating = 0;
  for (const [mt, value] of Object.entries(aggregated.flatCritRating)) {
    if (relevantCritTypes.includes(mt)) {
      flatCritRating += value ?? 0;
    }
  }
  
  // INC 加成
  let incTotal = 0;
  for (const [mt, value] of Object.entries(aggregated.incCritRating)) {
    if (relevantCritTypes.includes(mt)) {
      incTotal += value ?? 0;
    }
  }

  // More 加成
  const moreMultipliers = aggregated.moreCritRating
    .filter(m => relevantCritTypes.includes(m.modType))
    .map(m => 1 + m.value / 100);

  // 应用加成
  finalRating = (baseCritRating + flatCritRating) * (1 + incTotal / 100);
  for (const mult of moreMultipliers) {
    finalRating *= mult;
  }

  // 暴击率 = 最终暴击值 / 100，上限 100%
  const critChance = Math.min(1, finalRating / 100);

  // === 暴击伤害计算 ===
  let critDmgInc = 0;
  
  // 基础暴击伤害类型
  const relevantCritDmgTypes = [modType, 'global'];
  
  // 按伤害类型添加暴击伤害加成
  if (skillTags.includes('physical')) relevantCritDmgTypes.push('physical_skill');
  if (skillTags.includes('fire')) relevantCritDmgTypes.push('fire_skill');
  if (skillTags.includes('cold')) relevantCritDmgTypes.push('cold_skill');
  if (skillTags.includes('lightning')) relevantCritDmgTypes.push('lightning_skill');
  if (skillTags.includes('erosion')) relevantCritDmgTypes.push('erosion_skill');

  for (const [mt, value] of Object.entries(aggregated.incCritDmg)) {
    if (relevantCritDmgTypes.includes(mt)) {
      critDmgInc += value ?? 0;
    }
  }

  const moreCritDmg = aggregated.moreCritDmg
    .filter(m => relevantCritDmgTypes.includes(m.modType))
    .map(m => 1 + m.value / 100);

  let critMultiplier = BASE_CRIT_MULTIPLIER * (1 + critDmgInc / 100);
  for (const mult of moreCritDmg) {
    critMultiplier *= mult;
  }

  // 暴击期望 = (1 × 不暴击率) + (暴击伤害 × 暴击率)
  const expectedCritDamage =
    (1 * (1 - critChance)) + (critMultiplier * critChance);

  return {
    critChance,
    critMultiplier,
    expectedCritDamage,
    critRatingBreakdown: {
      base: baseCritRating,
      flat: flatCritRating,
      inc: incTotal,
      more: aggregated.moreCritRating
        .filter(m => relevantCritTypes.includes(m.modType))
        .map(m => m.value),
      final: finalRating
    },
    critDmgBreakdown: {
      base: BASE_CRIT_MULTIPLIER,
      inc: critDmgInc,
      more: aggregated.moreCritDmg
        .filter(m => relevantCritDmgTypes.includes(m.modType))
        .map(m => m.value),
      final: critMultiplier
    }
  };
}
