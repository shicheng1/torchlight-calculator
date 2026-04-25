import type { HeroData } from '@/engine/types/hero.ts';
import type { Mod } from '@/engine/types/mod.ts';

export const gemmaData: HeroData = {
  id: 'gemma',
  name: 'Icy Fire Gemma',
  nameCN: '冰焰·吉玛',
  mainStat: 'int',
  baseStr: 14,
  baseDex: 22,
  baseInt: 28,
  strPerLevel: 2,
  dexPerLevel: 3,
  intPerLevel: 4,
  baseLife: 60,
  baseMana: 100,
  lifePerLevel: 12,
  manaPerLevel: 8,
  traits: [
    // ==================== 欢愉之焰 ====================
    {
      id: 'gemma_joyful_flame',
      name: 'Joyful Flame',
      nameCN: '欢愉之焰',
      description: '释放炼狱，半径8米，持续5秒，冷却8秒。范围内敌人额外+45%受到的伤害',
      levelMods: [
        {
          level: 1,
          description: '释放炼狱，半径8米，持续5秒，冷却8秒。范围内敌人额外+45%受到的伤害',
          mods: [
            {
              type: 'EnemyDmgTakenPct',
              value: 45,
              addn: true,
              src: 'hero_trait',
              srcDetail: '欢愉之焰',
            } as Mod,
          ],
        },
        {
          level: 45,
          description: '绝望回声：+1炼狱充能上限；+1~2秒持续时间；+40~100%技能范围',
          mods: [
            { type: 'SkillRangePct', value: 100, addn: true, src: 'hero_trait', srcDetail: '欢愉之焰-绝望回声' } as Mod,
          ],
        },
        {
          level: 60,
          description: '无尽极刑：淘汰炼狱内生命低于6~10%的敌人',
          mods: [],
        },
        {
          level: 60,
          description: '狱火沉沦：炼狱每持续1秒额外+6~10%伤害',
          mods: [
            {
              type: 'DmgPct',
              value: 10,
              addn: true,
              dmgModType: 'global',
              per: { stat: 'inferno_duration_sec', per: 1 },
              src: 'hero_trait',
              srcDetail: '欢愉之焰-狱火沉沦',
            } as Mod,
          ],
        },
        {
          level: 75,
          description: '极乐狂宴：4~1米内敌人额外-30%受到伤害；10~40级炽热诅咒',
          mods: [
            {
              type: 'EnemyDmgTakenPct',
              value: 30,
              addn: false,
              src: 'hero_trait',
              srcDetail: '欢愉之焰-极乐狂宴',
            } as Mod,
          ],
        },
        {
          level: 75,
          description: '裙下之臣：20%物理转火焰；炼狱内敌人+30~50%受到火焰伤害+30%火焰伤害',
          mods: [
            {
              type: 'PhysToElement',
              value: 20,
              to: 'fire',
              src: 'hero_trait',
              srcDetail: '欢愉之焰-裙下之臣',
            } as Mod,
            {
              type: 'EnemyDmgTakenPct',
              value: 50,
              addn: true,
              dmgType: 'fire',
              src: 'hero_trait',
              srcDetail: '欢愉之焰-裙下之臣',
            } as Mod,
            {
              type: 'DmgPct',
              value: 30,
              addn: false,
              dmgModType: 'fire',
              src: 'hero_trait',
              srcDetail: '欢愉之焰-裙下之臣',
            } as Mod,
          ],
        },
      ],
    },
    // ==================== 冰火融合 ====================
    {
      id: 'gemma_ice_fire_fusion',
      name: 'Ice Fire Fusion',
      nameCN: '冰火融合',
      description: '累计释放5次火焰或冰冷技能进入冰火暴走，额外+20%火焰与冰冷伤害，持续5秒冷却10秒',
      levelMods: [
        {
          level: 1,
          description: '累计释放5次火焰或冰冷技能进入冰火暴走，额外+20%火焰与冰冷伤害，持续5秒冷却10秒',
          mods: [
            {
              type: 'DmgPct',
              value: 20,
              addn: true,
              dmgModType: 'fire',
              src: 'hero_trait',
              srcDetail: '冰火融合',
            } as Mod,
            {
              type: 'DmgPct',
              value: 20,
              addn: true,
              dmgModType: 'cold',
              src: 'hero_trait',
              srcDetail: '冰火融合',
            } as Mod,
          ],
        },
        {
          level: 45,
          description: '冰火相拥：最近造成火焰伤害额外+10~22%冰冷伤害；反之亦然；+10%火焰和冰冷抗性',
          mods: [
            {
              type: 'DmgPct',
              value: 22,
              addn: true,
              dmgModType: 'cold',
              cond: 'enemy_ignited',
              src: 'hero_trait',
              srcDetail: '冰火融合-冰火相拥',
            } as Mod,
            {
              type: 'DmgPct',
              value: 22,
              addn: true,
              dmgModType: 'fire',
              cond: 'enemy_chilled',
              src: 'hero_trait',
              srcDetail: '冰火融合-冰火相拥',
            } as Mod,
          ],
        },
        {
          level: 60,
          description: '躁动冰火：冰火暴走时+12~24%元素穿透+20%移速；+20~60%冰火暴走冷却回复',
          mods: [
            {
              type: 'ResPenPct',
              value: 24,
              addn: true,
              penType: 'elemental',
              src: 'hero_trait',
              srcDetail: '冰火融合-躁动冰火',
            } as Mod,
            {
              type: 'MoveSpeedPct',
              value: 20,
              addn: false,
              src: 'hero_trait',
              srcDetail: '冰火融合-躁动冰火',
            } as Mod,
            {
              type: 'CdrPct',
              value: 60,
              addn: true,
              src: 'hero_trait',
              srcDetail: '冰火融合-躁动冰火',
            } as Mod,
          ],
        },
        {
          level: 60,
          description: '冰火辉映：-50%冰火暴走持续时间；进入时回复10%生命魔力3秒衰减；失去时额外+60~100%火焰与冰冷伤害3秒衰减',
          mods: [
            {
              type: 'DmgPct',
              value: 100,
              addn: true,
              dmgModType: 'fire',
              src: 'hero_trait',
              srcDetail: '冰火融合-冰火辉映',
            } as Mod,
            {
              type: 'DmgPct',
              value: 100,
              addn: true,
              dmgModType: 'cold',
              src: 'hero_trait',
              srcDetail: '冰火融合-冰火辉映',
            } as Mod,
          ],
        },
        {
          level: 75,
          description: '刺骨灼心：附加冰冷伤害30~54%的火焰伤害',
          mods: [
            {
              type: 'DmgPct',
              value: 54,
              addn: true,
              dmgModType: 'fire',
              per: { stat: 'cold_damage_pct', per: 100 },
              src: 'hero_trait',
              srcDetail: '冰火融合-刺骨灼心',
            } as Mod,
          ],
        },
        {
          level: 75,
          description: '焚冰继火：99%冰冷伤害转化为火焰伤害；被冰结的敌人火焰抗性固定为15~-5%',
          mods: [
            {
              type: 'ConvertDmgPct',
              value: 99,
              from: 'cold',
              to: 'fire',
              src: 'hero_trait',
              srcDetail: '冰火融合-焚冰继火',
            } as Mod,
            {
              type: 'ResPenPct',
              value: 105,
              addn: false,
              penType: 'fire',
              cond: 'enemy_frozen',
              src: 'hero_trait',
              srcDetail: '冰火融合-焚冰继火',
            } as Mod,
          ],
        },
      ],
    },
    // ==================== 冰结之心 ====================
    {
      id: 'gemma_ice_heart',
      name: 'Ice Heart',
      nameCN: '冰结之心',
      description: '冰冷技能获得冰能量，增加冰冷伤害和冰结几率；冰能量满时释放冰霜脉冲',
      levelMods: [
        {
          level: 1,
          description: '冰冷技能获得冰能量，增加冰冷伤害和冰结几率；冰能量满时释放冰霜脉冲',
          mods: [
            {
              type: 'DmgPct',
              value: 15,
              addn: false,
              dmgModType: 'cold',
              src: 'hero_trait',
              srcDetail: '冰结之心',
            } as Mod,
          ],
        },
      ],
    },
  ],
  weaponTypes: ['法杖', '手杖'],
};
