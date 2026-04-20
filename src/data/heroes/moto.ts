import type { HeroData } from '@/engine/types/hero.ts';
import type { Mod } from '@/engine/types/mod.ts';

export const motoData: HeroData = {
  id: 'moto',
  name: 'Commander Moto',
  nameCN: '指挥官·莫托',
  mainStat: 'int',
  baseStr: 14,
  baseDex: 14,
  baseInt: 32,
  strPerLevel: 2,
  dexPerLevel: 2,
  intPerLevel: 4,
  baseLife: 60,
  baseMana: 120,
  lifePerLevel: 12,
  manaPerLevel: 6,
  traits: [
    // ==================== 号令征召（核心召唤流） ====================
    {
      id: 'moto_command_summon',
      name: 'Command Summon',
      nameCN: '号令征召',
      description: '释放召唤技能后4秒内所有召唤物获得超载，冷却12秒。超载：额外+60%伤害',
      levelMods: [
        {
          level: 1,
          description: '释放召唤技能后4秒内所有召唤物获得超载，冷却12秒。超载：额外+60%伤害',
          mods: [
            {
              type: 'OverloadPct',
              value: 60,
              addn: true,
              src: 'hero_trait',
              srcDetail: '号令征召',
            } as Mod,
          ],
        },
        {
          level: 45,
          description: '百战老兵：额外+80~180%超载持续时间；召唤物拥有超载时+20%攻击和施法速度',
          mods: [
            {
              type: 'OverloadDurationPct',
              value: 180,
              addn: true,
              src: 'hero_trait',
              srcDetail: '号令征召-百战老兵',
            } as Mod,
            {
              type: 'MinionAspdPct',
              value: 20,
              addn: false,
              cond: 'overloaded',
              src: 'hero_trait',
              srcDetail: '号令征召-百战老兵',
            } as Mod,
            {
              type: 'MinionCspdPct',
              value: 20,
              addn: false,
              cond: 'overloaded',
              src: 'hero_trait',
              srcDetail: '号令征召-百战老兵',
            } as Mod,
          ],
        },
        {
          level: 45,
          description: '一鼓作气：召唤物首次获得的超载额外+120~270%超载效果',
          mods: [
            {
              type: 'OverloadPct',
              value: 270,
              addn: true,
              src: 'hero_trait',
              srcDetail: '号令征召-一鼓作气',
            } as Mod,
          ],
        },
        {
          level: 60,
          description: '坚甲厉兵：每5点统御值+9~18%超载效果',
          mods: [
            {
              type: 'OverloadPct',
              value: 18,
              addn: true,
              per: { stat: 'command_value', per: 5 },
              src: 'hero_trait',
              srcDetail: '号令征召-坚甲厉兵',
            } as Mod,
          ],
        },
        {
          level: 60,
          description: '背水一战：召唤物拥有超载时不会被击败；根据已损失生命至多额外+25~60%伤害',
          mods: [
            {
              type: 'DmgPct',
              value: 60,
              addn: true,
              dmgModType: 'minion',
              cond: 'overloaded',
              per: { stat: 'missing_life_pct', per: 1 },
              src: 'hero_trait',
              srcDetail: '号令征召-背水一战',
            } as Mod,
          ],
        },
        {
          level: 75,
          description: '冲锋陷阵：召唤物每有+5%最大生命+1%体型+2~6%超载效果',
          mods: [
            {
              type: 'MinionSizePct',
              value: 1,
              addn: true,
              per: { stat: 'minion_max_life_pct', per: 5 },
              src: 'hero_trait',
              srcDetail: '号令征召-冲锋陷阵',
            } as Mod,
            {
              type: 'OverloadPct',
              value: 6,
              addn: true,
              per: { stat: 'minion_max_life_pct', per: 5 },
              src: 'hero_trait',
              srcDetail: '号令征召-冲锋陷阵',
            } as Mod,
          ],
        },
        {
          level: 75,
          description: '破釜沉舟：智械每消耗5%生命+10~15%超载效果，最多20次',
          mods: [
            {
              type: 'OverloadPct',
              value: 15,
              addn: true,
              per: { stat: 'construct_life_spent_pct', per: 5, limit: 20 },
              src: 'hero_trait',
              srcDetail: '号令征召-破釜沉舟',
            } as Mod,
          ],
        },
        {
          level: 80,
          description: '以逸待劳：超载额外+10%攻击和施法速度，额外+25%伤害',
          mods: [
            {
              type: 'MinionAspdPct',
              value: 10,
              addn: true,
              cond: 'overloaded',
              src: 'hero_trait',
              srcDetail: '号令征召-以逸待劳',
            } as Mod,
            {
              type: 'MinionCspdPct',
              value: 10,
              addn: true,
              cond: 'overloaded',
              src: 'hero_trait',
              srcDetail: '号令征召-以逸待劳',
            } as Mod,
            {
              type: 'DmgPct',
              value: 25,
              addn: true,
              dmgModType: 'minion',
              cond: 'overloaded',
              src: 'hero_trait',
              srcDetail: '号令征召-以逸待劳',
            } as Mod,
          ],
        },
      ],
    },
    // ==================== 冲锋征召（自爆流） ====================
    {
      id: 'moto_charge_summon',
      name: 'Charge Summon',
      nameCN: '冲锋征召',
      description: '点击获得冲锋征召状态6秒，+1一次召唤数量，所有智械启动自毁1秒后自爆，额外+20%自爆伤害。核心技能：召唤机械警卫。自毁倍率115%',
      levelMods: [
        {
          level: 1,
          description: '点击获得冲锋征召状态6秒，+1一次召唤数量，所有智械启动自毁1秒后自爆，额外+20%自爆伤害',
          mods: [
            {
              type: 'ExplodeDmgPct',
              value: 20,
              addn: true,
              src: 'hero_trait',
              srcDetail: '冲锋征召',
            } as Mod,
            {
              type: 'MinionCount',
              value: 1,
              src: 'hero_trait',
              srcDetail: '冲锋征召',
            } as Mod,
          ],
        },
        {
          level: 45,
          description: '前仆后继：自爆时30%几率掉落机械零件，每拾取一个+3~5%召唤物伤害，最多10次',
          mods: [
            {
              type: 'MinionDmgPct',
              value: 5,
              addn: true,
              per: { stat: 'mechanical_parts', per: 1, limit: 10 },
              src: 'hero_trait',
              srcDetail: '冲锋征召-前仆后继',
            } as Mod,
          ],
        },
        {
          level: 60,
          description: '捐躯赴难：每有70~40最大生命或护盾，自爆额外+1%伤害',
          mods: [
            {
              type: 'ExplodeDmgPct',
              value: 1,
              addn: true,
              per: { stat: 'max_life_or_shield', per: 40 },
              src: 'hero_trait',
              srcDetail: '冲锋征召-捐躯赴难',
            } as Mod,
          ],
        },
        {
          level: 60,
          description: '游击战术：+50%零件拾取半径，每拾取一个+2%冲锋速度+3%自爆伤害，最多10~20次',
          mods: [
            {
              type: 'MoveSpeedPct',
              value: 2,
              addn: true,
              per: { stat: 'mechanical_parts', per: 1, limit: 20 },
              src: 'hero_trait',
              srcDetail: '冲锋征召-游击战术',
            } as Mod,
            {
              type: 'ExplodeDmgPct',
              value: 3,
              addn: true,
              per: { stat: 'mechanical_parts', per: 1, limit: 20 },
              src: 'hero_trait',
              srcDetail: '冲锋征召-游击战术',
            } as Mod,
          ],
        },
        {
          level: 75,
          description: '以战养战：每隔0.2~0.1秒对20米内最近敌人触发核心召唤技能，-30%移动速度',
          mods: [
            {
              type: 'MoveSpeedPct',
              value: 30,
              addn: false,
              src: 'hero_trait',
              srcDetail: '冲锋征召-以战养战',
            } as Mod,
          ],
        },
        {
          level: 75,
          description: '兵贵神速：对召唤物攻速加成的25~45%同样作用于自爆伤害加成',
          mods: [
            {
              type: 'ExplodeDmgPct',
              value: 45,
              addn: false,
              per: { stat: 'minion_aspd_inc', per: 100 },
              src: 'hero_trait',
              srcDetail: '冲锋征召-兵贵神速',
            } as Mod,
          ],
        },
      ],
    },
  ],
  weaponTypes: ['武杖', '锡杖', '法杖'],
};
