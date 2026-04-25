import type { HeroData } from '@/engine/types/hero.ts';
import { dataService } from '@/data/sync/data-adapter.ts';
import { motoData } from './moto.ts';
import { gemmaData } from './gemma.ts';
import { yargaData } from './yarga.ts';

// 本地备用数据
const localHeroesData: Record<string, HeroData> = {
  moto: motoData,
  gemma: gemmaData,
  yarga: yargaData,
};

// 获取英雄数据（优先使用同步数据）
export const heroesData: Record<string, HeroData> = dataService.getHeroes() || localHeroesData;

export function getHero(id: string): HeroData | undefined {
  return heroesData[id];
}

export function getAllHeroes(): HeroData[] {
  return Object.values(heroesData);
}
