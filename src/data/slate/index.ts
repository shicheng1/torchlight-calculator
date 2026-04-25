import type { Mod } from '@/engine/types/mod.ts';
import { dataService } from '@/data/sync/data-adapter.ts';

export interface SlateAffixData {
  id: string;
  name: string;
  nameCN: string;
  description: string;
  /** 词缀大小: small / medium / legendary_medium */
  affixSize: 'small' | 'medium' | 'legendary_medium';
  mods: Mod[];
}

export interface SlateData {
  id: string;
  name: string;
  nameCN: string;
  shape: string;
  god: string;
  maxEngravings: number;
  /** 石板词缀列表 */
  affixes: SlateAffixData[];
  /** 旧版兼容：石板基础属性（保留为空数组） */
  mods: Mod[];
}

// 本地备用数据
const localSlatesData: Record<string, SlateData> = {
  // ==================== 巨力之神石板 ====================
  slate_force_god: {
    id: 'slate_force_god',
    name: 'God of Force',
    nameCN: '巨力之神',
    shape: '十字形',
    god: '巨力之神',
    maxEngravings: 2,
    mods: [],
    affixes: [
      // 小型词缀
      {
        id: 'sf_small_1', name: 'Strength', nameCN: '力量',
        description: '+8 力量',
        affixSize: 'small',
        mods: [{ type: 'Stat', stat: 'str', value: 8, src: 'divinity_slate', srcDetail: '巨力之神' }],
      },
      {
        id: 'sf_small_2', name: 'Fire Damage', nameCN: '火焰伤害',
        description: '+9% 火焰伤害',
        affixSize: 'small',
        mods: [{ type: 'DmgPct', value: 9, addn: false, dmgModType: 'fire', src: 'divinity_slate', srcDetail: '巨力之神' }],
      },
      {
        id: 'sf_small_3', name: 'Attack Damage', nameCN: '攻击伤害',
        description: '+9% 攻击伤害',
        affixSize: 'small',
        mods: [{ type: 'DmgPct', value: 9, addn: false, dmgModType: 'attack', src: 'divinity_slate', srcDetail: '巨力之神' }],
      },
      {
        id: 'sf_small_4', name: 'Life & Regen', nameCN: '生命与返还',
        description: '+2% 最大生命, 1.5% 生命返还',
        affixSize: 'small',
        mods: [{ type: 'DmgPct', value: 2, addn: false, dmgModType: 'global', src: 'divinity_slate', srcDetail: '巨力之神' }],
      },
      // 中型词缀
      {
        id: 'sf_med_1', name: 'Attack Damage & Speed', nameCN: '攻击伤害与速度',
        description: '+18% 攻击伤害, +4% 移动速度',
        affixSize: 'medium',
        mods: [{ type: 'DmgPct', value: 18, addn: false, dmgModType: 'attack', src: 'divinity_slate', srcDetail: '巨力之神' }],
      },
      {
        id: 'sf_med_2', name: 'Strength II', nameCN: '力量 II',
        description: '+16 力量',
        affixSize: 'medium',
        mods: [{ type: 'Stat', stat: 'str', value: 16, src: 'divinity_slate', srcDetail: '巨力之神' }],
      },
      {
        id: 'sf_med_3', name: 'Fire Conversion', nameCN: '火焰转化',
        description: '+5% 火焰抗性, 50% 物理伤害转化为火焰伤害',
        affixSize: 'medium',
        mods: [
          { type: 'ConvertDmgPct', from: 'physical', to: 'fire', value: 50, src: 'divinity_slate', srcDetail: '巨力之神' },
        ],
      },
      {
        id: 'sf_med_4', name: 'War Cry Cooldown', nameCN: '战吼冷却',
        description: '+10% 战吼技能冷却回复速度',
        affixSize: 'medium',
        mods: [{ type: 'DmgPct', value: 10, addn: false, dmgModType: 'global', src: 'divinity_slate', srcDetail: '巨力之神' }],
      },
      {
        id: 'sf_med_5', name: 'Life & Regen II', nameCN: '生命与返还 II',
        description: '+4% 最大生命, +3% 生命返还',
        affixSize: 'medium',
        mods: [{ type: 'DmgPct', value: 4, addn: false, dmgModType: 'global', src: 'divinity_slate', srcDetail: '巨力之神' }],
      },
      // 传奇中型词缀
      {
        id: 'sf_leg_1', name: 'Attack Skill Level', nameCN: '攻击技能等级',
        description: '+1 攻击技能等级',
        affixSize: 'legendary_medium',
        mods: [{ type: 'SkillLevel', value: 1, skillTag: 'attack', src: 'divinity_slate', srcDetail: '巨力之神' }],
      },
      {
        id: 'sf_leg_2', name: 'Fire Burst', nameCN: '火焰爆发',
        description: '每隔1秒，额外+12%下一次核心技能造成的火焰伤害',
        affixSize: 'legendary_medium',
        mods: [{ type: 'DmgPct', value: 12, addn: true, dmgModType: 'fire', src: 'divinity_slate', srcDetail: '巨力之神' }],
      },
      {
        id: 'sf_leg_3', name: 'War Cry Bonus', nameCN: '战吼加成',
        description: '如果最近8秒内释放过战吼技能，额外+12%攻击伤害',
        affixSize: 'legendary_medium',
        mods: [{ type: 'DmgPct', value: 12, addn: true, dmgModType: 'attack', src: 'divinity_slate', srcDetail: '巨力之神' }],
      },
    ],
  },

  // ==================== 勇者（新神）石板 ====================
  slate_brave_god: {
    id: 'slate_brave_god',
    name: 'God of Bravery',
    nameCN: '勇者',
    shape: 'L形',
    god: '勇者',
    maxEngravings: 2,
    mods: [],
    affixes: [
      // 小型词缀
      {
        id: 'sb_small_1', name: 'Attack Damage', nameCN: '攻击伤害',
        description: '+9% 攻击伤害',
        affixSize: 'small',
        mods: [{ type: 'DmgPct', value: 9, addn: false, dmgModType: 'attack', src: 'divinity_slate', srcDetail: '勇者' }],
      },
      {
        id: 'sb_small_2', name: 'Max Life', nameCN: '最大生命',
        description: '+3% 最大生命',
        affixSize: 'small',
        mods: [{ type: 'DmgPct', value: 3, addn: false, dmgModType: 'global', src: 'divinity_slate', srcDetail: '勇者' }],
      },
      {
        id: 'sb_small_3', name: 'Armor', nameCN: '护甲值',
        description: '+7% 护甲值',
        affixSize: 'small',
        mods: [{ type: 'DmgPct', value: 7, addn: false, dmgModType: 'global', src: 'divinity_slate', srcDetail: '勇者' }],
      },
      {
        id: 'sb_small_4', name: 'Attack Speed', nameCN: '攻击速度',
        description: '+3% 攻击速度',
        affixSize: 'small',
        mods: [{ type: 'AspdPct', value: 3, addn: false, src: 'divinity_slate', srcDetail: '勇者' }],
      },
      {
        id: 'sb_small_5', name: 'Flat Armor', nameCN: '固定护甲',
        description: '+450 护甲值',
        affixSize: 'small',
        mods: [{ type: 'DmgPct', value: 0, addn: false, dmgModType: 'global', src: 'divinity_slate', srcDetail: '勇者' }],
      },
      // 中型词缀
      {
        id: 'sb_med_1', name: 'Attack Damage II', nameCN: '攻击伤害 II',
        description: '+18% 攻击伤害',
        affixSize: 'medium',
        mods: [{ type: 'DmgPct', value: 18, addn: false, dmgModType: 'attack', src: 'divinity_slate', srcDetail: '勇者' }],
      },
      {
        id: 'sb_med_2', name: 'Life & Regen', nameCN: '生命与回复',
        description: '+5% 最大生命, 每秒自然回复0.5%生命',
        affixSize: 'medium',
        mods: [{ type: 'DmgPct', value: 5, addn: false, dmgModType: 'global', src: 'divinity_slate', srcDetail: '勇者' }],
      },
      {
        id: 'sb_med_3', name: 'Armor II', nameCN: '护甲值 II',
        description: '+14% 护甲值',
        affixSize: 'medium',
        mods: [{ type: 'DmgPct', value: 14, addn: false, dmgModType: 'global', src: 'divinity_slate', srcDetail: '勇者' }],
      },
    ],
  },

  // ==================== 机械之神石板 ====================
  slate_mech_god: {
    id: 'slate_mech_god',
    name: 'God of Machines',
    nameCN: '机械之神',
    shape: 'T形',
    god: '机械之神',
    maxEngravings: 2,
    mods: [],
    affixes: [
      // 小型词缀
      {
        id: 'sm_small_1', name: 'Minion Damage', nameCN: '召唤物伤害',
        description: '+15% 召唤物伤害',
        affixSize: 'small',
        mods: [{ type: 'MinionDmgPct', value: 15, addn: false, src: 'divinity_slate', srcDetail: '机械之神' }],
      },
      {
        id: 'sm_small_2', name: 'Minion Life', nameCN: '召唤物生命',
        description: '+5% 最大生命, +15% 召唤物最大生命',
        affixSize: 'small',
        mods: [{ type: 'MinionDmgPct', value: 15, addn: false, src: 'divinity_slate', srcDetail: '机械之神' }],
      },
      {
        id: 'sm_small_3', name: 'Minion Speed', nameCN: '召唤物速度',
        description: '+4% 召唤物攻击与施法速度',
        affixSize: 'small',
        mods: [{ type: 'MinionAspdPct', value: 4, addn: false, src: 'divinity_slate', srcDetail: '机械之神' }],
      },
      // 中型词缀
      {
        id: 'sm_med_1', name: 'Minion Damage II', nameCN: '召唤物伤害 II',
        description: '+30% 召唤物伤害',
        affixSize: 'medium',
        mods: [{ type: 'MinionDmgPct', value: 30, addn: false, src: 'divinity_slate', srcDetail: '机械之神' }],
      },
      {
        id: 'sm_med_2', name: 'Minion Speed II', nameCN: '召唤物速度 II',
        description: '+8% 召唤物攻击与施法速度',
        affixSize: 'medium',
        mods: [{ type: 'MinionAspdPct', value: 8, addn: false, src: 'divinity_slate', srcDetail: '机械之神' }],
      },
      {
        id: 'sm_med_3', name: 'Minion Crit Damage', nameCN: '召唤物暴击伤害',
        description: '+20% 召唤物暴击伤害',
        affixSize: 'medium',
        mods: [{ type: 'CritDmgPct', value: 20, addn: false, modType: 'minion', src: 'divinity_slate', srcDetail: '机械之神' }],
      },
      // 传奇中型词缀
      {
        id: 'sm_leg_1', name: 'Minion Skill Level', nameCN: '召唤技能等级',
        description: '+1 召唤技能等级',
        affixSize: 'legendary_medium',
        mods: [{ type: 'SkillLevel', value: 1, skillTag: 'minion', src: 'divinity_slate', srcDetail: '机械之神' }],
      },
      {
        id: 'sm_leg_2', name: 'Scaling', nameCN: '属性转化',
        description: '每50点力量+1%召唤物伤害；每5点智慧+1%召唤物暴击值',
        affixSize: 'legendary_medium',
        mods: [
          { type: 'MinionDmgPct', value: 1, addn: false, per: { stat: 'str', per: 50 }, src: 'divinity_slate', srcDetail: '机械之神' },
          { type: 'CritRatingPct', value: 1, addn: false, modType: 'minion', per: { stat: 'int', per: 5 }, src: 'divinity_slate', srcDetail: '机械之神' },
        ],
      },
    ],
  },

  // ==================== 知识之神石板 ====================
  slate_knowledge_god: {
    id: 'slate_knowledge_god',
    name: 'God of Knowledge',
    nameCN: '知识之神',
    shape: '菱形',
    god: '知识之神',
    maxEngravings: 2,
    mods: [],
    affixes: [
      // 小型词缀
      {
        id: 'sk_small_1', name: 'Spell Damage', nameCN: '法术伤害',
        description: '+12% 法术伤害',
        affixSize: 'small',
        mods: [{ type: 'DmgPct', value: 12, addn: false, dmgModType: 'spell', src: 'divinity_slate', srcDetail: '知识之神' }],
      },
      {
        id: 'sk_small_2', name: 'Cast Speed', nameCN: '施法速度',
        description: '+4% 施法速度',
        affixSize: 'small',
        mods: [{ type: 'CspdPct', value: 4, addn: false, src: 'divinity_slate', srcDetail: '知识之神' }],
      },
      {
        id: 'sk_small_3', name: 'Cold Damage', nameCN: '冰冷伤害',
        description: '+12% 冰冷伤害',
        affixSize: 'small',
        mods: [{ type: 'DmgPct', value: 12, addn: false, dmgModType: 'cold', src: 'divinity_slate', srcDetail: '知识之神' }],
      },
      // 中型词缀
      {
        id: 'sk_med_1', name: 'Spell Damage II', nameCN: '法术伤害 II',
        description: '+24% 法术伤害',
        affixSize: 'medium',
        mods: [{ type: 'DmgPct', value: 24, addn: false, dmgModType: 'spell', src: 'divinity_slate', srcDetail: '知识之神' }],
      },
      {
        id: 'sk_med_2', name: 'Cast Speed II', nameCN: '施法速度 II',
        description: '+8% 施法速度',
        affixSize: 'medium',
        mods: [{ type: 'CspdPct', value: 8, addn: false, src: 'divinity_slate', srcDetail: '知识之神' }],
      },
      {
        id: 'sk_med_3', name: 'Cold Damage II', nameCN: '冰冷伤害 II',
        description: '+24% 冰冷伤害',
        affixSize: 'medium',
        mods: [{ type: 'DmgPct', value: 24, addn: false, dmgModType: 'cold', src: 'divinity_slate', srcDetail: '知识之神' }],
      },
      // 传奇中型词缀
      {
        id: 'sk_leg_1', name: 'Spell Skill Level', nameCN: '法术技能等级',
        description: '+1 法术技能等级',
        affixSize: 'legendary_medium',
        mods: [{ type: 'SkillLevel', value: 1, skillTag: 'spell', src: 'divinity_slate', srcDetail: '知识之神' }],
      },
      {
        id: 'sk_leg_2', name: 'Cold Pen', nameCN: '冰冷穿透',
        description: '+18% 冰冷伤害, +2% 冰冷穿透',
        affixSize: 'legendary_medium',
        mods: [
          { type: 'DmgPct', value: 18, addn: false, dmgModType: 'cold', src: 'divinity_slate', srcDetail: '知识之神' },
          { type: 'ResPenPct', value: 2, penType: 'cold', src: 'divinity_slate', srcDetail: '知识之神' },
        ],
      },
    ],
  },
};

// 从数据服务获取石板数据（优先使用同步数据）
export const slatesData: Record<string, SlateData> = dataService.getSlate() || localSlatesData;

export function getSlate(id: string): SlateData | undefined {
  return slatesData[id];
}

export function getAllSlates(): SlateData[] {
  return Object.values(slatesData);
}
