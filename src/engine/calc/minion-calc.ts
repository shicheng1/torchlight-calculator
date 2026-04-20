import type { DmgChunkType, SkillTag } from '../types/mod.ts';
import type { AggregatedMods, MinionDamageDetail, MoreSource } from '../types/calc.ts';
import { DMG_CHUNK_TYPES } from '../constants/damage-types.ts';
import { MAIN_STAT_DAMAGE_PER_POINT } from '../constants/defaults.ts';
import { calcCrit } from './crit-calc.ts';

export interface MinionCalcInput {
  minionBaseDamage: Partial<Record<DmgChunkType, { min: number; max: number }>>;
  minionBaseAttackSpeed: number;
  minionCount: number;
  aggregated: AggregatedMods;
  mainStatValue: number;
  skillTags: SkillTag[];
  // 自爆相关
  explodeBaseDamage?: number;
  explodeCooldown?: number;
}

/**
 * 计算召唤物伤害（冲锋征召专用）
 */
export function calcMinionDamage(input: MinionCalcInput): MinionDamageDetail {
  const {
    minionBaseDamage,
    minionBaseAttackSpeed,
    aggregated,
    mainStatValue,
    skillTags,
  } = input;

  // === 召唤物数量 ===
  const minionCount = Math.max(1, input.minionCount + aggregated.minionCount);

  // === 召唤物攻速 ===
  let minionAspd = minionBaseAttackSpeed * (1 + aggregated.incMinionAspd / 100);
  for (const more of aggregated.moreMinionAspd) {
    minionAspd *= (1 + more.value / 100);
  }

  // === 召唤物基础伤害（取平均值） ===
  let totalBaseDmg = 0;
  for (const dmgType of DMG_CHUNK_TYPES) {
    const base = minionBaseDamage[dmgType];
    if (base) {
      const avg = (base.min + base.max) / 2;
      totalBaseDmg += avg;
    }
    // 加上附加点伤
    const flat = aggregated.flatMinionDmg[dmgType];
    if (flat) {
      totalBaseDmg += (flat.min + flat.max) / 2;
    }
  }

  // === 召唤物 INC/More ===
  const mainStatInc = mainStatValue * MAIN_STAT_DAMAGE_PER_POINT;
  const minionIncTotal = aggregated.incMinionDmg + mainStatInc;

  let minionMoreProduct = 1;
  const minionMoreMultipliers: MoreSource[] = [];
  for (const more of aggregated.moreMinionDmg) {
    minionMoreProduct *= (1 + more.value / 100);
    minionMoreMultipliers.push({ value: more.value, modType: 'minion' as const, src: more.src });
  }

  // === 超载加成 ===
  let overloadProduct = 1;
  if (aggregated.overloadInc > 0) {
    overloadProduct *= (1 + aggregated.overloadInc / 100);
  }
  for (const more of aggregated.overloadMore) {
    overloadProduct *= (1 + more.value / 100);
  }

  // === 召唤物暴击 ===
  const crit = calcCrit(
    aggregated.minionBaseCritRating,
    aggregated,
    skillTags,
    true // isMinion
  );

  // === 单次伤害 ===
  const singleHitDmg = totalBaseDmg * (1 + minionIncTotal / 100) * minionMoreProduct * overloadProduct;

  // === 自爆伤害 ===
  let explodeDamage = 0;
  if (input.explodeBaseDamage) {
    let explodeInc = aggregated.explodeInc;
    let explodeMoreProduct = 1;
    for (const more of aggregated.explodeMore) {
      explodeMoreProduct *= (1 + more.value / 100);
    }
    explodeDamage = input.explodeBaseDamage * (1 + explodeInc / 100) * explodeMoreProduct;
  }

  // === 总 DPS ===
  const minionExpectedDmg = singleHitDmg * crit.expectedCritDamage;
  const explodeDPS = input.explodeCooldown ? explodeDamage / input.explodeCooldown : 0;
  const attackDPS = minionCount * minionAspd * minionExpectedDmg;
  const totalMinionDPS = attackDPS + (minionCount * explodeDPS);

  return {
    minionCount,
    minionAttackSpeed: minionAspd,
    minionBaseDamage: totalBaseDmg,
    minionIncTotal,
    minionMoreMultipliers,
    minionCritChance: crit.critChance,
    minionCritMultiplier: crit.critMultiplier,
    minionExpectedDamage: minionExpectedDmg,
    explodeDamage,
    explodeCooldown: input.explodeCooldown ?? 0,
    totalMinionDPS,
  };
}
