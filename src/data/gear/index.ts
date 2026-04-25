import type { GearBase, Affix, SetBonus } from '@/engine/types/gear.ts';

// 装备基底数据
export const gearBases: GearBase[] = [
  // 武器
  {
    id: 'sword_1h',
    name: 'Iron Sword',
    nameCN: '铁剑',
    equipmentType: 'weapon',
    weaponType: 'one_hand_melee',
    rarity: 'normal',
    itemLevel: 1,
    energyValue: 10,
    baseStats: [
      {
        text: '物理伤害: 10-20',
        mods: [
          {
            type: 'FlatDmgToAtks',
            value: { min: 10, max: 20 },
            dmgType: 'physical',
            src: 'gear_base',
            srcDetail: 'Iron Sword'
          }
        ]
      }
    ],
    implicitMods: [],
    allowedAffixTypes: ['prefix', 'suffix'],
    maxPrefixes: 3,
    maxSuffixes: 3
  },
  {
    id: 'axe_2h',
    name: 'Battle Axe',
    nameCN: '战斧',
    equipmentType: 'weapon',
    weaponType: 'two_hand_melee',
    rarity: 'normal',
    itemLevel: 10,
    energyValue: 20,
    baseStats: [
      {
        text: '物理伤害: 20-40',
        mods: [
          {
            type: 'FlatDmgToAtks',
            value: { min: 20, max: 40 },
            dmgType: 'physical',
            src: 'gear_base',
            srcDetail: 'Battle Axe'
          }
        ]
      }
    ],
    implicitMods: [],
    allowedAffixTypes: ['prefix', 'suffix'],
    maxPrefixes: 3,
    maxSuffixes: 3
  },
  // 防具
  {
    id: 'helmet_1',
    name: 'Iron Helmet',
    nameCN: '铁头盔',
    equipmentType: 'helmet',
    rarity: 'normal',
    itemLevel: 1,
    energyValue: 15,
    baseStats: [],
    implicitMods: [],
    allowedAffixTypes: ['prefix', 'suffix'],
    maxPrefixes: 3,
    maxSuffixes: 3
  },
  {
    id: 'chest_1',
    name: 'Chain Mail',
    nameCN: '锁子甲',
    equipmentType: 'chest',
    rarity: 'normal',
    itemLevel: 5,
    energyValue: 25,
    baseStats: [],
    implicitMods: [],
    allowedAffixTypes: ['prefix', 'suffix'],
    maxPrefixes: 3,
    maxSuffixes: 3
  },
  // 饰品
  {
    id: 'ring_1',
    name: 'Iron Ring',
    nameCN: '铁戒指',
    equipmentType: 'ring',
    rarity: 'normal',
    itemLevel: 1,
    energyValue: 5,
    baseStats: [],
    implicitMods: [],
    allowedAffixTypes: ['prefix', 'suffix'],
    maxPrefixes: 2,
    maxSuffixes: 2
  },
  {
    id: 'necklace_1',
    name: 'Bronze Necklace',
    nameCN: '青铜项链',
    equipmentType: 'neck',
    rarity: 'normal',
    itemLevel: 3,
    energyValue: 10,
    baseStats: [],
    implicitMods: [],
    allowedAffixTypes: ['prefix', 'suffix'],
    maxPrefixes: 2,
    maxSuffixes: 2
  }
];

