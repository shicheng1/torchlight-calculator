import type { HeroData } from '@/engine/types/hero.ts';
import type { Mod } from '@/engine/types/mod.ts';

export const yargaData: HeroData = {
  id: 'yarga',
  name: 'Spacetime Witness Yarga',
  nameCN: '时空见证者·尤加',
  mainStat: 'int',
  baseStr: 14,
  baseDex: 22,
  baseInt: 28,
  strPerLevel: 2,
  dexPerLevel: 3,
  intPerLevel: 4,
  baseLife: 60,
  baseMana: 110,
  lifePerLevel: 12,
  manaPerLevel: 7,
  traits: [
    // ==================== 时空流逝 ====================
    {
      id: 'yarga_spacetime_flow',
      name: 'Spacetime Flow',
      nameCN: '时空流逝',
      description: '点击或造成持续伤害时释放扭曲时空，间隔4秒持续6秒。记录40%持续伤害。移动后施加时空乱流均摊记录伤害并清空',
      levelMods: [
        {
          level: 1,
          description: '点击或造成持续伤害时释放扭曲时空，间隔4秒持续6秒。记录40%持续伤害。移动后施加时空乱流均摊记录伤害并清空',
          mods: [
            {
              type: 'DmgPct',
              value: 40,
              addn: true,
              dmgModType: 'damage_over_time',
              src: 'hero_trait',
              srcDetail: '时空流逝',
            } as Mod,
          ],
        },
        {
          level: 45,
          description: '时空加速：击败时减1秒释放间隔；每存在1秒+5~11%记录的持续伤害最多10层',
          mods: [
            {
              type: 'DmgPct',
              value: 11,
              addn: true,
              dmgModType: 'damage_over_time',
              per: { stat: 'spacetime_exist_sec', per: 1, limit: 10 },
              src: 'hero_trait',
              srcDetail: '时空流逝-时空加速',
            } as Mod,
          ],
        },
        {
          level: 45,
          description: '时空剧变：持续期间额外+30~58%持续伤害；只对劲敌施加时空乱流',
          mods: [
            {
              type: 'DmgPct',
              value: 58,
              addn: true,
              dmgModType: 'damage_over_time',
              src: 'hero_trait',
              srcDetail: '时空流逝-时空剧变',
            } as Mod,
          ],
        },
        {
          level: 60,
          description: '时空切割：每记录1%持续伤害附加0.4~0.6%收割和净化切割伤害至记录',
          mods: [
            {
              type: 'DmgPct',
              value: 0.6,
              addn: true,
              dmgModType: 'global',
              per: { stat: 'recorded_dot_pct', per: 1 },
              src: 'hero_trait',
              srcDetail: '时空流逝-时空切割',
            } as Mod,
          ],
        },
        {
          level: 75,
          description: '时空停滞：额外-40~-50%时空乱流持续时间；+125~265%记录的持续伤害',
          mods: [
            {
              type: 'DmgPct',
              value: 265,
              addn: true,
              dmgModType: 'damage_over_time',
              src: 'hero_trait',
              srcDetail: '时空流逝-时空停滞',
            } as Mod,
          ],
        },
        {
          level: 75,
          description: '时空膨胀：额外+50~98%扭曲时空与时空乱流持续时间；拥有时空乱流的敌人也视为在扭曲时空中',
          mods: [
            {
              type: 'DmgPct',
              value: 98,
              addn: true,
              dmgModType: 'damage_over_time',
              src: 'hero_trait',
              srcDetail: '时空流逝-时空膨胀',
            } as Mod,
          ],
        },
      ],
    },
    // ==================== 时空幻象 ====================
    {
      id: 'yarga_spacetime_illusion',
      name: 'Spacetime Illusion',
      nameCN: '时空幻象',
      description: '-50点时空能量消耗直接获得时空幻象。幻象每1.5秒使用一次核心技能',
      levelMods: [
        {
          level: 1,
          description: '-50点时空能量消耗直接获得时空幻象。幻象每1.5秒使用一次核心技能',
          mods: [
            { type: 'MinionCount', value: 1, src: 'hero_trait', srcDetail: '时空幻象' } as Mod,
          ],
        },
        {
          level: 45,
          description: '咱俩真棒：+30%幻象施法频率；每+5%冷却回复+5~13%幻象施法频率',
          mods: [
            {
              type: 'CdrPct',
              value: 13,
              addn: true,
              per: { stat: 'cdr_pct', per: 5 },
              src: 'hero_trait',
              srcDetail: '时空幻象-咱俩真棒',
            } as Mod,
          ],
        },
        {
          level: 60,
          description: '搞快点搞快点：幻象无施法动作；施法速度加成的20~33%同样作用于幻象额外伤害',
          mods: [
            {
              type: 'DmgPct',
              value: 33,
              addn: true,
              dmgModType: 'spell',
              per: { stat: 'cast_speed_inc', per: 100 },
              src: 'hero_trait',
              srcDetail: '时空幻象-搞快点搞快点',
            } as Mod,
          ],
        },
        {
          level: 60,
          description: '去码头整点蓝条：封印35%最大魔力；幻象无施法频率限制；每+4%施法频率+1~1.6%幻象伤害',
          mods: [
            {
              type: 'DmgPct',
              value: 1.6,
              addn: true,
              dmgModType: 'spell',
              per: { stat: 'cast_freq_pct', per: 4 },
              src: 'hero_trait',
              srcDetail: '时空幻象-去码头整点蓝条',
            } as Mod,
          ],
        },
        {
          level: 75,
          description: '我成幻象了：无法释放核心技能；+1幻象上限；额外-5~+11%幻象伤害；-30%移速',
          mods: [
            {
              type: 'DmgPct',
              value: 11,
              addn: true,
              dmgModType: 'spell',
              src: 'hero_trait',
              srcDetail: '时空幻象-我成幻象了',
            } as Mod,
            {
              type: 'MoveSpeedPct',
              value: 30,
              addn: false,
              src: 'hero_trait',
              srcDetail: '时空幻象-我成幻象了',
            } as Mod,
          ],
        },
        {
          level: 75,
          description: '我没蓝了：幻象消耗魔力；最近每次消耗魔力+5~10%你和幻象伤害最多10次',
          mods: [
            {
              type: 'DmgPct',
              value: 10,
              addn: true,
              dmgModType: 'global',
              per: { stat: 'recent_mana_spend', per: 1, limit: 10 },
              src: 'hero_trait',
              srcDetail: '时空幻象-我没蓝了',
            } as Mod,
          ],
        },
      ],
    },
  ],
  weaponTypes: ['法杖', '手杖'],
};
