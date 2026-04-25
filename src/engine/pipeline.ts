import type { Loadout, CalculationConfig, CalculationResult } from './types/calc.ts';
import type { SkillTag, DmgChunkType } from './types/mod.ts';
import { collectAllMods } from './mods/mod-collector.ts';
import { resolveMods } from './mods/mod-resolver.ts';
import { aggregateMods } from './mods/mod-aggregator.ts';
import { calcBaseDamage } from './calc/base-damage.ts';
import { applyDamageConversion } from './calc/damage-conversion.ts';
import { applyDamageMultipliers } from './calc/damage-multiplier.ts';
import { calcCrit } from './calc/crit-calc.ts';
import { calcAttackSpeed } from './calc/aspd-calc.ts';
import { applyEnemyDefense } from './calc/resistance-calc.ts';
import { combineToDPS } from './calc/dps-calc.ts';
import { calcMinionDamage } from './calc/minion-calc.ts';
import { DMG_CHUNK_TYPES } from './constants/damage-types.ts';
import { SPELL_BASE_CRIT_RATING } from './constants/defaults.ts';
import { getSkill } from '@/data/skills/index.ts';

/**
 * 主计算管线入口
 * 三阶段：收集 -> 解析 -> 聚合 -> 计算
 */
export function calculate(
  loadout: Loadout,
  config: CalculationConfig
): CalculationResult {
  // 阶段1：收集所有 Mod
  const allMods = collectAllMods(loadout);

  // 获取当前技能标签
  const skillGroup = loadout.skillGroups[loadout.selectedSkillGroupIndex];
  const skillData = skillGroup ? getSkill(skillGroup.activeSkill.skillId) : undefined;
  const skillTags: SkillTag[] = skillData?.tags ?? [];
  const isAttack = skillTags.includes('attack');
  const isMinion = skillTags.includes('minion');

  // 阶段2：解析 Mod（条件过滤）
  const resolvedMods = resolveMods(allMods, {
    config,
    skillTags,
    heroId: loadout.hero.heroId,
    traitId: loadout.hero.traitId,
  });

  // 阶段3：聚合 Mod
  const aggregated = aggregateMods(resolvedMods);

  // === 如果是召唤物技能，走召唤物管线 ===
  if (isMinion) {
    return calculateMinionPipeline(loadout, config, aggregated, skillTags, skillData);
  }

  // === 普通伤害管线 ===
  return calculateNormalPipeline(loadout, config, aggregated, skillTags, isAttack, skillData);
}

function calculateNormalPipeline(
  _loadout: Loadout,
  config: CalculationConfig,
  aggregated: ReturnType<typeof aggregateMods>,
  skillTags: SkillTag[],
  isAttack: boolean,
  skillData: ReturnType<typeof getSkill>,
): CalculationResult {
  // 基础伤害
  // 获取当前技能配置
  const skillGroup = _loadout.skillGroups[_loadout.selectedSkillGroupIndex];
  const skillConfig = skillGroup?.activeSkill;
  
  const baseResult = calcBaseDamage({
    isAttack,
    skillBaseDamagePct: skillData?.baseDamagePct ?? 100,
    skillBaseDamagePctPerLevel: skillData?.baseDamagePctPerLevel ?? 0,
    skillLevel: skillConfig?.level ?? 1,
    weaponBaseDamage: {} as Partial<Record<DmgChunkType, { min: number; max: number }>>,    // TODO: 从 gearBase 获取
    spellBaseDamage: (skillData?.baseDamage ?? {}) as Partial<Record<DmgChunkType, { min: number; max: number }>>,
    skillEffectiveness: 1.0,
    aggregated,
    skillTags,
  });

  // 取平均伤害
  const avgChunks: Record<DmgChunkType, number> = {} as Record<DmgChunkType, number>;
  for (const dmgType of DMG_CHUNK_TYPES) {
    avgChunks[dmgType] = (baseResult.chunks[dmgType].min + baseResult.chunks[dmgType].max) / 2;
  }

  // 伤害转化
  const { result: convertedChunks } = applyDamageConversion(avgChunks, aggregated.convertDmg);

  // INC/More 乘区
  const { result: multipliedChunks, incBreakdown, moreBreakdown } = applyDamageMultipliers(
    convertedChunks, aggregated, skillTags, aggregated.totalStr
  );

  // 总伤害
  const totalHitDamage = DMG_CHUNK_TYPES.reduce((sum, t) => sum + multipliedChunks[t], 0);

  // 暴击
  const baseCritRating = isAttack ? 0 : SPELL_BASE_CRIT_RATING; // TODO: 武器暴击值
  const crit = calcCrit(baseCritRating, aggregated, skillTags);

  // 攻击速度
  const baseAttackSpeed = skillData?.attackSpeedMultiplier ?? 1.0;
  const attacksPerSecond = calcAttackSpeed(baseAttackSpeed, 1.0, aggregated, skillTags);

  // 抗性/护甲
  const { effectiveResistances, armorMitigation } = applyEnemyDefense(
    multipliedChunks, aggregated, config
  );

  // 汇总 DPS
  return combineToDPS({
    totalHitDamage,
    critChance: crit.critChance,
    critMultiplier: crit.critMultiplier,
    expectedCritDamage: crit.expectedCritDamage,
    doubleDmgChance: Math.min(1, aggregated.doubleDmgChance / 100),
    attacksPerSecond,
    damageChunks: multipliedChunks,
    effectiveResistances,
    armorMitigation,
    incBreakdown,
    moreBreakdown,
  });
}

function calculateMinionPipeline(
  _loadout: Loadout,
  config: CalculationConfig,
  aggregated: ReturnType<typeof aggregateMods>,
  skillTags: SkillTag[],
  skillData: ReturnType<typeof getSkill>,
): CalculationResult {
  // 召唤物伤害计算
  const minionDetail = calcMinionDamage({
    minionBaseDamage: (skillData?.minionBaseDamage ?? {}) as Partial<Record<DmgChunkType, { min: number; max: number }>>,
    minionBaseAttackSpeed: skillData?.minionAttackSpeed ?? 1.0,
    minionCount: (skillData?.minionCount ?? 0) + aggregated.minionCount,
    aggregated,
    mainStatValue: aggregated.totalStr,
    skillTags,
    explodeBaseDamage: 0,  // TODO: 从 skillData 获取
    explodeCooldown: 0,    // TODO: 从 skillData 获取
  });

  // 抗性/护甲（对召唤物伤害也适用）
  const dummyChunks: Record<DmgChunkType, number> = {
    physical: 0, fire: 0, cold: 0, lightning: 0, erosion: 0,
  };
  const { effectiveResistances, armorMitigation } = applyEnemyDefense(
    dummyChunks, aggregated, config
  );

  return combineToDPS({
    totalHitDamage: minionDetail.minionExpectedDamage,
    critChance: minionDetail.minionCritChance,
    critMultiplier: minionDetail.minionCritMultiplier,
    expectedCritDamage: minionDetail.minionExpectedDamage,
    doubleDmgChance: 0,
    attacksPerSecond: minionDetail.minionCount * minionDetail.minionAttackSpeed,
    damageChunks: dummyChunks,
    effectiveResistances,
    armorMitigation,
    incBreakdown: [],
    moreBreakdown: [],
    minionDetail,
  });
}
