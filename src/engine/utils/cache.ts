import type { Loadout, CalculationConfig, CalculationResult } from '../types/calc.ts';

interface CacheItem {
  key: string;
  result: CalculationResult;
  timestamp: number;
}

class CalculationCache {
  private cache: Map<string, CacheItem> = new Map();
  private maxSize = 100;
  private ttl = 5 * 60 * 1000; // 5分钟过期

  /**
   * 生成缓存键
   */
  generateKey(loadout: Loadout, config: CalculationConfig): string {
    // 对loadout和config进行序列化，生成唯一键
    const data = {
      // 英雄信息
      hero: loadout.hero,
      // 装备信息（只包含关键属性）
      gear: Object.entries(loadout.gear).reduce((acc: Record<string, any>, [key, value]) => {
        if (value) {
          acc[key] = {
            baseId: value.baseId,
            affixes: value.affixes?.map((a: any) => a.mods.map((m: any) => m.type)),
            enchantMods: value.enchantMods?.map((m: any) => m.type),
            corruptionMods: value.corruptionMods?.map((m: any) => m.type),
          };
        }
        return acc;
      }, {} as Record<string, any>),
      // 技能信息
      skillGroups: loadout.skillGroups.map(group => ({
        activeSkill: {
          skillId: group.activeSkill.skillId,
          level: group.activeSkill.level,
        },
        supportSkills: group.supportSkills
          .filter(s => s.enabled)
          .map(s => ({ skillId: s.skillId, level: s.level })),
      })),
      // 天赋信息
      talents: loadout.talents.map(t => ({ nodeId: t.nodeId, points: t.points })),
      coreTalents: loadout.coreTalents,
      // 神格石板
      divinitySlates: loadout.divinitySlates,
      // 追忆
      heroMemories: loadout.heroMemories,
      // 契灵
      pactspirits: loadout.pactspirits,
      // 计算配置
      config,
    };

    return JSON.stringify(data);
  }

  /**
   * 获取缓存
   */
  get(key: string): CalculationResult | null {
    const item = this.cache.get(key);
    if (!item) return null;

    // 检查是否过期
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.result;
  }

  /**
   * 设置缓存
   */
  set(key: string, result: CalculationResult): void {
    // 清理过期缓存
    this.cleanExpired();

    // 检查缓存大小
    if (this.cache.size >= this.maxSize) {
      // 删除最早的缓存
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      key,
      result,
      timestamp: Date.now(),
    });
  }

  /**
   * 清理过期缓存
   */
  private cleanExpired(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > this.ttl) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * 清空缓存
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * 获取缓存大小
   */
  size(): number {
    return this.cache.size;
  }
}

// 导出单例
export const calculationCache = new CalculationCache();
