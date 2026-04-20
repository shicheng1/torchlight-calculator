import type { SkillData } from '@/engine/types/skill.ts';
import type { Mod } from '@/engine/types/mod.ts';

// ==================== 号令征召核心技能 ====================

// 召唤蜘蛛坦克（号令征召核心）
export const summonSpiderTank: SkillData = {
  id: 'summon_spider_tank',
  name: 'Summon Spider Tank',
  nameCN: '召唤蜘蛛坦克',
  category: 'active',
  subType: 'normal',
  tags: ['spell', 'minion', 'duration', 'physical', 'projectile'],
  description: '号令征召核心技能。召唤蜘蛛坦克，使用瞄准射击攻击敌人。主属性：敏捷、智慧',
  damageType: 'physical',
  baseDamagePct: 300,
  baseDamagePctPerLevel: 15,
  attackSpeedMultiplier: 1.42,
  baseCritRating: 500,
  maxLevel: 20,
  manaCost: 8,
  manaCostPerLevel: 1,
  projectileCount: 1,
  // 召唤物属性
  minionBaseDamage: { min: 250, max: 350 },
  minionAttackSpeed: 1.42,
  minionCritRating: 500,
  minionCount: 4,
  // 每级提供的 Mod
  levelMods: (level: number) => {
    const mods: Mod[] = [];
    // 召唤数量：1-3级2个，4-17级3个，18+级4个
    const count = level >= 18 ? 4 : level >= 4 ? 3 : 2;
    mods.push({
      type: 'MinionCount',
      value: count,
      src: 'skill_level',
      srcDetail: '召唤蜘蛛坦克',
    } as Mod);
    // 统御>=10时+2投射物数量
    if (level >= 10) {
      mods.push({
        type: 'DmgPct',
        value: 200,
        addn: true,
        dmgModType: 'minion',
        src: 'skill_level',
        srcDetail: '召唤蜘蛛坦克-额外投射物',
      } as Mod);
    }
    // 每召唤1个额外+3%伤害
    mods.push({
      type: 'MinionDmgPct',
      value: 3,
      addn: true,
      per: { stat: 'minion_count', per: 1 },
      src: 'skill_level',
      srcDetail: '召唤蜘蛛坦克',
    } as Mod);
    return mods;
  },
};

// ==================== 冲锋征召核心技能 ====================

// 召唤机械警卫（冲锋征召核心）
export const summonMechanicalGuard: SkillData = {
  id: 'summon_mechanical_guard',
  name: 'Summon Mechanical Guard',
  nameCN: '召唤机械警卫',
  category: 'active',
  subType: 'normal',
  tags: ['spell', 'minion', 'duration', 'physical', 'melee'],
  description: '冲锋征召核心技能。召唤机械警卫，使用压制重击和进击之拳攻击。主属性：力量、智慧。自毁程序倍率115%',
  damageType: 'physical',
  baseDamagePct: 300,
  baseDamagePctPerLevel: 15,
  attackSpeedMultiplier: 1.0,
  baseCritRating: 500,
  maxLevel: 20,
  manaCost: 8,
  manaCostPerLevel: 1,
  // 召唤物属性
  minionBaseDamage: { min: 250, max: 350 },
  minionAttackSpeed: 1.0,
  minionCritRating: 500,
  minionCount: 4,
  // 每级提供的 Mod
  levelMods: (level: number) => {
    const mods: Mod[] = [];
    // 召唤数量：1-3级2个，4-17级3个，18+级4个
    const count = level >= 18 ? 4 : level >= 4 ? 3 : 2;
    mods.push({
      type: 'MinionCount',
      value: count,
      src: 'skill_level',
      srcDetail: '召唤机械警卫',
    } as Mod);
    // 持续时间15秒(每级+5%)
    // 自毁程序倍率115%
    mods.push({
      type: 'ExplodeDmgPct',
      value: 115,
      addn: false,
      src: 'skill_level',
      srcDetail: '召唤机械警卫-自毁倍率',
    } as Mod);
    // 每召唤1个额外+3%伤害
    mods.push({
      type: 'MinionDmgPct',
      value: 3,
      addn: true,
      per: { stat: 'minion_count', per: 1 },
      src: 'skill_level',
      srcDetail: '召唤机械警卫',
    } as Mod);
    return mods;
  },
};

