// ============ 伤害类型 ============
export type DmgChunkType = 'physical' | 'cold' | 'lightning' | 'fire' | 'erosion';

// 伤害修饰词类型（用于 INC/More 增伤的分类）
export type DmgModType =
  | 'global'        // 全域伤害（攻击和法术都受影响）
  | 'melee'         // 近战
  | 'area'          // 范围
  | 'attack'        // 攻击
  | 'spell'         // 法术
  | 'physical'      // 物理
  | 'cold'          // 冰冷
  | 'lightning'     // 闪电
  | 'fire'          // 火焰
  | 'erosion'       // 腐蚀
  | 'elemental'     // 元素（火+冰+雷）
  | 'ailment'       // 异常状态
  | 'projectile'    // 投射物
  | 'ranged'        // 远程
  | 'hit'           // 击中
  | 'damage_over_time' // 持续伤害
  | 'minion'        // 召唤物
  | 'minion_attack' // 召唤物攻击
  | 'minion_spell'  // 召唤物法术
  // 组合类型
  | 'attack_physical'
  | 'spell_physical'
  | 'attack_projectile'
  | 'spell_projectile'
  | 'attack_elemental'
  | 'spell_elemental'
  | 'melee_attack'
  | 'ranged_attack';

// 技能标签
export type SkillTag =
  | 'attack' | 'spell' | 'melee' | 'ranged' | 'projectile' | 'area'
  | 'physical' | 'fire' | 'cold' | 'lightning' | 'erosion' | 'elemental'
  | 'duration' | 'sentry' | 'channel' | 'mobility' | 'aura' | 'curse'
  | 'minion' | 'minion_skill' | 'slash_strike' | 'shadow_strike'
  | 'trigger' | 'buff' | 'dot' | 'blink' | 'guard';

// 条件类型
export type Condition =
  | 'full_life'           // 满血（>95%生命）
  | 'low_life'            // 低血（<35%生命）
  | 'full_mana'           // 满魔（>95%魔力）
  | 'low_mana'            // 低魔（<35%魔力）
  | 'recently_killed'     // 最近击杀（4秒内）
  | 'enemy_frozen'        // 敌人被冻结
  | 'enemy_ignited'       // 敌人被点燃
  | 'enemy_shocked'       // 敌人被感电
  | 'enemy_chilled'       // 敌人被冰缓
  | 'enemy_bleeding'      // 敌人流血
  | 'enemy_nearby'        // 周围有敌人
  | 'single_target'       // 仅单个敌人
  | 'channeling'          // 正在引导
  | 'fervor_active'       // 狂热激活
  | 'overloaded'          // 超载状态
  | 'minion_active'       // 召唤物存活
  | 'minion_exploded'     // 召唤物自爆后
  | 'custom';             // 自定义条件

// Mod 来源标记
export type ModSource =
  | 'hero_trait'
  | 'hero_memory'
  | 'gear_base'
  | 'gear_affix'
  | 'gear_legendary'
  | 'talent'
  | 'divinity_slate'
  | 'pactspirit'
  | 'skill_level'
  | 'support_skill'
  | 'destiny'
  | 'custom';

// ============ 每 X 叠加配置 ============
export interface PerStackable {
  stat: string;          // 叠加的属性名
  per: number;           // 每 X
  limit?: number;        // 上限
}

// ============ 核心 Mod 类型 ============

// 伤害百分比加成（INC/More）
export interface DmgPctMod {
  type: 'DmgPct';
  value: number;               // 百分比值
  dmgModType: DmgModType;      // 作用于哪种伤害
  addn: boolean;               // true=More(额外), false=INC(增加)
  isEnemyDebuff?: boolean;     // 是否为敌方减益
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;          // 来源详情（如装备名、天赋名）
}

