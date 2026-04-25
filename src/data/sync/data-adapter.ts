import type { SkillData } from '@/engine/types/skill.ts';
import type { HeroData } from '@/engine/types/hero.ts';
import { syncManager } from './sync-manager.ts';

// 技能数据适配器
function adaptSkillsData(remoteData: any): Record<string, SkillData> {
  if (!remoteData || typeof remoteData !== 'object') {
    return {};
  }

  return Object.entries(remoteData).reduce((acc, [key, value]) => {
    if (value && typeof value === 'object') {
      const skillValue = value as any;
      acc[key] = {
        id: skillValue.id || key,
        name: skillValue.name || '',
        nameCN: skillValue.nameCN || '',
        category: skillValue.category || 'active',
        subType: skillValue.subType || 'normal',
        tags: skillValue.tags || [],
        description: skillValue.description || '',
        baseDamagePct: skillValue.baseDamagePct,
        baseDamagePctPerLevel: skillValue.baseDamagePctPerLevel,
        baseDamage: skillValue.baseDamage,
        damageType: skillValue.damageType || 'physical',
        attackSpeedMultiplier: skillValue.attackSpeedMultiplier || 1.0,
        baseCritRating: skillValue.baseCritRating || 500,
        projectileCount: skillValue.projectileCount || 1,
        hitsPerCast: skillValue.hitsPerCast || 1,
        manaCost: skillValue.manaCost,
        manaCostPerLevel: skillValue.manaCostPerLevel,
        maxLevel: skillValue.maxLevel || 20,
        qualityBonus: skillValue.qualityBonus,
        supportManaMultiplier: skillValue.supportManaMultiplier,
        allowedTags: skillValue.allowedTags,
        minionBaseDamage: skillValue.minionBaseDamage,
        minionAttackSpeed: skillValue.minionAttackSpeed,
        minionCritRating: skillValue.minionCritRating || 500,
        minionCount: skillValue.minionCount,
        levelMods: skillValue.levelMods,
      };
    }
    return acc;
  }, {} as Record<string, SkillData>);
}

// 英雄数据适配器
function adaptHeroesData(remoteData: any): Record<string, HeroData> {
  if (!remoteData || typeof remoteData !== 'object') {
    return {};
  }

  return Object.entries(remoteData).reduce((acc, [key, value]) => {
    if (value && typeof value === 'object') {
      const heroValue = value as any;
      acc[key] = {
        id: heroValue.id || key,
        name: heroValue.name || '',
        nameCN: heroValue.nameCN || '',
        mainStat: heroValue.mainStat || 'str',
        baseStr: heroValue.baseStr || 0,
        baseDex: heroValue.baseDex || 0,
        baseInt: heroValue.baseInt || 0,
        strPerLevel: heroValue.strPerLevel || 0,
        dexPerLevel: heroValue.dexPerLevel || 0,
        intPerLevel: heroValue.intPerLevel || 0,
        baseLife: heroValue.baseLife || 0,
        baseMana: heroValue.baseMana || 0,
        lifePerLevel: heroValue.lifePerLevel || 0,
        manaPerLevel: heroValue.manaPerLevel || 0,
        traits: heroValue.traits || [],
        weaponTypes: heroValue.weaponTypes || [],
      };
    }
    return acc;
  }, {} as Record<string, HeroData>);
}

// 数据服务类
class DataService {
  // 获取技能数据
  getSkills(): Record<string, SkillData> {
    const remoteData = syncManager.getData('skills');
    if (remoteData) {
      return adaptSkillsData(remoteData);
    }
    // 回退到本地数据
    return this.loadLocalSkills();
  }

  // 获取英雄数据
  getHeroes(): Record<string, HeroData> {
    const remoteData = syncManager.getData('heroes');
    if (remoteData) {
      return adaptHeroesData(remoteData);
    }
    // 回退到本地数据
    return this.loadLocalHeroes();
  }

  // 获取装备数据
  getGear(): any {
    const remoteData = syncManager.getData('gear');
    if (remoteData) {
      return remoteData;
    }
    // 回退到本地数据
    return null;
  }

  // 获取契约精神数据
  getPactspirit(): any {
    const remoteData = syncManager.getData('pactspirit');
    if (remoteData) {
      return remoteData;
    }
    // 回退到本地数据
    return null;
  }

  // 获取石板数据
  getSlate(): any {
    const remoteData = syncManager.getData('slate');
    if (remoteData) {
      return remoteData;
    }
    // 回退到本地数据
    return null;
  }

  // 获取英雄记忆数据
  getHeroMemory(): any {
    const remoteData = syncManager.getData('hero-memory');
    if (remoteData) {
      return remoteData;
    }
    // 回退到本地数据
    return null;
  }

  // 加载本地技能数据
  private loadLocalSkills(): Record<string, SkillData> {
    try {
      // 由于是静态数据，直接返回空对象，实际使用时会从模块导入
      return {};
    } catch (error) {
      console.error('Failed to load local skills data:', error);
      return {};
    }
  }

  // 加载本地英雄数据
  private loadLocalHeroes(): Record<string, HeroData> {
    try {
      // 由于是静态数据，直接返回空对象，实际使用时会从模块导入
      return {};
    } catch (error) {
      console.error('Failed to load local heroes data:', error);
      return {};
    }
  }

  // 检查数据是否需要更新
  async checkForUpdates(): Promise<boolean> {
    const result = await syncManager.checkForUpdates();
    return result.success;
  }

  // 获取当前数据版本
  getCurrentVersion() {
    return syncManager.getCurrentVersion();
  }

  // 获取同步状态
  getSyncStatus() {
    return syncManager.getStatus();
  }

  // 监听同步事件
  onSyncEvent(event: any, listener: any) {
    syncManager.on(event, listener);
  }

  // 移除同步事件监听
  offSyncEvent(event: any, listener: any) {
    syncManager.off(event, listener);
  }
}

// 导出单例实例
export const dataService = new DataService();
export default DataService;
