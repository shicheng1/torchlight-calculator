import type { SkillTag } from '../types/mod.ts';
import type { AggregatedMods } from '../types/calc.ts';

/**
 * 计算攻击速度或施法速度
 */
export function calcAttackSpeed(
  baseAttackSpeed: number,       // 基础攻击速度（来自武器或技能）
  skillAttackSpeedMult: number,  // 技能攻击速度系数（默认1.0）
  aggregated: AggregatedMods,
  skillTags: SkillTag[]
): number {
  const isAttack = skillTags.includes('attack');

  if (isAttack) {
    // 攻击速度
    let incTotal = aggregated.incAspd;
    const moreMults = aggregated.moreAspd.map(m => 1 + m.value / 100);

    let aspd = baseAttackSpeed * skillAttackSpeedMult * (1 + incTotal / 100);
    for (const mult of moreMults) {
      aspd *= mult;
    }
    return aspd;
  } else {
    // 施法速度
    let incTotal = aggregated.incCspd;
    const moreMults = aggregated.moreCspd.map(m => 1 + m.value / 100);

    let cspd = baseAttackSpeed * skillAttackSpeedMult * (1 + incTotal / 100);
    for (const mult of moreMults) {
      cspd *= mult;
    }
    return cspd;
  }
}
