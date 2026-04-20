import type { DmgChunkType, DmgModType, SkillTag } from '../types/mod.ts';

// 所有伤害块类型
export const DMG_CHUNK_TYPES: DmgChunkType[] = [
  'physical', 'cold', 'lightning', 'fire', 'erosion'
];

// 元素伤害类型
export const ELEMENTAL_TYPES: DmgChunkType[] = ['fire', 'cold', 'lightning'];

// 伤害转化顺序
export const CONVERSION_ORDER: DmgChunkType[] = [
  'physical', 'lightning', 'cold', 'fire', 'erosion'
];

// 伤害类型对应的颜色
export const DMG_TYPE_COLORS: Record<DmgChunkType, string> = {
  physical: '#c8c8c8',
  fire: '#ff6b35',
  cold: '#4fc3f7',
  lightning: '#ffd54f',
  erosion: '#ab47bc',
};

// 伤害类型中文名
export const DMG_TYPE_NAMES: Record<DmgChunkType, string> = {
  physical: '物理',
  fire: '火焰',
  cold: '冰冷',
  lightning: '闪电',
  erosion: '腐蚀',
};

// 伤害修饰词类型中文名
export const DMG_MOD_TYPE_NAMES: Record<DmgModType, string> = {
  global: '全域',
  melee: '近战',
  area: '范围',
  attack: '攻击',
  spell: '法术',
  physical: '物理',
  cold: '冰冷',
  lightning: '闪电',
  fire: '火焰',
  erosion: '腐蚀',
  elemental: '元素',
  ailment: '异常',
  projectile: '投射物',
  ranged: '远程',
  hit: '击中',
  damage_over_time: '持续伤害',
  minion: '召唤物',
  minion_attack: '召唤物攻击',
  minion_spell: '召唤物法术',
  attack_physical: '攻击物理',
  spell_physical: '法术物理',
  attack_projectile: '攻击投射物',
  spell_projectile: '法术投射物',
  attack_elemental: '攻击元素',
  spell_elemental: '法术元素',
  melee_attack: '近战攻击',
  ranged_attack: '远程攻击',
};

// 技能标签中文名
export const SKILL_TAG_NAMES: Record<SkillTag, string> = {
  attack: '攻击',
  spell: '法术',
  melee: '近战',
  ranged: '远程',
  projectile: '投射物',
  area: '范围',
  physical: '物理',
  fire: '火焰',
  cold: '冰冷',
  lightning: '闪电',
  erosion: '腐蚀',
  elemental: '元素',
  duration: '持续',
  sentry: '哨卫',
  channel: '引导',
  mobility: '位移',
  aura: '光环',
  curse: '诅咒',
  minion: '召唤物',
  minion_skill: '召唤物技能',
  slash_strike: '斩击',
  shadow_strike: '暗影打击',
  trigger: '触发',
  buff: '增益',
  dot: '持续伤害',
  blink: '闪烁',
  guard: '守卫',
};
