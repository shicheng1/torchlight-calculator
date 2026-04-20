import type { SkillData } from '@/engine/types/skill.ts';
import type { Mod } from '@/engine/types/mod.ts';

// ==================== 欢愉之焰核心技能 ====================

// 炼狱（欢愉之焰核心）
export const inferno: SkillData = {
  id: 'inferno',
  name: 'Inferno',
  nameCN: '炼狱',
  category: 'active',
  subType: 'normal',
  tags: ['spell', 'area', 'fire', 'duration'],
  description: '欢愉之焰核心技能。释放炼狱，半径8米，持续5秒，冷却8秒。范围内敌人额外+45%受到的伤害',
  damageType: 'fire',
  baseDamagePct: 200,
  baseDamagePctPerLevel: 10,
  baseDamage: { min: 350, max: 500 },
  attackSpeedMultiplier: 1.0,
  baseCritRating: 500,
  maxLevel: 20,
  manaCost: 25,
  manaCostPerLevel: 2,
};

// ==================== 冰火融合核心技能 ====================

// 裂变火球（冰火融合核心）
export const fissionFireball: SkillData = {
  id: 'fission_fireball',
  name: 'Fission Fireball',
  nameCN: '裂变火球',
  category: 'active',
  subType: 'normal',
  tags: ['spell', 'projectile', 'fire'],
  description: '冰火融合核心技能。释放裂变火球造成火焰伤害，累计释放5次火焰或冰冷技能进入冰火暴走',
  damageType: 'fire',
  baseDamagePct: 220,
  baseDamagePctPerLevel: 11,
  baseDamage: { min: 380, max: 550 },
  attackSpeedMultiplier: 1.0,
  baseCritRating: 500,
  maxLevel: 20,
  manaCost: 22,
  manaCostPerLevel: 2,
  projectileCount: 1,
};

// ==================== 冰结之心核心技能 ====================

// 冰霜脉冲（冰结之心核心）
export const frostPulse: SkillData = {
  id: 'frost_pulse',
  name: 'Frost Pulse',
  nameCN: '冰霜脉冲',
  category: 'active',
  subType: 'normal',
  tags: ['spell', 'area', 'cold', 'duration'],
  description: '冰结之心核心技能。释放冰霜脉冲造成范围冰冷伤害，获得冰能量，满时释放冰霜脉冲',
  damageType: 'cold',
  baseDamagePct: 180,
  baseDamagePctPerLevel: 9,
  baseDamage: { min: 320, max: 480 },
  attackSpeedMultiplier: 1.0,
  baseCritRating: 500,
  maxLevel: 20,
  manaCost: 22,
  manaCostPerLevel: 2,
};

// ==================== 辅助技能 ====================

// 烈焰释放 - 火焰法术
export const flameBurst: SkillData = {
  id: 'flame_burst',
  name: 'Flame Burst',
  nameCN: '烈焰释放',
  category: 'active',
  subType: 'normal',
  tags: ['spell', 'area', 'fire', 'duration'],
  description: '释放烈焰造成范围火焰伤害',
  damageType: 'fire',
  baseDamagePct: 180,
  baseDamagePctPerLevel: 9,
  baseDamage: { min: 300, max: 450 },
  attackSpeedMultiplier: 1.0,
  baseCritRating: 500,
  maxLevel: 20,
  manaCost: 25,
  manaCostPerLevel: 2,
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
  damageType: 'fire',
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
  damageType: 'fire',
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
  damageType: 'fire',
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
