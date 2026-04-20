import type { DmgChunkType, DmgModType } from './mod.ts';
import type { Mod } from './mod.ts';

// 伤害详情
export interface DamageDetail {
  baseDamage: number;             // 基础伤害
  convertedFrom?: { from: DmgChunkType; amount: number }[]; // 转化来源
  incTotal: number;               // INC 总和
  moreMultipliers: { value: number; src: string }[]; // More 列表
  finalHitDamage: number;         // 乘区后伤害
  afterResist: number;            // 减抗后伤害
  afterArmor: number;             // 减护甲后伤害
}

// 增伤来源明细
export interface IncSource {
  modType: DmgModType;
  total: number;
  sources: { value: number; src: string; detail?: string }[];
}

// More 来源明细
export interface MoreSource {
  value: number;
  modType: DmgModType;
  src: string;
  detail?: string;
}

// 召唤物伤害详情
export interface MinionDamageDetail {
  minionCount: number;
  minionAttackSpeed: number;      // 每个召唤物每秒攻击次数
  minionBaseDamage: number;
  minionIncTotal: number;
  minionMoreMultipliers: MoreSource[];
  minionCritChance: number;
  minionCritMultiplier: number;
  minionExpectedDamage: number;
  explodeDamage: number;          // 自爆伤害
  explodeCooldown: number;        // 自爆冷却
  totalMinionDPS: number;
}

// 计算配置
export interface CalculationConfig {
  level: number;                  // 角色等级（默认95）

  // 怪物配置
  enemyLevel: number;             // 怪物等级（默认95）
  enemyColdRes: number;           // 冰冷抗性（默认40）
  enemyLightningRes: number;      // 闪电抗性（默认40）
  enemyFireRes: number;           // 火焰抗性（默认40）
  enemyErosionRes: number;        // 腐蚀抗性（默认30）
  enemyArmor: number;             // 怪物护甲（默认27273）
  enemyResCap: number;            // 怪物抗性上限（默认60）

  // Buff/Debuff 开关
  fervorEnabled: boolean;
  enemyFrozen: boolean;
  enemyIgnited: boolean;
  enemyShocked: boolean;
  enemyChilled: boolean;
  hasFullLife: boolean;
  hasLowLife: boolean;
  hasFullMana: boolean;
  hasLowMana: boolean;
  channeling: boolean;
  overloaded: boolean;            // 超载状态（莫托）
  singleTarget: boolean;          // 单目标

  // 数值配置
  fervorPoints: number;
  numEnemiesNearby: number;
}

// 完整计算结果
export interface CalculationResult {
  // 总览
  totalDPS: number;
  hitDPS: number;
  totalHitDamage: number;

  // 暴击
  critChance: number;             // 0-1
  critMultiplier: number;         // 伤害倍率（如3.5表示350%）
  expectedCritDamage: number;     // 暴击期望系数

  // 双倍伤害
  doubleDmgChance: number;        // 0-1
  expectedDoubleDmg: number;      // 双倍期望系数

  // 速度
  attacksPerSecond: number;

  // 伤害分解
  damageBreakdown: Record<DmgChunkType, DamageDetail>;

  // 增伤明细
  incBreakdown: IncSource[];
  moreBreakdown: MoreSource[];

  // 抗性穿透
  effectiveResistances: Record<DmgChunkType, number>;

  // 护甲减伤
  armorMitigation: number;

  // 召唤物详情（如果适用）
  minionDetail?: MinionDamageDetail;

  // 异常状态/DOT
  ailmentDetail?: {
    igniteDPS: number;
    frostbiteDPS: number;
    shockDPS: number;
    erosionDPS: number;
    totalDotDPS: number;
  };
}

// 聚合后的 Mod
export interface AggregatedMods {
  // INC 类：同类相加
  incDmg: Partial<Record<DmgModType, number>>;
  incAspd: number;
  incCspd: number;
  incCritRating: Partial<Record<string, number>>;
  incCritDmg: Partial<Record<string, number>>;
  incMinionDmg: number;
  incMinionAspd: number;

  // More 类：每个独立项保留
  moreDmg: { value: number; modType: DmgModType; src: string; detail?: string }[];
  moreAspd: { value: number; src: string }[];
  moreCspd: { value: number; src: string }[];
  moreCritRating: { value: number; modType: string; src: string }[];
  moreCritDmg: { value: number; modType: string; src: string }[];
  moreMinionDmg: { value: number; src: string }[];
  moreMinionAspd: { value: number; src: string }[];

  // 附加伤害
  flatDmgToAtks: Partial<Record<DmgChunkType, { min: number; max: number }>>;
  flatDmgToSpells: Partial<Record<DmgChunkType, { min: number; max: number }>>;
  flatMinionDmg: Partial<Record<DmgChunkType, { min: number; max: number }>>;

  // 召唤物
  minionCount: number;
  minionBaseCritRating: number;

  // 伤害转化
  convertDmg: { from: DmgChunkType; to: DmgChunkType; value: number }[];

  // 抗性穿透
  resPen: Partial<Record<string, number>>;
  armorPen: number;

  // 双倍伤害
  doubleDmgChance: number;

  // 超载
  overloadInc: number;
  overloadMore: { value: number; src: string }[];

  // 自爆
  explodeInc: number;
  explodeMore: { value: number; src: string }[];

  // 主属性
  totalStr: number;
  totalDex: number;
  totalInt: number;
}

// 完整的 BD 配置（Loadout）
export interface Loadout {
  hero: import('./hero.ts').HeroConfig;
  gear: import('./gear.ts').LoadoutGear;
  skillGroups: import('./skill.ts').SkillGroup[];
  selectedSkillGroupIndex: number;
  talentBoards: string[]; // 选择的天赋板 ID 列表，最多4个
  talents: TalentNodeConfig[];
  coreTalents: CoreTalentSelection[];
  divinitySlates: DivinitySlateConfig[];
  heroMemories: HeroMemoryConfig[];
  pactspirits: PactspiritConfig[];
}

// 天赋节点配置
export interface TalentNodeConfig {
  nodeId: string;
  points: number;
}

// 核心天赋选择
export interface CoreTalentSelection {
  boardId: string;
  slotIndex: number;
  optionId: string;
}

// 神格石板配置
export interface DivinitySlateConfig {
  slateId: string;
  engravings: Mod[];
}

// 追忆配置
export interface HeroMemoryConfig {
  memoryId: string;
  level: number;
  affixes: string[];
}

// 契灵配置
export interface PactspiritConfig {
  spiritId: string;
  stage: number;               // 阶位（1-6）
  innerRingPoints: number;
  middleRingPoints: number;
  outerRingPoints: number;
}
