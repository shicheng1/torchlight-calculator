import { calculate } from '../src/engine/pipeline.js';
import type { Loadout, CalculationConfig } from '../src/engine/types/calc.js';

// 模拟一个复杂的build配置
const mockLoadout: Loadout = {
  hero: {
    heroId: '1',
    traitId: '1-1',
    level: 95,
  },
  gear: {
    weapon_main: {
      baseId: 'weapon_1',
      affixes: [],
      enchantMods: [],
      corruptionMods: [],
    },
    weapon_off: null,
    helmet: {
      baseId: 'helmet_1',
      affixes: [],
      enchantMods: [],
      corruptionMods: [],
    },
    chest: {
      baseId: 'chest_1',
      affixes: [],
      enchantMods: [],
      corruptionMods: [],
    },
    gloves: {
      baseId: 'gloves_1',
      affixes: [],
      enchantMods: [],
      corruptionMods: [],
    },
    boots: {
      baseId: 'boots_1',
      affixes: [],
      enchantMods: [],
      corruptionMods: [],
    },
    neck: {
      baseId: 'neck_1',
      affixes: [],
      enchantMods: [],
      corruptionMods: [],
    },
    ring1: {
      baseId: 'ring_1',
      affixes: [],
      enchantMods: [],
      corruptionMods: [],
    },
    ring2: {
      baseId: 'ring_2',
      affixes: [],
      enchantMods: [],
      corruptionMods: [],
    },
    belt: {
      baseId: 'belt_1',
      affixes: [],
      enchantMods: [],
      corruptionMods: [],
    },
  },
  skillGroups: [
    {
      enabled: true,
      activeSkill: {
        skillId: 'skill_1',
        level: 20,
      },
      supportSkills: [
        {
          enabled: true,
          skillId: 'support_1',
          level: 20,
        },
        {
          enabled: true,
          skillId: 'support_2',
          level: 20,
        },
        {
          enabled: true,
          skillId: 'support_3',
          level: 20,
        },
      ],
    },
  ],
  selectedSkillGroupIndex: 0,
  talents: Array.from({ length: 50 }, (_, i) => ({
    nodeId: `talent_${i}`,
    points: 1,
  })),
  coreTalents: [],
  divinitySlates: [],
  heroMemories: [],
  pactspirits: [],
};

const mockConfig: CalculationConfig = {
  level: 95,
  enemyLevel: 95,
  enemyColdRes: 40,
  enemyLightningRes: 40,
  enemyFireRes: 40,
  enemyErosionRes: 30,
  enemyArmor: 27273,
  enemyResCap: 60,
  fervorEnabled: false,
  enemyFrozen: false,
  enemyIgnited: false,
  enemyShocked: false,
  enemyChilled: false,
  hasFullLife: false,
  hasLowLife: false,
  hasFullMana: false,
  hasLowMana: false,
  channeling: false,
  overloaded: false,
  singleTarget: true,
  fervorPoints: 0,
  numEnemiesNearby: 1,
};

async function performanceTest() {
  console.log('开始性能测试...');
  
  // 预热计算
  console.log('预热计算...');
  await calculate(mockLoadout, mockConfig);
  
  // 测试多次计算的平均时间
  const testCount = 10;
  const times: number[] = [];
  
  console.log(`执行 ${testCount} 次计算...`);
  for (let i = 0; i < testCount; i++) {
    const start = performance.now();
    await calculate(mockLoadout, mockConfig);
    const end = performance.now();
    const time = end - start;
    times.push(time);
    console.log(`第 ${i + 1} 次计算时间: ${time.toFixed(2)}ms`);
  }
  
  // 计算平均值
  const averageTime = times.reduce((sum, time) => sum + time, 0) / times.length;
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);
  
  console.log('\n性能测试结果:');
  console.log(`平均计算时间: ${averageTime.toFixed(2)}ms`);
  console.log(`最快计算时间: ${minTime.toFixed(2)}ms`);
  console.log(`最慢计算时间: ${maxTime.toFixed(2)}ms`);
  
  // 检查是否满足性能要求
  if (averageTime < 1000) {
    console.log('✅ 性能测试通过！平均响应时间小于1秒');
  } else {
    console.log('❌ 性能测试未通过！平均响应时间超过1秒');
  }
}

// 运行测试
performanceTest().catch(console.error);
