import type { Mod } from '../types/mod.ts';
import type { Loadout, TalentNodeConfig, DivinitySlateConfig, HeroMemoryConfig, PactspiritConfig } from '../types/calc.ts';
import type { GearInstance } from '../types/gear.ts';
import type { SkillGroup } from '../types/skill.ts';
import { getSkill } from '@/data/skills/index.ts';
import { getAllTalentBoards } from '@/data/talent-trees/index.ts';
import { getSlate } from '@/data/slate/index.ts';
import { getHeroMemory } from '@/data/hero-memory/index.ts';
import { getPactspirit } from '@/data/pactspirit/index.ts';

/**
 * 从完整的 BD 配置（Loadout）中收集所有 Mod
 * 这是计算管线的第一阶段
 */
export function collectAllMods(loadout: Loadout): Mod[] {
  const mods: Mod[] = [];

  // 1. 从装备收集
  collectFromGear(loadout.gear, mods);

  // 2. 从技能收集
  collectFromSkills(loadout.skillGroups, mods);

  // 3. 从天赋收集
  collectFromTalents(loadout.talents, mods);

  // 4. 从神格石板收集
  collectFromSlates(loadout.divinitySlates, mods);

  // 5. 从追忆收集
  collectFromMemories(loadout.heroMemories, mods);

  // 6. 从契灵收集
  collectFromPactspirits(loadout.pactspirits, mods);

  return mods;
}

function collectFromGear(gear: Loadout['gear'], mods: Mod[]): void {
  const instances: (GearInstance | null)[] = [
    gear.weapon_main, gear.weapon_off,
    gear.helmet, gear.chest, gear.gloves, gear.boots,
    gear.neck, gear.ring1, gear.ring2, gear.belt,
  ];

  for (const instance of instances) {
    if (!instance) continue;

    // 收集基底隐含属性
    // TODO: 从 gearBase 数据查找 implicitMods

    // 收集词缀属性
    for (const affix of instance.affixes) {
      mods.push(...affix.mods);
    }

    // 收集赋魔属性
    if (instance.enchantMods) {
      mods.push(...instance.enchantMods);
    }

    // 收集侵蚀属性
    if (instance.corruptionMods) {
      mods.push(...instance.corruptionMods);
    }
  }
}

function collectFromSkills(skillGroups: SkillGroup[], mods: Mod[]): void {
  for (const group of skillGroups) {
    if (!group.enabled) continue;

    // 收集主动技能等级 Mod
    const skillData = getSkill(group.activeSkill.skillId);
    if (skillData?.levelMods) {
      const skillMods = skillData.levelMods(group.activeSkill.level);
      mods.push(...skillMods);
    }

    // 收集辅助技能 Mod
    for (const support of group.supportSkills) {
      if (!support.enabled) continue;
      const supportData = getSkill(support.skillId);
      if (supportData?.levelMods) {
        const supportMods = supportData.levelMods(support.level);
        mods.push(...supportMods);
      }
    }
  }
}

function collectFromTalents(talents: TalentNodeConfig[], mods: Mod[]): void {
  const boards = getAllTalentBoards();
  const nodeMap = new Map<string, { mods: Mod[] }>();

  for (const board of boards) {
    for (const node of board.nodes) {
      nodeMap.set(node.id, node);
    }
  }

  for (const talent of talents) {
    if (talent.points <= 0) continue;
    const nodeData = nodeMap.get(talent.nodeId);
    if (!nodeData) continue;

    // 每点提供一份 mods
    for (let i = 0; i < talent.points; i++) {
      mods.push(...nodeData.mods);
    }
  }
}

function collectFromSlates(slates: DivinitySlateConfig[], mods: Mod[]): void {
  for (const slateConfig of slates) {
    const slateData = getSlate(slateConfig.slateId);
    if (!slateData) continue;

    // 石板基础属性
    mods.push(...slateData.mods);

    // 刻印属性
    mods.push(...slateConfig.engravings);
  }
}

function collectFromMemories(memories: HeroMemoryConfig[], mods: Mod[]): void {
  for (const memoryConfig of memories) {
    const memoryData = getHeroMemory(memoryConfig.memoryId);
    if (!memoryData) continue;

    // 收集所有套装加成
    for (const bonus of memoryData.setBonuses) {
      mods.push(...bonus.mods);
    }
  }
}

function collectFromPactspirits(pactspirits: PactspiritConfig[], mods: Mod[]): void {
  for (const spiritConfig of pactspirits) {
    const spiritData = getPactspirit(spiritConfig.spiritId);
    if (!spiritData) continue;

    // 收集当前阶位及以下的所有效果
    for (const effect of spiritData.stageEffects) {
      if (effect.stage <= spiritConfig.stage) {
        mods.push(...effect.mods);
      }
    }
  }
}
