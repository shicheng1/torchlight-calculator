import type { DmgChunkType, DmgModType, SkillTag } from '../types/mod.ts';
import type { AggregatedMods, IncSource, MoreSource } from '../types/calc.ts';
import { DMG_CHUNK_TYPES } from '../constants/damage-types.ts';
import { MAIN_STAT_DAMAGE_PER_POINT } from '../constants/defaults.ts';

/**
 * 判断一个 DmgModType 是否适用于某个伤害类型和技能标签组合
 */
export function isModTypeApplicable(
  modType: DmgModType,
  dmgType: DmgChunkType,
  skillTags: SkillTag[]
): boolean {
  const isAttack = skillTags.includes('attack');
  const isSpell = skillTags.includes('spell');
  const isMelee = skillTags.includes('melee');
  const isRanged = skillTags.includes('ranged');
  const isProjectile = skillTags.includes('projectile');
  const isMinion = skillTags.includes('minion');
  const isElemental = ['fire', 'cold', 'lightning'].includes(dmgType);

  switch (modType) {
    case 'global':
      return true;
    case 'physical':
      return dmgType === 'physical';
    case 'fire':
      return dmgType === 'fire';
    case 'cold':
      return dmgType === 'cold';
    case 'lightning':
      return dmgType === 'lightning';
    case 'erosion':
      return dmgType === 'erosion';
    case 'elemental':
      return isElemental;
    case 'attack':
      return isAttack;
    case 'spell':
      return isSpell;
    case 'melee':
      return isMelee;
    case 'area':
      return skillTags.includes('area');
    case 'projectile':
      return isProjectile;
    case 'ranged':
      return isRanged;
    case 'hit':
      return !skillTags.includes('dot');
    case 'damage_over_time':
      return skillTags.includes('dot');
    case 'ailment':
      return skillTags.includes('dot');
    case 'minion':
      return isMinion;
    case 'minion_attack':
      return isMinion && isAttack;
    case 'minion_spell':
      return isMinion && isSpell;
    case 'attack_physical':
      return isAttack && dmgType === 'physical';
    case 'spell_physical':
      return isSpell && dmgType === 'physical';
    case 'attack_projectile':
      return isAttack && isProjectile;
    case 'spell_projectile':
      return isSpell && isProjectile;
    case 'attack_elemental':
      return isAttack && isElemental;
    case 'spell_elemental':
      return isSpell && isElemental;
    case 'melee_attack':
      return isMelee && isAttack;
    case 'ranged_attack':
      return isRanged && isAttack;
    default:
      return false;
  }
}

/**
 * 应用 INC/More 乘区
 */
export function applyDamageMultipliers(
  chunks: Record<DmgChunkType, number>,
  aggregated: AggregatedMods,
  skillTags: SkillTag[],
  mainStatValue: number
): {
  result: Record<DmgChunkType, number>;
  incBreakdown: IncSource[];
  moreBreakdown: MoreSource[];
} {
  const result = { ...chunks };
  const incBreakdown: IncSource[] = [];
  const moreBreakdown: MoreSource[] = [];

  // 主属性增伤（全域 INC）
  const mainStatInc = mainStatValue * MAIN_STAT_DAMAGE_PER_POINT;

  for (const dmgType of DMG_CHUNK_TYPES) {
    // 收集所有适用的 INC 加成
    let totalInc = mainStatInc; // 主属性总是适用

    for (const [modType, value] of Object.entries(aggregated.incDmg)) {
      if (value && isModTypeApplicable(modType as DmgModType, dmgType, skillTags)) {
        totalInc += value;
      }
    }

    // 收集所有适用的 More 加成
    const applicableMore = aggregated.moreDmg.filter(m =>
      isModTypeApplicable(m.modType, dmgType, skillTags)
    );

    // 应用 INC
    result[dmgType] *= (1 + totalInc / 100);

    // 应用 More（每个独立相乘）
    for (const more of applicableMore) {
      result[dmgType] *= (1 + more.value / 100);
      moreBreakdown.push({
        value: more.value,
        modType: more.modType,
        src: more.src,
        detail: more.detail,
      });
    }

    // 记录 INC 明细
    if (totalInc > 0) {
      incBreakdown.push({
        modType: dmgType as unknown as DmgModType,
        total: totalInc,
        sources: [
          { value: mainStatInc, src: '主属性' },
          ...Object.entries(aggregated.incDmg)
            .filter(([mt, v]) => v && isModTypeApplicable(mt as DmgModType, dmgType, skillTags))
            .map(([mt, v]) => ({ value: v!, src: mt })),
        ],
      });
    }
  }

  return { result, incBreakdown, moreBreakdown };
}
