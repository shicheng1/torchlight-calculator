import type { DmgChunkType } from '../types/mod.ts';
import type { AggregatedMods } from '../types/calc.ts';

export interface AilmentResult {
  igniteDPS: number;      // 点燃DPS
  frostbiteDPS: number;   // 冰缓DPS
  shockDPS: number;       // 感电DPS
  erosionDPS: number;     // 凋零DPS
  totalDotDPS: number;    // 总DOT DPS
}

/**
 * 计算异常状态持续伤害
 * 点燃 = 基础火焰伤害 x (1 + 持续伤害加成) x 点燃效果
 * 冰缓 = 基础冰冷伤害 x (1 + 持续伤害加成) x 冰缓效果
 * 感电 = 基础闪电伤害 x (1 + 持续伤害加成) x 感电效果
 * 凋零 = 基础腐蚀伤害 x (1 + 持续伤害加成) x 凋零效果
 */
export function calcAilmentDamage(
  hitDamage: Record<DmgChunkType, number>,
  aggregated: AggregatedMods,
  enemyResistances: Record<DmgChunkType, number>
): AilmentResult {
  // 持续伤害基础比例（通常为基础伤害的一定百分比）
  const DOT_BASE_PCT = 0.20; // 20% of base hit damage per second

  // 持续伤害加成
  const dotInc = aggregated.incDmg['damage_over_time'] ?? 0;
  const dotMore = aggregated.moreDmg
    .filter(m => m.modType === 'damage_over_time' || m.modType === 'ailment')
    .reduce((product, m) => product * (1 + m.value / 100), 1);

  const calcDot = (baseDmg: number, enemyRes: number) => {
    const dotBase = baseDmg * DOT_BASE_PCT;
    const afterInc = dotBase * (1 + dotInc / 100);
    const afterMore = afterInc * dotMore;
    const afterRes = afterMore * Math.max(0, 1 - enemyRes / 100);
    return Math.max(0, afterRes);
  };

  const igniteDPS = calcDot(hitDamage.fire ?? 0, enemyResistances.fire ?? 0);
  const frostbiteDPS = calcDot(hitDamage.cold ?? 0, enemyResistances.cold ?? 0);
  const shockDPS = calcDot(hitDamage.lightning ?? 0, enemyResistances.lightning ?? 0);
  const erosionDPS = calcDot(hitDamage.erosion ?? 0, enemyResistances.erosion ?? 0);

  return {
    igniteDPS,
    frostbiteDPS,
    shockDPS,
    erosionDPS,
    totalDotDPS: igniteDPS + frostbiteDPS + shockDPS + erosionDPS,
  };
}
