import type { DmgChunkType } from '../types/mod.ts';
import type { CalculationResult, DamageDetail, AggregatedMods } from '../types/calc.ts';
import { DMG_CHUNK_TYPES } from '../constants/damage-types.ts';
import { calcAilmentDamage } from './ailment-calc.ts';

/**
 * 汇总所有计算结果为最终的 CalculationResult
 */
export function combineToDPS(params: {
  totalHitDamage: number;
  critChance: number;
  critMultiplier: number;
  expectedCritDamage: number;
  doubleDmgChance: number;
  attacksPerSecond: number;
  damageChunks: Record<DmgChunkType, number>;
  effectiveResistances: Record<DmgChunkType, number>;
  armorMitigation: number;
  incBreakdown: CalculationResult['incBreakdown'];
  moreBreakdown: CalculationResult['moreBreakdown'];
  minionDetail?: CalculationResult['minionDetail'];
  aggregated?: AggregatedMods;
}): CalculationResult {
  const {
    totalHitDamage,
    expectedCritDamage,
    doubleDmgChance,
    attacksPerSecond,
    damageChunks,
    effectiveResistances,
    armorMitigation,
    incBreakdown,
    moreBreakdown,
    minionDetail,
    aggregated,
  } = params;

  // 双倍伤害期望
  const expectedDoubleDmg =
    (1 * (1 - doubleDmgChance)) + (2 * doubleDmgChance);

  // 最终期望伤害
  const finalExpectedDamage = totalHitDamage * expectedCritDamage * expectedDoubleDmg;

  // DPS
  const hitDPS = finalExpectedDamage * attacksPerSecond;

  // 计算异常状态伤害
  let ailmentDetail;
  if (aggregated) {
    // 构建敌人抗性对象
    const enemyResistances: Record<DmgChunkType, number> = {
      physical: 0, // 物理伤害通常不触发异常状态
      fire: effectiveResistances.fire ?? 0,
      cold: effectiveResistances.cold ?? 0,
      lightning: effectiveResistances.lightning ?? 0,
      erosion: effectiveResistances.erosion ?? 0,
    };

    // 计算异常状态
    ailmentDetail = calcAilmentDamage(damageChunks, aggregated, enemyResistances);
  }

  // 总DPS = 击中DPS + DOT DPS
  const totalDPS = hitDPS + (ailmentDetail?.totalDotDPS ?? 0);

  // 伤害分解
  const damageBreakdown: Record<DmgChunkType, DamageDetail> = {} as Record<DmgChunkType, DamageDetail>;
  for (const dmgType of DMG_CHUNK_TYPES) {
    damageBreakdown[dmgType] = {
      baseDamage: damageChunks[dmgType],
      incTotal: 0,
      moreMultipliers: [],
      finalHitDamage: damageChunks[dmgType],
      afterResist: damageChunks[dmgType] * (1 - (effectiveResistances[dmgType] ?? 0) / 100),
      afterArmor: dmgType === 'physical'
        ? damageChunks[dmgType] * (1 - armorMitigation)
        : damageChunks[dmgType],
    };
  }

  return {
    totalDPS,
    hitDPS,
    totalHitDamage: finalExpectedDamage,
    critChance: params.critChance,
    critMultiplier: params.critMultiplier,
    expectedCritDamage,
    doubleDmgChance,
    expectedDoubleDmg,
    attacksPerSecond,
    damageBreakdown,
    incBreakdown,
    moreBreakdown,
    effectiveResistances,
    armorMitigation,
    minionDetail,
    ailmentDetail,
  };
}