// 攻击附加点伤
export interface FlatDmgToAtksMod {
  type: 'FlatDmgToAtks';
  value: { min: number; max: number };
  dmgType: DmgChunkType;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 法术附加点伤
export interface FlatDmgToSpellsMod {
  type: 'FlatDmgToSpells';
  value: { min: number; max: number };
  dmgType: DmgChunkType;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 召唤物伤害百分比加成
export interface MinionDmgPctMod {
  type: 'MinionDmgPct';
  value: number;
  addn: boolean;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 召唤物附加点伤
export interface MinionFlatDmgMod {
  type: 'MinionFlatDmg';
  value: { min: number; max: number };
  dmgType: DmgChunkType;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 召唤物攻速加成
export interface MinionAspdPctMod {
  type: 'MinionAspdPct';
  value: number;
  addn: boolean;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 召唤物数量
export interface MinionCountMod {
  type: 'MinionCount';
  value: number;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 暴击值加成（百分比）
export interface CritRatingPctMod {
  type: 'CritRatingPct';
  value: number;
  modType: 'global' | 'attack' | 'spell' | 'projectile' | 'melee' | 'ranged_attack' | 'minion';
  addn: boolean;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 暴击值加成（固定值）
export interface FlatCritRatingMod {
  type: 'FlatCritRating';
  value: number;
  modType: 'global' | 'attack' | 'spell' | 'projectile' | 'melee' | 'ranged_attack' | 'minion';
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 暴击伤害加成
export interface CritDmgPctMod {
  type: 'CritDmgPct';
  value: number;
  addn: boolean;
  modType: 'global' | 'attack' | 'spell' | 'physical_skill' | 'cold_skill' | 'lightning_skill' | 'fire_skill' | 'erosion_skill' | 'minion';
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 攻击速度加成
export interface AspdPctMod {
  type: 'AspdPct';
  value: number;
  addn: boolean;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 施法速度加成
export interface CspdPctMod {
  type: 'CspdPct';
  value: number;
  addn: boolean;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 伤害转化
export interface ConvertDmgPctMod {
  type: 'ConvertDmgPct';
  from: DmgChunkType;
  to: DmgChunkType;
  value: number;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 抗性穿透
export interface ResPenPctMod {
  type: 'ResPenPct';
  value: number;
  penType: 'cold' | 'lightning' | 'fire' | 'erosion' | 'elemental' | 'all';
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 护甲穿透
export interface ArmorPenPctMod {
  type: 'ArmorPenPct';
  value: number;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 技能等级
export interface SkillLevelMod {
  type: 'SkillLevel';
  value: number;
  skillId?: string;          // 特定技能ID，undefined表示所有匹配技能
  skillTag?: SkillTag;       // 按标签匹配
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 双倍伤害几率
export interface DoubleDmgChanceMod {
  type: 'DoubleDmgChancePct';
  value: number;
  addn: boolean;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 超载加成（莫托特性）
export interface OverloadPctMod {
  type: 'OverloadPct';
  value: number;
  addn: boolean;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 超载持续时间加成（莫托特性）
export interface OverloadDurationPctMod {
  type: 'OverloadDurationPct';
  value: number;
  addn: boolean;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 自爆伤害加成（冲锋征召）
export interface ExplodeDmgPctMod {
  type: 'ExplodeDmgPct';
  value: number;
  addn: boolean;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 主属性加成
export interface StatMod {
  type: 'Stat';
  stat: 'str' | 'dex' | 'int';
  value: number;             // 固定值
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 召唤物施法速度加成
export interface MinionCspdPctMod {
  type: 'MinionCspdPct';
  value: number;
  addn: boolean;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 召唤物体型加成
export interface MinionSizePctMod {
  type: 'MinionSizePct';
  value: number;
  addn: boolean;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 移动速度加成
export interface MoveSpeedPctMod {
  type: 'MoveSpeedPct';
  value: number;
  addn: boolean;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 全抗性加成
export interface ResAllPctMod {
  type: 'ResAllPct';
  value: number;
  addn: boolean;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 冷却回复速度加成
export interface CdrPctMod {
  type: 'CdrPct';
  value: number;
  addn: boolean;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 生命回复
export interface LifeRecoveryPctMod {
  type: 'LifeRecoveryPct';
  value: number;
  addn: boolean;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 伤害转换（物理转元素等）
export interface PhysToElementMod {
  type: 'PhysToElement';
  value: number;
  to: DmgChunkType;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 连续攻击几率
export interface ConsecutiveAtkChanceMod {
  type: 'ConsecutiveAtkChancePct';
  value: number;
  addn: boolean;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 召唤物暴击伤害加成
export interface MinionCritDmgPctMod {
  type: 'MinionCritDmgPct';
  value: number;
  addn: boolean;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 召唤物暴击值加成（固定值）
export interface MinionFlatCritRatingMod {
  type: 'MinionFlatCritRating';
  value: number;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 敌人受到伤害增加（减益）
export interface EnemyDmgTakenMod {
  type: 'EnemyDmgTakenPct';
  value: number;
  addn: boolean;
  dmgType?: DmgChunkType;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 技能范围加成
export interface SkillRangePctMod {
  type: 'SkillRangePct';
  value: number;
  addn: boolean;
  per?: PerStackable;
  cond?: Condition;
  src?: ModSource;
  srcDetail?: string;
}

// 所有 Mod 的联合类型
export type Mod =
  | DmgPctMod
  | FlatDmgToAtksMod
  | FlatDmgToSpellsMod
  | MinionDmgPctMod
  | MinionFlatDmgMod
  | MinionAspdPctMod
  | MinionCspdPctMod
  | MinionSizePctMod
  | MinionCountMod
  | MinionCritDmgPctMod
  | MinionFlatCritRatingMod
  | CritRatingPctMod
  | FlatCritRatingMod
  | CritDmgPctMod
  | AspdPctMod
  | CspdPctMod
  | MoveSpeedPctMod
  | ResAllPctMod
  | CdrPctMod
  | LifeRecoveryPctMod
  | ConvertDmgPctMod
  | PhysToElementMod
  | ResPenPctMod
  | ArmorPenPctMod
  | SkillLevelMod
  | DoubleDmgChanceMod
  | OverloadPctMod
  | OverloadDurationPctMod
  | ExplodeDmgPctMod
  | ConsecutiveAtkChanceMod
  | EnemyDmgTakenMod
  | SkillRangePctMod
  | StatMod;
