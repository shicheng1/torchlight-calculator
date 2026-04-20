import type { DmgChunkType } from '../types/mod.ts';
import type { CalculationResult, DamageDetail } from '../types/calc.ts';
import { DMG_CHUNK_TYPES } from '../constants/damage-types.ts';

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
  } = params;

  // 双倍伤害期望
  const expectedDoubleDmg =
    (1 * (1 - doubleDmgChance)) + (2 * doubleDmgChance);

  // 最终期望伤害
  const finalExpectedDamage = totalHitDamage * expectedCritDamage * expectedDoubleDmg;

  // DPS
  const totalDPS = finalExpectedDamage * attacksPerSecond;

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
    hitDPS: totalDPS,
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
  };
}
