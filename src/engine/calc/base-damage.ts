import type { DmgChunkType, SkillTag } from '../types/mod.ts';
import type { AggregatedMods } from '../types/calc.ts';
import { DMG_CHUNK_TYPES } from '../constants/damage-types.ts';

/**
 * 计算各伤害类型的基础伤害
 *
 * 攻击技能：武器面板伤害 × 技能伤害百分比 + 附加伤害
 * 法术技能：法术基础点伤 × 技能伤害百分比 + 附加伤害
 */
export interface BaseDamageInput {
  isAttack: boolean;
  skillBaseDamagePct: number;     // 技能伤害百分比（如 232 表示 232%）
  weaponBaseDamage: Partial<Record<DmgChunkType, { min: number; max: number }>>;
  spellBaseDamage: Partial<Record<DmgChunkType, { min: number; max: number }>>;
  skillEffectiveness: number;     // 技能伤害效用（默认1.0）
  aggregated: AggregatedMods;
  skillTags: SkillTag[];
}

export interface BaseDamageResult {
  chunks: Record<DmgChunkType, { min: number; max: number }>;
}

export function calcBaseDamage(input: BaseDamageInput): BaseDamageResult {
  const chunks: Record<DmgChunkType, { min: number; max: number }> = {
    physical: { min: 0, max: 0 },
    fire: { min: 0, max: 0 },
    cold: { min: 0, max: 0 },
    lightning: { min: 0, max: 0 },
    erosion: { min: 0, max: 0 },
  };

  const pctMultiplier = input.skillBaseDamagePct / 100;

  if (input.isAttack) {
    // 攻击技能：武器面板伤害 × 技能百分比 + 附加伤害
    for (const dmgType of DMG_CHUNK_TYPES) {
      const weaponDmg = input.weaponBaseDamage[dmgType];
      if (weaponDmg) {
        chunks[dmgType].min += weaponDmg.min * pctMultiplier;
        chunks[dmgType].max += weaponDmg.max * pctMultiplier;
      }
    }
    // 附加点伤（受技能伤害效用影响）
    const flatDmg = input.aggregated.flatDmgToAtks;
    for (const dmgType of DMG_CHUNK_TYPES) {
      const flat = flatDmg[dmgType];
      if (flat) {
        chunks[dmgType].min += flat.min * input.skillEffectiveness;
        chunks[dmgType].max += flat.max * input.skillEffectiveness;
      }
    }
  } else {
    // 法术技能：法术基础点伤 × 技能百分比 + 附加伤害
    for (const dmgType of DMG_CHUNK_TYPES) {
      const spellDmg = input.spellBaseDamage[dmgType];
      if (spellDmg) {
        chunks[dmgType].min += spellDmg.min * pctMultiplier;
        chunks[dmgType].max += spellDmg.max * pctMultiplier;
      }
    }
    // 法术附加点伤（不受技能伤害效用影响）
    const flatDmg = input.aggregated.flatDmgToSpells;
    for (const dmgType of DMG_CHUNK_TYPES) {
      const flat = flatDmg[dmgType];
      if (flat) {
        chunks[dmgType].min += flat.min;
        chunks[dmgType].max += flat.max;
      }
    }
  }

  return { chunks };
}
