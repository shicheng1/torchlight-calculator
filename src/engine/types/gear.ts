import type { Mod } from './mod.ts';

// 装备部位
export type EquipmentSlot =
  | 'weapon_main'    // 主手武器
  | 'weapon_off'     // 副手武器
  | 'helmet'         // 头盔
  | 'chest'          // 胸甲
  | 'gloves'         // 手套
  | 'boots'          // 鞋子
  | 'neck'           // 项链
  | 'ring1'          // 戒指1
  | 'ring2'          // 戒指2
  | 'belt';          // 腰带

// 装备类型
export type EquipmentType =
  | 'weapon' | 'helmet' | 'chest' | 'gloves' | 'boots'
  | 'neck' | 'ring' | 'belt' | 'shield';

// 武器类型
export type WeaponType =
  | 'one_hand_melee'   // 单手近战
  | 'one_hand_ranged'  // 单手远程
  | 'two_hand_melee'   // 双手近战
  | 'two_hand_ranged'; // 双手远程

// 装备稀有度
export type GearRarity = 'normal' | 'magic' | 'rare' | 'epic' | 'legendary';

// 词缀类型
export type AffixType = 'prefix' | 'suffix' | 'blend' | 'sweet_dream' | 'tower_sequence';

// 伤害范围
export interface DmgRange {
  min: number;
  max: number;
}

// 词缀
export interface Affix {
  id: string;
  name: string;
  nameCN: string;
  text: string;              // 原始文本（如"+12% 攻击伤害"）
  affixType: AffixType;
  tier: number;              // T0-T6
  mods: Mod[];               // 解析后的 Mod 数组
  requiredLevel?: number;
}

// 装备基底
export interface GearBase {
  id: string;
  name: string;
  nameCN: string;
  equipmentType: EquipmentType;
  weaponType?: WeaponType;
  rarity: GearRarity;
  itemLevel: number;
  energyValue: number;       // 能量值
  baseStats: BaseStatLine[];
  implicitMods: Mod[];       // 隐含属性（基底自带）
  allowedAffixTypes: AffixType[];
  maxPrefixes: number;
  maxSuffixes: number;
}

// 基底属性行
export interface BaseStatLine {
  text: string;
  mods: Mod[];
}

// 装备实例（玩家配置的装备）
export interface GearInstance {
  slot: EquipmentSlot;
  baseId: string;
  rarity: GearRarity;
  affixes: Affix[];          // 已装备的词缀
  quality?: number;          // 品质
  enchantMods?: Mod[];       // 赋魔属性
  corruptionMods?: Mod[];    // 侵蚀属性
  setId?: string;            // 套装ID
}

// 套装效果
export interface SetBonus {
  setId: string;
  name: string;
  nameCN: string;
  piecesRequired: number;
  mods: Mod[];
}

// 装备栏位配置
export interface LoadoutGear {
  weapon_main: GearInstance | null;
  weapon_off: GearInstance | null;
  helmet: GearInstance | null;
  chest: GearInstance | null;
  gloves: GearInstance | null;
  boots: GearInstance | null;
  neck: GearInstance | null;
  ring1: GearInstance | null;
  ring2: GearInstance | null;
  belt: GearInstance | null;
}
