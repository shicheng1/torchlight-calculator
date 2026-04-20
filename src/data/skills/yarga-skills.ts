import type { SkillData } from '@/engine/types/skill.ts';
import type { Mod } from '@/engine/types/mod.ts';

// ==================== 时空流逝核心技能 ====================

// 扭曲时空（时空流逝核心）
export const spacetimeWarp: SkillData = {
  id: 'spacetime_warp',
  name: 'Spacetime Warp',
  nameCN: '扭曲时空',
  category: 'active',
  subType: 'normal',
  tags: ['spell', 'area', 'duration', 'dot'],
  description: '时空流逝核心技能。点击或造成持续伤害时释放扭曲时空，间隔4秒持续6秒。记录40%持续伤害',
  damageType: 'physical',
  baseDamagePct: 170,
  baseDamagePctPerLevel: 8,
  baseDamage: { min: 320, max: 480 },
  attackSpeedMultiplier: 1.0,
  baseCritRating: 500,
  maxLevel: 20,
  manaCost: 28,
  manaCostPerLevel: 2,
};

// ==================== 时空幻象核心技能 ====================

// 时空幻象（时空幻象核心）
export const spacetimeIllusion: SkillData = {
  id: 'spacetime_illusion',
  name: 'Spacetime Illusion',
  nameCN: '时空幻象',
  category: 'active',
  subType: 'normal',
  tags: ['spell', 'duration'],
  description: '时空幻象核心技能。-50点时空能量消耗直接获得时空幻象。幻象每1.5秒使用一次核心技能',
  damageType: 'physical',
  baseDamagePct: 200,
  baseDamagePctPerLevel: 10,
  baseDamage: { min: 350, max: 520 },
  attackSpeedMultiplier: 1.0,
  baseCritRating: 500,
  maxLevel: 20,
  manaCost: 30,
  manaCostPerLevel: 2,
};

// ==================== 辅助技能 ====================

// 时间释放 - 法术
export const timeRelease: SkillData = {
  id: 'time_release',
  name: 'Time Release',
  nameCN: '时间释放',
  category: 'active',
  subType: 'normal',
  tags: ['spell', 'area', 'duration', 'dot'],
  description: '释放记录的时间能量造成范围伤害',
  damageType: 'physical',
  baseDamagePct: 220,
  baseDamagePctPerLevel: 11,
  baseDamage: { min: 400, max: 600 },
  attackSpeedMultiplier: 1.0,
  baseCritRating: 500,
  maxLevel: 20,
  manaCost: 40,
  manaCostPerLevel: 3,
};

// 元素集中（辅助技能）
export const elementalFocusSupport: SkillData = {
  id: 'support_elemental_focus',
  name: 'Elemental Focus',
  nameCN: '元素集中',
  category: 'support',
  subType: 'precision',
  tags: ['fire', 'cold', 'lightning'],
  description: '元素伤害提高，但无法造成异常状态',
  maxLevel: 20,
  supportManaMultiplier: 1.4,
  allowedTags: ['fire', 'cold', 'lightning'],
  damageType: 'physical',
  levelMods: (level: number) => [
    {
      type: 'DmgPct',
      value: 12 + level * 2,
      addn: false,
      dmgModType: 'elemental',
      src: 'support_skill',
      srcDetail: '元素集中',
    } as Mod,
  ],
};

// 增加暴击率（辅助技能）
export const increasedCritSupport: SkillData = {
  id: 'support_increased_crit',
  name: 'Increased Critical Strikes',
  nameCN: '增加暴击率',
  category: 'support',
  subType: 'normal',
  tags: ['attack', 'spell'],
  description: '暴击率提高',
  maxLevel: 20,
  supportManaMultiplier: 1.2,
  allowedTags: ['attack', 'spell'],
  damageType: 'physical',
  levelMods: (level: number) => [
    {
      type: 'CritRatingPct',
      value: 15 + level * 2,
      addn: false,
      modType: 'global',
      src: 'support_skill',
      srcDetail: '增加暴击率',
    } as Mod,
  ],
};

// 暴击伤害（辅助技能）
export const critDamageSupport: SkillData = {
  id: 'support_crit_damage',
  name: 'Critical Damage',
  nameCN: '暴击伤害',
  category: 'support',
  subType: 'precision',
  tags: ['attack', 'spell'],
  description: '暴击时造成的额外伤害提高',
  maxLevel: 20,
  supportManaMultiplier: 1.4,
  allowedTags: ['attack', 'spell'],
  damageType: 'physical',
  levelMods: (level: number) => [
    {
      type: 'CritDmgPct',
      value: 15 + level * 3,
      addn: false,
      modType: 'global',
      src: 'support_skill',
      srcDetail: '暴击伤害',
    } as Mod,
  ],
};
