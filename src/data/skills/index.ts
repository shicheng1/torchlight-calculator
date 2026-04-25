import type { SkillData } from '@/engine/types/skill.ts';
import { dataService } from '@/data/sync/data-adapter.ts';
import {
  summonSpiderTank,
  summonMechanicalGuard,
  minionDamageSupport,
  minionAttackSpeedSupport,
  critDamageSupport,
  minionCritSupport,
  concentratedEffectSupport,
  fasterAttacksSupport,
  increasedCritSupport,
  elementalFocusSupport,
} from './moto-skills.ts';
import {
  inferno,
  fissionFireball,
  frostPulse,
  flameBurst,
} from './gemma-skills.ts';
import {
  spacetimeWarp,
  spacetimeIllusion,
  timeRelease,
} from './yarga-skills.ts';

// 本地备用数据
const localSkillsData: Record<string, SkillData> = {
  // 莫托技能
  summon_spider_tank: summonSpiderTank,
  summon_mechanical_guard: summonMechanicalGuard,
  support_minion_damage: minionDamageSupport,
  support_minion_aspd: minionAttackSpeedSupport,
  support_crit_damage: critDamageSupport,
  support_minion_crit: minionCritSupport,
  support_concentrated_effect: concentratedEffectSupport,
  support_faster_attacks: fasterAttacksSupport,
  support_increased_crit: increasedCritSupport,
  support_elemental_focus: elementalFocusSupport,
  // 吉玛技能
  inferno: inferno,
  fission_fireball: fissionFireball,
  frost_pulse: frostPulse,
  flame_burst: flameBurst,
  // 尤加技能
  spacetime_warp: spacetimeWarp,
  spacetime_illusion: spacetimeIllusion,
  time_release: timeRelease,
};

// 获取技能数据（优先使用同步数据）
export const skillsData: Record<string, SkillData> = dataService.getSkills() || localSkillsData;

export function getSkill(id: string): SkillData | undefined {
  return skillsData[id];
}

export function getActiveSkills(): SkillData[] {
  return Object.values(skillsData).filter(s => s.category === 'active');
}

export function getSupportSkills(): SkillData[] {
  return Object.values(skillsData).filter(s => s.category === 'support');
}

export function getSupportSkillsFor(activeSkill: SkillData): SkillData[] {
  if (!activeSkill.allowedTags && activeSkill.tags.length > 0) {
    return getSupportSkills().filter(support => {
      if (!support.tags.length) return true;
      return support.tags.some(tag => activeSkill.tags.includes(tag));
    });
  }
  return getSupportSkills().filter(support => {
    if (!support.allowedTags) return true;
    return support.allowedTags.some(tag => activeSkill.tags.includes(tag));
  });
}
