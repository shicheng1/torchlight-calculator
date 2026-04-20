import type { HeroData } from '@/engine/types/hero.ts';
import { motoData } from './moto.ts';
import { gemmaData } from './gemma.ts';
import { yargaData } from './yarga.ts';

export const heroesData: Record<string, HeroData> = {
  moto: motoData,
  gemma: gemmaData,
  yarga: yargaData,
};

export function getHero(id: string): HeroData | undefined {
  return heroesData[id];
}

export function getAllHeroes(): HeroData[] {
  return Object.values(heroesData);
}
