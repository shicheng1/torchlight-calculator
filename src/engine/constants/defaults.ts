import type { CalculationConfig } from '../types/calc.ts';

// 默认计算配置
export const DEFAULT_CONFIG: CalculationConfig = {
  level: 95,
  enemyLevel: 95,
  enemyColdRes: 40,
  enemyLightningRes: 40,
  enemyFireRes: 40,
  enemyErosionRes: 30,
  enemyArmor: 27273,
  enemyResCap: 60,

  fervorEnabled: false,
  enemyFrozen: false,
  enemyIgnited: false,
  enemyShocked: false,
  enemyChilled: false,
  hasFullLife: false,
  hasLowLife: false,
  hasFullMana: false,
  hasLowMana: false,
  channeling: false,
  overloaded: false,
  singleTarget: true,

  fervorPoints: 0,
  numEnemiesNearby: 1,
};

// 基础暴击伤害倍率
export const BASE_CRIT_MULTIPLIER = 1.5;

// 召唤物基础暴击值
export const MINION_BASE_CRIT_RATING = 500;

// 技能基础暴击值（法术）
export const SPELL_BASE_CRIT_RATING = 500;

// 主属性每点伤害加成百分比
export const MAIN_STAT_DAMAGE_PER_POINT = 0.5;

// 抗性上限默认值
export const DEFAULT_RES_CAP = 60;

// 抗性最大上限
export const MAX_RES_CAP = 90;

// 伤害上限（单次击中）
export const MAX_HIT_DAMAGE = 500_000_000_000_000; // 500万亿

// 每秒最大伤害判定次数
export const MAX_HITS_PER_SECOND = 30;