// ==================== 辅助技能 ====================

// 召唤物伤害（辅助技能）
export const minionDamageSupport: SkillData = {
  id: 'support_minion_damage',
  name: 'Minion Damage',
  nameCN: '召唤物伤害',
  category: 'support',
  subType: 'normal',
  tags: ['minion'],
  description: '召唤物造成的伤害提高',
  maxLevel: 20,
  supportManaMultiplier: 1.3,
  allowedTags: ['minion', 'minion_skill'],
  damageType: 'physical',
  levelMods: (level: number) => [
    {
      type: 'MinionDmgPct',
      value: 10 + level * 2,
      addn: false,
      src: 'support_skill',
      srcDetail: '召唤物伤害',
    } as Mod,
  ],
};

// 召唤物攻速（辅助技能）
export const minionAttackSpeedSupport: SkillData = {
  id: 'support_minion_aspd',
  name: 'Minion Attack Speed',
  nameCN: '召唤物攻速',
  category: 'support',
  subType: 'normal',
  tags: ['minion'],
  description: '召唤物攻击速度提高',
  maxLevel: 20,
  supportManaMultiplier: 1.2,
  allowedTags: ['minion', 'minion_skill'],
  damageType: 'physical',
  levelMods: (level: number) => [
    {
      type: 'MinionAspdPct',
      value: 8 + level * 1.5,
      addn: false,
      src: 'support_skill',
      srcDetail: '召唤物攻速',
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
  allowedTags: ['attack', 'spell', 'minion'],
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

// 召唤物暴击（辅助技能）
export const minionCritSupport: SkillData = {
  id: 'support_minion_crit',
  name: 'Minion Critical Strike',
  nameCN: '召唤物暴击',
  category: 'support',
  subType: 'normal',
  tags: ['minion'],
  description: '召唤物的暴击值提高',
  maxLevel: 20,
  supportManaMultiplier: 1.25,
  allowedTags: ['minion', 'minion_skill'],
  damageType: 'physical',
  levelMods: (level: number) => [
    {
      type: 'CritRatingPct',
      value: 12 + level * 2,
      addn: false,
      modType: 'minion',
      src: 'support_skill',
      srcDetail: '召唤物暴击',
    } as Mod,
  ],
};

// 集中效应（辅助技能）
export const concentratedEffectSupport: SkillData = {
  id: 'support_concentrated_effect',
  name: 'Concentrated Effect',
  nameCN: '集中效应',
  category: 'support',
  subType: 'precision',
  tags: ['area'],
  description: '技能效果区域缩小，但伤害更高',
  maxLevel: 20,
  supportManaMultiplier: 1.4,
  allowedTags: ['area'],
  damageType: 'physical',
  levelMods: (level: number) => [
    {
      type: 'DmgPct',
      value: 10 + level * 2,
      addn: false,
      dmgModType: 'area',
      src: 'support_skill',
      srcDetail: '集中效应',
    } as Mod,
  ],
};

// 急速攻击（辅助技能）
export const fasterAttacksSupport: SkillData = {
  id: 'support_faster_attacks',
  name: 'Faster Attacks',
  nameCN: '急速攻击',
  category: 'support',
  subType: 'normal',
  tags: ['attack'],
  description: '攻击速度提高',
  maxLevel: 20,
  supportManaMultiplier: 1.2,
  allowedTags: ['attack'],
  damageType: 'physical',
  levelMods: (level: number) => [
    {
      type: 'AspdPct',
      value: 8 + level * 1.5,
      addn: false,
      src: 'support_skill',
      srcDetail: '急速攻击',
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
  allowedTags: ['attack', 'spell', 'minion'],
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