// 装备词缀数据
export const affixes: Affix[] = [
  // 前缀
  {
    id: 'affix_phys_dmg_1',
    name: 'of Strength',
    nameCN: '力量之',
    text: '+10% 物理伤害',
    affixType: 'prefix',
    tier: 1,
    mods: [
      {
        type: 'DmgPct',
        value: 10,
        dmgModType: 'physical',
        addn: false,
        src: 'gear_affix',
        srcDetail: 'of Strength'
      }
    ]
  },
  {
    id: 'affix_atk_speed_1',
    name: 'of Haste',
    nameCN: '急速之',
    text: '+8% 攻击速度',
    affixType: 'prefix',
    tier: 1,
    mods: [
      {
        type: 'AspdPct',
        value: 8,
        addn: false,
        src: 'gear_affix',
        srcDetail: 'of Haste'
      }
    ]
  },
  {
    id: 'affix_crit_rate_1',
    name: 'of Precision',
    nameCN: '精准之',
    text: '+5% 暴击率',
    affixType: 'prefix',
    tier: 1,
    mods: [
      {
        type: 'CritRatingPct',
        value: 5,
        modType: 'global',
        addn: false,
        src: 'gear_affix',
        srcDetail: 'of Precision'
      }
    ]
  },
  // 后缀
  {
    id: 'affix_phys_res_1',
    name: 'of Iron Will',
    nameCN: '钢铁意志之',
    text: '+15 物理抗性',
    affixType: 'suffix',
    tier: 1,
    mods: []
  },
  {
    id: 'affix_str_1',
    name: 'of Might',
    nameCN: '力量之',
    text: '+10 力量',
    affixType: 'suffix',
    tier: 1,
    mods: [
      {
        type: 'Stat',
        stat: 'str',
        value: 10,
        src: 'gear_affix',
        srcDetail: 'of Might'
      }
    ]
  },
  {
    id: 'affix_dex_1',
    name: 'of Agility',
    nameCN: '敏捷之',
    text: '+10 敏捷',
    affixType: 'suffix',
    tier: 1,
    mods: [
      {
        type: 'Stat',
        stat: 'dex',
        value: 10,
        src: 'gear_affix',
        srcDetail: 'of Agility'
      }
    ]
  }
];

// 套装效果数据
export const setBonuses: SetBonus[] = [
  {
    setId: 'set_warrior',
    name: 'Warrior Set',
    nameCN: '战士套装',
    piecesRequired: 2,
    mods: [
      {
        type: 'DmgPct',
        value: 15,
        dmgModType: 'melee',
        addn: false,
        src: 'gear_legendary',
        srcDetail: 'Warrior Set 2-piece'
      }
    ]
  },
  {
    setId: 'set_warrior',
    name: 'Warrior Set',
    nameCN: '战士套装',
    piecesRequired: 4,
    mods: [
      {
        type: 'DmgPct',
        value: 25,
        dmgModType: 'melee',
        addn: false,
        src: 'gear_legendary',
        srcDetail: 'Warrior Set 4-piece'
      },
      {
        type: 'AspdPct',
        value: 10,
        addn: false,
        src: 'gear_legendary',
        srcDetail: 'Warrior Set 4-piece'
      }
    ]
  },
  {
    setId: 'set_mage',
    name: 'Mage Set',
    nameCN: '法师套装',
    piecesRequired: 2,
    mods: [
      {
        type: 'DmgPct',
        value: 15,
        dmgModType: 'spell',
        addn: false,
        src: 'gear_legendary',
        srcDetail: 'Mage Set 2-piece'
      }
    ]
  },
  {
    setId: 'set_mage',
    name: 'Mage Set',
    nameCN: '法师套装',
    piecesRequired: 4,
    mods: [
      {
        type: 'DmgPct',
        value: 25,
        dmgModType: 'spell',
        addn: false,
        src: 'gear_legendary',
        srcDetail: 'Mage Set 4-piece'
      },
      {
        type: 'CspdPct',
        value: 10,
        addn: false,
        src: 'gear_legendary',
        srcDetail: 'Mage Set 4-piece'
      }
    ]
  }
];

// 获取装备基底
export function getGearBase(baseId: string): GearBase | undefined {
  return gearBases.find(base => base.id === baseId);
}

// 获取词缀
export function getAffix(affixId: string): Affix | undefined {
  return affixes.find(affix => affix.id === affixId);
}

// 获取套装效果
export function getSetBonuses(setId: string): SetBonus[] {
  return setBonuses.filter(set => set.setId === setId);
}

// 根据装备部位获取可用的装备基底
export function getGearBasesBySlot(slot: string): GearBase[] {
  const slotToType: Record<string, string> = {
    weapon_main: 'weapon',
    weapon_off: 'weapon',
    helmet: 'helmet',
    chest: 'chest',
    gloves: 'gloves',
    boots: 'boots',
    neck: 'neck',
    ring1: 'ring',
    ring2: 'ring',
    belt: 'belt'
  };
  
  const equipmentType = slotToType[slot];
  return equipmentType ? gearBases.filter(base => base.equipmentType === equipmentType) : [];
}