import type { Mod } from './mod.ts';

// 主属性
export type MainStat = 'str' | 'dex' | 'int';

// 英雄数据
export interface HeroData {
  id: string;
  name: string;
  nameCN: string;
  mainStat: MainStat;
  baseStr: number;
  baseDex: number;
  baseInt: number;
  strPerLevel: number;
  dexPerLevel: number;
  intPerLevel: number;
  baseLife: number;
  baseMana: number;
  lifePerLevel: number;
  manaPerLevel: number;
  traits: HeroTraitData[];
  weaponTypes: string[];          // 可用武器类型
}

// 英雄特性数据
export interface HeroTraitData {
  id: string;
  name: string;
  nameCN: string;
  description: string;
  // 特性每级提供的 Mod
  levelMods: {
    level: number;
    mods: Mod[];
    description: string;
  }[];
}

// 英雄配置
export interface HeroConfig {
  heroId: string;
  traitId: string;
  level: number;
}
