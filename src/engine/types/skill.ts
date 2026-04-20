import type { Mod, SkillTag, DmgChunkType } from './mod.ts';

// 技能类型
export type SkillCategory = 'active' | 'support' | 'passive' | 'trigger';

// 技能子类型
export type SkillSubType =
  | 'normal' | 'precision'  // 普通/精密
  | 'aura' | 'curse' | 'brand' // 光环/诅咒/印记
  | 'sentry' | 'guard'      // 哨卫/守卫
  | 'excite';               // 激发

// 技能数据
export interface SkillData {
  id: string;
  name: string;
  nameCN: string;
  category: SkillCategory;
  subType: SkillSubType;
  tags: SkillTag[];
  description: string;

  // 伤害相关
  baseDamagePct?: number;         // 技能基础伤害百分比（如 232%）
  baseDamagePctPerLevel?: number; // 每级增加
  baseDamage?: { min: number; max: number }; // 法术自带基础点伤
  damageType: DmgChunkType;
  attackSpeedMultiplier?: number; // 攻击速度系数（默认1.0）
  baseCritRating?: number;        // 技能基础暴击值
  projectileCount?: number;       // 投射物数量
  hitsPerCast?: number;           // 每次施法命中次数
  manaCost?: number;
  manaCostPerLevel?: number;

  // 技能等级
  maxLevel: number;               // 最大等级（通常20）
  qualityBonus?: string;          // 品质加成描述

  // 辅助技能特有
  supportManaMultiplier?: number; // 魔力倍率
  allowedTags?: SkillTag[];       // 可连接的技能标签要求

  // 召唤物技能特有
  minionBaseDamage?: { min: number; max: number };
  minionAttackSpeed?: number;
  minionCritRating?: number;      // 召唤物基础暴击值（默认500）
  minionCount?: number;           // 基础召唤物数量

  // 每级提供的 Mod
  levelMods?: (level: number) => Mod[];
}

// 技能配置（玩家配置的技能）
export interface SkillConfig {
  skillId: string;
  level: number;                  // 技能等级
  quality: number;                // 品质（0-20）
  enabled: boolean;
}

// 技能组配置（主动技能 + 辅助技能）
export interface SkillGroup {
  activeSkill: SkillConfig;
  supportSkills: SkillConfig[];
  enabled: boolean;
}
