import type { Mod } from '@/engine/types/mod.ts';

export interface HeroMemoryData {
  id: string;
  name: string;
  nameCN: string;
  heroId: string;
  traitId: string;
  rarity: 'magic' | 'rare' | 'legendary';
  description: string;
  setBonuses: {
    pieces: number;
    description: string;
    mods: Mod[];
  }[];
}

export const heroMemoriesData: Record<string, HeroMemoryData> = {
  // ==================== 莫托-号令征召追忆 ====================
  moto_command_memory: {
    id: 'moto_command_memory',
    name: 'Command Memory',
    nameCN: '号令征召追忆',
    heroId: 'moto',
    traitId: 'moto_command_summon',
    rarity: 'legendary',
    description: '莫托号令征召套装追忆。伴我同行套装加成超载持续时间和效果',
    setBonuses: [
      {
        pieces: 2,
        description: '伴我同行2件：+30%超载持续时间',
        mods: [
          { type: 'OverloadDurationPct', value: 30, addn: true, src: 'hero_memory', srcDetail: '号令征召追忆-2件' } as Mod,
        ],
      },
      {
        pieces: 4,
        description: '伴我同行4件：+15%全部抗性；+20%超载效果',
        mods: [
          { type: 'ResAllPct', value: 15, addn: false, src: 'hero_memory', srcDetail: '号令征召追忆-4件' } as Mod,
          { type: 'OverloadPct', value: 20, addn: true, src: 'hero_memory', srcDetail: '号令征召追忆-4件' } as Mod,
        ],
      },
      {
        pieces: 6,
        description: '伴我同行6件：每次施加超载获得1点统御值',
        mods: [
          { type: 'Stat', stat: 'int', value: 1, per: { stat: 'overload_apply_count', per: 1 }, src: 'hero_memory', srcDetail: '号令征召追忆-6件' } as Mod,
        ],
      },
    ],
  },

  // ==================== 莫托-冲锋征召追忆 ====================
  moto_charge_memory: {
    id: 'moto_charge_memory',
    name: 'Charge Memory',
    nameCN: '冲锋征召追忆',
    heroId: 'moto',
    traitId: 'moto_charge_summon',
    rarity: 'legendary',
    description: '莫托冲锋征召套装追忆。伴我同行套装加成自爆伤害和零件掉落',
    setBonuses: [
      {
        pieces: 2,
        description: '伴我同行2件：+20%超载冷却回复速度',
        mods: [
          { type: 'CdrPct', value: 20, addn: true, src: 'hero_memory', srcDetail: '冲锋征召追忆-2件' } as Mod,
        ],
      },
      {
        pieces: 4,
        description: '伴我同行4件：+15%全部抗性；智械启动自毁时6%几率掉落机械零件',
        mods: [
          { type: 'ResAllPct', value: 15, addn: false, src: 'hero_memory', srcDetail: '冲锋征召追忆-4件' } as Mod,
        ],
      },
    ],
  },

  // ==================== 吉玛-欢愉之焰追忆 ====================
  gemma_joyful_flame_memory: {
    id: 'gemma_joyful_flame_memory',
    name: 'Joyful Flame Memory',
    nameCN: '欢愉之焰追忆',
    heroId: 'gemma',
    traitId: 'gemma_joyful_flame',
    rarity: 'legendary',
    description: '吉玛欢愉之焰套装追忆。伴我同行套装加成炼狱伤害和持续时间',
    setBonuses: [
      {
        pieces: 2,
        description: '伴我同行2件：+30%烙印记录的伤害比例',
        mods: [
          { type: 'DmgPct', value: 30, addn: true, dmgModType: 'fire', src: 'hero_memory', srcDetail: '欢愉之焰追忆-2件' } as Mod,
        ],
      },
      {
        pieces: 4,
        description: '伴我同行4件：+15%全部抗性；额外+20%炼狱持续时间',
        mods: [
          { type: 'ResAllPct', value: 15, addn: false, src: 'hero_memory', srcDetail: '欢愉之焰追忆-4件' } as Mod,
          { type: 'DmgPct', value: 20, addn: true, dmgModType: 'fire', src: 'hero_memory', srcDetail: '欢愉之焰追忆-4件' } as Mod,
        ],
      },
      {
        pieces: 6,
        description: '伴我同行6件：-15%火刑移除的烙印记录的伤害',
        mods: [
          { type: 'DmgPct', value: 15, addn: false, dmgModType: 'fire', src: 'hero_memory', srcDetail: '欢愉之焰追忆-6件' } as Mod,
        ],
      },
    ],
  },

  // ==================== 吉玛-冰火融合追忆 ====================
  gemma_ice_fire_memory: {
    id: 'gemma_ice_fire_memory',
    name: 'Ice Fire Fusion Memory',
    nameCN: '冰火融合追忆',
    heroId: 'gemma',
    traitId: 'gemma_ice_fire_fusion',
    rarity: 'legendary',
    description: '吉玛冰火融合套装追忆。伴我同行套装加成冰火暴走和元素伤害',
    setBonuses: [
      {
        pieces: 2,
        description: '伴我同行2件：击中时触发15级元素破坏诅咒冷却0.5秒',
        mods: [
          { type: 'ResPenPct', value: 15, addn: true, penType: 'elemental', src: 'hero_memory', srcDetail: '冰火融合追忆-2件' } as Mod,
        ],
      },
      {
        pieces: 4,
        description: '伴我同行4件：+15%全部抗性；+20%冰火暴走持续时间',
        mods: [
          { type: 'ResAllPct', value: 15, addn: false, src: 'hero_memory', srcDetail: '冰火融合追忆-4件' } as Mod,
          { type: 'DmgPct', value: 20, addn: true, dmgModType: 'fire', src: 'hero_memory', srcDetail: '冰火融合追忆-4件' } as Mod,
          { type: 'DmgPct', value: 20, addn: true, dmgModType: 'cold', src: 'hero_memory', srcDetail: '冰火融合追忆-4件' } as Mod,
        ],
      },
      {
        pieces: 6,
        description: '伴我同行6件：额外+20%火焰与冰冷伤害',
        mods: [
          { type: 'DmgPct', value: 20, addn: true, dmgModType: 'fire', src: 'hero_memory', srcDetail: '冰火融合追忆-6件' } as Mod,
          { type: 'DmgPct', value: 20, addn: true, dmgModType: 'cold', src: 'hero_memory', srcDetail: '冰火融合追忆-6件' } as Mod,
        ],
      },
    ],
  },

  // ==================== 尤加-时空流逝追忆 ====================
  yarga_spacetime_flow_memory: {
    id: 'yarga_spacetime_flow_memory',
    name: 'Spacetime Flow Memory',
    nameCN: '时空流逝追忆',
    heroId: 'yarga',
    traitId: 'yarga_spacetime_flow',
    rarity: 'legendary',
    description: '尤加时空流逝套装追忆。伴我同行套装加成时空能量和持续伤害',
    setBonuses: [
      {
        pieces: 2,
        description: '伴我同行2件：+200%基础特性提供的时空能量回复',
        mods: [
          { type: 'CdrPct', value: 200, addn: true, src: 'hero_memory', srcDetail: '时空流逝追忆-2件' } as Mod,
        ],
      },
      {
        pieces: 4,
        description: '伴我同行4件：+15%全部抗性；额外+15%加剧效果',
        mods: [
          { type: 'ResAllPct', value: 15, addn: false, src: 'hero_memory', srcDetail: '时空流逝追忆-4件' } as Mod,
          { type: 'DmgPct', value: 15, addn: true, dmgModType: 'damage_over_time', src: 'hero_memory', srcDetail: '时空流逝追忆-4件' } as Mod,
        ],
      },
      {
        pieces: 6,
        description: '伴我同行6件：额外+15%收割冷却回复速度',
        mods: [
          { type: 'CdrPct', value: 15, addn: true, src: 'hero_memory', srcDetail: '时空流逝追忆-6件' } as Mod,
        ],
      },
    ],
  },

  // ==================== 尤加-时空幻象追忆 ====================
  yarga_spacetime_illusion_memory: {
    id: 'yarga_spacetime_illusion_memory',
    name: 'Spacetime Illusion Memory',
    nameCN: '时空幻象追忆',
    heroId: 'yarga',
    traitId: 'yarga_spacetime_illusion',
    rarity: 'legendary',
    description: '尤加时空幻象套装追忆。伴我同行套装加成幻象伤害和生存能力',
    setBonuses: [
      {
        pieces: 2,
        description: '伴我同行2件：+2法术技能等级',
        mods: [
          { type: 'SkillLevel', value: 2, skillTag: 'spell', src: 'hero_memory', srcDetail: '时空幻象追忆-2件' } as Mod,
        ],
      },
      {
        pieces: 4,
        description: '伴我同行4件：+15%全部抗性；额外+20%时空幻象伤害',
        mods: [
          { type: 'ResAllPct', value: 15, addn: false, src: 'hero_memory', srcDetail: '时空幻象追忆-4件' } as Mod,
          { type: 'DmgPct', value: 20, addn: true, dmgModType: 'spell', src: 'hero_memory', srcDetail: '时空幻象追忆-4件' } as Mod,
        ],
      },
      {
        pieces: 6,
        description: '伴我同行6件：受到巨额伤害后失去幻象免疫伤害击退敌人回复30%已损生命护盾间隔10秒',
        mods: [
          { type: 'LifeRecoveryPct', value: 30, addn: true, src: 'hero_memory', srcDetail: '时空幻象追忆-6件' } as Mod,
          { type: 'ResAllPct', value: 15, addn: false, src: 'hero_memory', srcDetail: '时空幻象追忆-6件' } as Mod,
        ],
      },
    ],
  },
};

export function getHeroMemory(id: string): HeroMemoryData | undefined {
  return heroMemoriesData[id];
}

export function getHeroMemoriesForHero(heroId: string): HeroMemoryData[] {
  return Object.values(heroMemoriesData).filter(m => m.heroId === heroId);
}

export function getAllHeroMemories(): HeroMemoryData[] {
  return Object.values(heroMemoriesData);
}
