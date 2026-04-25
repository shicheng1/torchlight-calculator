import type { DmgChunkType } from '../types/mod.ts';
import type { AggregatedMods } from '../types/calc.ts';

export interface AilmentResult {
  igniteDPS: number;      // 点燃DPS
  frostbiteDPS: number;   // 冰缓DPS
  shockDPS: number;       // 感电DPS
  erosionDPS: number;     // 凋零DPS
  totalDotDPS: number;    // 总DOT DPS
  igniteChance: number;   // 点燃触发几率
  frostbiteChance: number; // 冰缓触发几率
  shockChance: number;    // 感电触发几率
  erosionChance: number;  // 凋零触发几率
  igniteDuration: number; // 点燃持续时间
  frostbiteDuration: number; // 冰缓持续时间
  shockDuration: number;  // 感电持续时间
  erosionDuration: number; // 凋零持续时间
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

  // 基础持续时间（秒）
  const BASE_DURATION = {
    ignite: 4,
    frostbite: 3,
    shock: 3,
    erosion: 3,
  };

  // 基础触发几率
  const BASE_CHANCE = {
    ignite: 0.5, // 50%
    frostbite: 0.5, // 50%
    shock: 0.5, // 50%
    erosion: 0.5, // 50%
  };

  // 持续伤害加成
  const dotInc = aggregated.incDmg['damage_over_time'] ?? 0;
  const dotMore = aggregated.moreDmg
    .filter(m => m.modType === 'damage_over_time' || m.modType === 'ailment')
    .reduce((product, m) => product * (1 + m.value / 100), 1);

  // 计算异常状态触发几率
  const calcAilmentChance = (ailmentType: string) => {
    const inc = (aggregated.incAilmentChance[ailmentType] ?? 0) + (aggregated.incAilmentChance['all'] ?? 0);
    const more = aggregated.moreAilmentChance
      .filter(m => m.ailmentType === ailmentType || m.ailmentType === 'all')
      .reduce((product, m) => product * (1 + m.value / 100), 1);
    return Math.min(1, BASE_CHANCE[ailmentType as keyof typeof BASE_CHANCE] * (1 + inc / 100) * more);
  };

  // 计算异常状态持续时间
  const calcAilmentDuration = (ailmentType: string) => {
    const inc = (aggregated.incAilmentDuration[ailmentType] ?? 0) + (aggregated.incAilmentDuration['all'] ?? 0);
    const more = aggregated.moreAilmentDuration
      .filter(m => m.ailmentType === ailmentType || m.ailmentType === 'all')
      .reduce((product, m) => product * (1 + m.value / 100), 1);
    return BASE_DURATION[ailmentType as keyof typeof BASE_DURATION] * (1 + inc / 100) * more;
  };

  // 计算异常状态效果加成
  const calcAilmentEffect = (ailmentType: string) => {
    const inc = (aggregated.incAilmentEffect[ailmentType] ?? 0) + (aggregated.incAilmentEffect['all'] ?? 0);
    const more = aggregated.moreAilmentEffect
      .filter(m => m.ailmentType === ailmentType || m.ailmentType === 'all')
      .reduce((product, m) => product * (1 + m.value / 100), 1);
    return (1 + inc / 100) * more;
  };

  // 计算DOT伤害
  const calcDot = (baseDmg: number, enemyRes: number, ailmentType: string) => {
    const dotBase = baseDmg * DOT_BASE_PCT;
    const afterInc = dotBase * (1 + dotInc / 100);
    const afterMore = afterInc * dotMore;
    const afterEffect = afterMore * calcAilmentEffect(ailmentType);
    const afterRes = afterEffect * Math.max(0, 1 - enemyRes / 100);
    return Math.max(0, afterRes);
  };

  // 计算各项异常状态
  const igniteDPS = calcDot(hitDamage.fire ?? 0, enemyResistances.fire ?? 0, 'ignite');
  const frostbiteDPS = calcDot(hitDamage.cold ?? 0, enemyResistances.cold ?? 0, 'frostbite');
  const shockDPS = calcDot(hitDamage.lightning ?? 0, enemyResistances.lightning ?? 0, 'shock');
  const erosionDPS = calcDot(hitDamage.erosion ?? 0, enemyResistances.erosion ?? 0, 'erosion');

  // 计算触发几率
  const igniteChance = calcAilmentChance('ignite');
  const frostbiteChance = calcAilmentChance('frostbite');
  const shockChance = calcAilmentChance('shock');
  const erosionChance = calcAilmentChance('erosion');

  // 计算持续时间
  const igniteDuration = calcAilmentDuration('ignite');
  const frostbiteDuration = calcAilmentDuration('frostbite');
  const shockDuration = calcAilmentDuration('shock');
  const erosionDuration = calcAilmentDuration('erosion');

  return {
    igniteDPS,
    frostbiteDPS,
    shockDPS,
    erosionDPS,
    totalDotDPS: igniteDPS + frostbiteDPS + shockDPS + erosionDPS,
    igniteChance,
    frostbiteChance,
    shockChance,
    erosionChance,
    igniteDuration,
    frostbiteDuration,
    shockDuration,
    erosionDuration,
  };
}
