import { getHero } from '@/data/heroes/index.ts';
import { getGearBase } from '@/data/gear/index.ts';
import { getSkill } from '@/data/skills/index.ts';
import { getAllTalentBoards } from '@/data/talent-trees/index.ts';
import { getSlate } from '@/data/slate/index.ts';
import { getHeroMemory } from '@/data/hero-memory/index.ts';
import { getPactspirit } from '@/data/pactspirit/index.ts';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class DataCache {
  private caches: Map<string, Map<string, CacheItem<any>>> = new Map();
  private ttl = 10 * 60 * 1000; // 10分钟过期

  private getCache(namespace: string): Map<string, CacheItem<any>> {
    if (!this.caches.has(namespace)) {
      this.caches.set(namespace, new Map());
    }
    return this.caches.get(namespace)!;
  }

  private get<T>(namespace: string, key: string): T | null {
    const cache = this.getCache(namespace);
    const item = cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.ttl) {
      cache.delete(key);
      return null;
    }

    return item.data;
  }

  private set<T>(namespace: string, key: string, data: T): void {
    const cache = this.getCache(namespace);
    cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  // 英雄数据缓存
  getHero(heroId: string) {
    const key = heroId;
    const cached = this.get<any>('hero', key);
    if (cached) return cached;
    
    const data = getHero(heroId);
    if (data) {
      this.set('hero', key, data);
    }
    return data;
  }

  // 装备基础数据缓存
  getGearBase(baseId: string) {
    const key = baseId;
    const cached = this.get<any>('gearBase', key);
    if (cached) return cached;
    
    const data = getGearBase(baseId);
    if (data) {
      this.set('gearBase', key, data);
    }
    return data;
  }

  // 技能数据缓存
  getSkill(skillId: string) {
    const key = skillId;
    const cached = this.get<any>('skill', key);
    if (cached) return cached;
    
    const data = getSkill(skillId);
    if (data) {
      this.set('skill', key, data);
    }
    return data;
  }

  // 天赋板数据缓存
  getAllTalentBoards() {
    const key = 'all';
    const cached = this.get<any[]>('talentBoards', key);
    if (cached) return cached;
    
    const data = getAllTalentBoards();
    if (data) {
      this.set('talentBoards', key, data);
    }
    return data;
  }

  // 神格石板数据缓存
  getSlate(slateId: string) {
    const key = slateId;
    const cached = this.get<any>('slate', key);
    if (cached) return cached;
    
    const data = getSlate(slateId);
    if (data) {
      this.set('slate', key, data);
    }
    return data;
  }

  // 追忆数据缓存
  getHeroMemory(memoryId: string) {
    const key = memoryId;
    const cached = this.get<any>('heroMemory', key);
    if (cached) return cached;
    
    const data = getHeroMemory(memoryId);
    if (data) {
      this.set('heroMemory', key, data);
    }
    return data;
  }

  // 契灵数据缓存
  getPactspirit(spiritId: string) {
    const key = spiritId;
    const cached = this.get<any>('pactspirit', key);
    if (cached) return cached;
    
    const data = getPactspirit(spiritId);
    if (data) {
      this.set('pactspirit', key, data);
    }
    return data;
  }

  // 清空所有缓存
  clear() {
    this.caches.clear();
  }

  // 清空指定命名空间的缓存
  clearNamespace(namespace: string) {
    this.caches.delete(namespace);
  }
}

// 导出单例
export const dataCache = new DataCache();
