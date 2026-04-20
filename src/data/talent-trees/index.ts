import type { Mod } from '@/engine/types/mod.ts';

export interface TalentNodeData {
  id: string;
  name: string;
  nameCN: string;
  description: string;
  x: number;
  y: number;
  nodeType: 'micro' | 'medium' | 'legendary';
  maxPoints: number;
  /** 层级解锁制：需要在该天赋板上已投入的总点数 >= 此值才能分配 */
  requiredPoints: number;
  mods: Mod[];
}

export interface TalentBoardData {
  id: string;
  name: string;
  nameCN: string;
  description: string;
  /** 核心机制描述 */
  coreMechanic?: string;
  nodes: TalentNodeData[];
}

export const talentBoards: Record<string, TalentBoardData> = {
  // ==================== 征战之神 ====================
  war_god: {
    id: 'war_god',
    name: 'God of War',
    nameCN: '征战之神',
    description: '物理/暴击/近战方向',
    coreMechanic: '战意：每点+2%攻击和法术暴击值，上限100点',
    nodes: [
      // ---- 小点 (0/3) ----
      // 0pts 层
      {
        id: 'wg_micro_1', name: 'Damage I', nameCN: '伤害 I',
        description: '+9% 伤害',
        x: 0, y: 0, nodeType: 'micro', maxPoints: 3, requiredPoints: 0,
        mods: [{ type: 'DmgPct', value: 9, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '征战之神' }],
      },
      // 3pts 层
      {
        id: 'wg_micro_2', name: 'Crit Rating I', nameCN: '暴击值 I',
        description: '+15% 暴击值',
        x: 1, y: 0, nodeType: 'micro', maxPoints: 3, requiredPoints: 3,
        mods: [{ type: 'CritRatingPct', value: 15, addn: false, modType: 'global', src: 'talent', srcDetail: '征战之神' }],
      },
      {
        id: 'wg_micro_3', name: 'Area & Proj Speed I', nameCN: '范围与投射速度 I',
        description: '+7% 技能范围, +5% 投射物速度, +2% 移动速度',
        x: 2, y: 0, nodeType: 'micro', maxPoints: 3, requiredPoints: 3,
        mods: [
          { type: 'DmgPct', value: 7, addn: false, dmgModType: 'area', src: 'talent', srcDetail: '征战之神' },
          { type: 'DmgPct', value: 5, addn: false, dmgModType: 'projectile', src: 'talent', srcDetail: '征战之神' },
        ],
      },
      // 6pts 层
      {
        id: 'wg_micro_4', name: 'Attack & Cast Speed I', nameCN: '攻施速度 I',
        description: '+3% 攻击与施法速度',
        x: 0, y: 1, nodeType: 'micro', maxPoints: 3, requiredPoints: 6,
        mods: [
          { type: 'AspdPct', value: 3, addn: false, src: 'talent', srcDetail: '征战之神' },
          { type: 'CspdPct', value: 3, addn: false, src: 'talent', srcDetail: '征战之神' },
        ],
      },
      {
        id: 'wg_micro_5', name: 'Block Rate I', nameCN: '格挡率 I',
        description: '+2% 攻击格挡率, +2% 法术格挡率',
        x: 1, y: 1, nodeType: 'micro', maxPoints: 3, requiredPoints: 6,
        mods: [
          { type: 'DmgPct', value: 2, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '征战之神' },
        ],
      },
      {
        id: 'wg_micro_6', name: 'Life & Shield I', nameCN: '生命与护盾 I',
        description: '+3% 最大生命, +3% 最大护盾',
        x: 2, y: 1, nodeType: 'micro', maxPoints: 3, requiredPoints: 6,
        mods: [
          { type: 'DmgPct', value: 3, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '征战之神' },
        ],
      },
      // 9pts 层
      {
        id: 'wg_micro_7', name: 'Crit Damage I', nameCN: '暴击伤害 I',
        description: '+8% 暴击伤害',
        x: 0, y: 2, nodeType: 'micro', maxPoints: 3, requiredPoints: 9,
        mods: [{ type: 'CritDmgPct', value: 8, addn: false, modType: 'global', src: 'talent', srcDetail: '征战之神' }],
      },
      {
        id: 'wg_micro_8', name: 'Trauma I', nameCN: '创伤 I',
        description: '+6% 创伤几率, +8% 创伤伤害',
        x: 1, y: 2, nodeType: 'micro', maxPoints: 3, requiredPoints: 9,
        mods: [
          { type: 'DmgPct', value: 6, addn: false, dmgModType: 'ailment', src: 'talent', srcDetail: '征战之神' },
          { type: 'DmgPct', value: 8, addn: false, dmgModType: 'physical', src: 'talent', srcDetail: '征战之神' },
        ],
      },
      // 12pts 层
      {
        id: 'wg_micro_9', name: 'Physical Damage I', nameCN: '物理伤害 I',
        description: '+9% 物理伤害',
        x: 2, y: 2, nodeType: 'micro', maxPoints: 3, requiredPoints: 12,
        mods: [{ type: 'DmgPct', value: 9, addn: false, dmgModType: 'physical', src: 'talent', srcDetail: '征战之神' }],
      },
      // 15pts 层
      {
        id: 'wg_micro_10', name: 'Life Regen I', nameCN: '生命返还 I',
        description: '1.5% 生命返还, 1.5% 护盾返还',
        x: 0, y: 3, nodeType: 'micro', maxPoints: 3, requiredPoints: 15,
        mods: [
          { type: 'DmgPct', value: 1.5, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '征战之神' },
        ],
      },
      {
        id: 'wg_micro_11', name: 'Physical Damage II', nameCN: '物理伤害 II',
        description: '+9% 物理伤害',
        x: 1, y: 3, nodeType: 'micro', maxPoints: 3, requiredPoints: 15,
        mods: [{ type: 'DmgPct', value: 9, addn: false, dmgModType: 'physical', src: 'talent', srcDetail: '征战之神' }],
      },

      // ---- 中点 (0/3) ----
      // 3pts 层
      {
        id: 'wg_med_1', name: 'Damage II', nameCN: '伤害 II',
        description: '+18% 伤害',
        x: 3, y: 0, nodeType: 'medium', maxPoints: 3, requiredPoints: 3,
        mods: [{ type: 'DmgPct', value: 18, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '征战之神' }],
      },
      // 6pts 层
      {
        id: 'wg_med_2', name: 'Crit Rating II', nameCN: '暴击值 II',
        description: '+25% 暴击值, -4 技能消耗',
        x: 3, y: 1, nodeType: 'medium', maxPoints: 3, requiredPoints: 6,
        mods: [{ type: 'CritRatingPct', value: 25, addn: false, modType: 'global', src: 'talent', srcDetail: '征战之神' }],
      },
      {
        id: 'wg_med_3', name: 'Area & Proj Speed II', nameCN: '范围与投射速度 II',
        description: '+14% 技能范围, +10% 投射物速度, +3% 移动速度',
        x: 4, y: 1, nodeType: 'medium', maxPoints: 3, requiredPoints: 6,
        mods: [
          { type: 'DmgPct', value: 14, addn: false, dmgModType: 'area', src: 'talent', srcDetail: '征战之神' },
          { type: 'DmgPct', value: 10, addn: false, dmgModType: 'projectile', src: 'talent', srcDetail: '征战之神' },
        ],
      },
      // 9pts 层
      {
        id: 'wg_med_4', name: 'Attack & Cast Speed II', nameCN: '攻施速度 II',
        description: '+6% 攻击与施法速度',
        x: 3, y: 2, nodeType: 'medium', maxPoints: 3, requiredPoints: 9,
        mods: [
          { type: 'AspdPct', value: 6, addn: false, src: 'talent', srcDetail: '征战之神' },
          { type: 'CspdPct', value: 6, addn: false, src: 'talent', srcDetail: '征战之神' },
        ],
      },
      {
        id: 'wg_med_5', name: 'Block Rate II', nameCN: '格挡率 II',
        description: '+4% 攻击格挡率, +4% 法术格挡率',
        x: 4, y: 2, nodeType: 'medium', maxPoints: 3, requiredPoints: 9,
        mods: [
          { type: 'DmgPct', value: 4, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '征战之神' },
        ],
      },
      {
        id: 'wg_med_6', name: 'Life & Shield II', nameCN: '生命与护盾 II',
        description: '+6% 最大生命, +6% 最大护盾',
        x: 5, y: 2, nodeType: 'medium', maxPoints: 3, requiredPoints: 9,
        mods: [
          { type: 'DmgPct', value: 6, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '征战之神' },
        ],
      },
      // 12pts 层
      {
        id: 'wg_med_7', name: 'Crit Damage II', nameCN: '暴击伤害 II',
        description: '+16% 暴击伤害',
        x: 3, y: 3, nodeType: 'medium', maxPoints: 3, requiredPoints: 12,
        mods: [{ type: 'CritDmgPct', value: 16, addn: false, modType: 'global', src: 'talent', srcDetail: '征战之神' }],
      },
      // 15pts 层
      {
        id: 'wg_med_8', name: 'Physical Damage III', nameCN: '物理伤害 III',
        description: '+18% 物理伤害',
        x: 4, y: 3, nodeType: 'medium', maxPoints: 3, requiredPoints: 15,
        mods: [{ type: 'DmgPct', value: 18, addn: false, dmgModType: 'physical', src: 'talent', srcDetail: '征战之神' }],
      },
      // 18pts 层
      {
        id: 'wg_med_9', name: 'Life Regen II', nameCN: '生命返还 II',
        description: '+3% 生命返还, +3% 护盾返还',
        x: 5, y: 3, nodeType: 'medium', maxPoints: 3, requiredPoints: 18,
        mods: [
          { type: 'DmgPct', value: 3, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '征战之神' },
        ],
      },

      // ---- 神格节点 (0/1, 12pts解锁) ----
      {
        id: 'wg_keystone_1', name: 'Focus', nameCN: '凝聚',
        description: '每隔1秒，下一次核心技能额外+50%暴击值',
        x: 6, y: 1, nodeType: 'legendary', maxPoints: 1, requiredPoints: 12,
        mods: [
          { type: 'CritRatingPct', value: 50, addn: true, modType: 'global', src: 'talent', srcDetail: '凝聚' },
        ],
      },
      {
        id: 'wg_keystone_2', name: 'Blunt Force', nameCN: '钝器',
        description: '额外+30%物理伤害；敌人+20%受伤缓冲',
        x: 7, y: 1, nodeType: 'legendary', maxPoints: 1, requiredPoints: 12,
        mods: [
          { type: 'DmgPct', value: 30, addn: true, dmgModType: 'physical', src: 'talent', srcDetail: '钝器' },
        ],
      },
      {
        id: 'wg_keystone_3', name: 'Tenacity', nameCN: '坚强',
        description: '受到巨额伤害后，50%几率保留1点生命',
        x: 8, y: 1, nodeType: 'legendary', maxPoints: 1, requiredPoints: 12,
        mods: [],
      },

      // ---- 高级神格 (0/1, 24pts解锁) ----
      {
        id: 'wg_ultimate_1', name: 'Ambition', nameCN: '野心',
        description: '击中时+100%几率获得10点战意值；周围有敌人时获得战意',
        x: 6, y: 3, nodeType: 'legendary', maxPoints: 1, requiredPoints: 24,
        mods: [
          { type: 'CritRatingPct', value: 20, addn: true, modType: 'global', src: 'talent', srcDetail: '野心' },
        ],
      },
      {
        id: 'wg_ultimate_2', name: 'Gravity', nameCN: '引力',
        description: '额外+25%近战伤害；近战技能具有反向击退',
        x: 7, y: 3, nodeType: 'legendary', maxPoints: 1, requiredPoints: 24,
        mods: [
          { type: 'DmgPct', value: 25, addn: true, dmgModType: 'melee', src: 'talent', srcDetail: '引力' },
        ],
      },
      {
        id: 'wg_ultimate_3', name: 'Ricochet', nameCN: '流矢',
        description: '额外+25%投射物伤害；+50%击退距离',
        x: 8, y: 3, nodeType: 'legendary', maxPoints: 1, requiredPoints: 24,
        mods: [
          { type: 'DmgPct', value: 25, addn: true, dmgModType: 'projectile', src: 'talent', srcDetail: '流矢' },
        ],
      },
    ],
  },

  // ==================== 机械之神 ====================
  mech_god: {
    id: 'mech_god',
    name: 'God of Machines',
    nameCN: '机械之神',
    description: '召唤物/哨卫/屏障方向',
    coreMechanic: '屏障：20%生命+护盾的防御罩，吸收50%击中伤害 | 统御值：每1点+3%召唤物伤害',
    nodes: [
      // ---- 小点 (0/3) ----
      // 0pts 层
      {
        id: 'mg_micro_1', name: 'Minion Damage I', nameCN: '召唤物伤害 I',
        description: '+15% 召唤物伤害',
        x: 0, y: 0, nodeType: 'micro', maxPoints: 3, requiredPoints: 0,
        mods: [{ type: 'MinionDmgPct', value: 15, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'mg_micro_2', name: 'Minion Life I', nameCN: '召唤物生命 I',
        description: '+5% 最大生命, +15% 召唤物最大生命',
        x: 1, y: 0, nodeType: 'micro', maxPoints: 3, requiredPoints: 0,
        mods: [
          { type: 'MinionDmgPct', value: 15, addn: false, src: 'talent', srcDetail: '机械之神' },
        ],
      },
      {
        id: 'mg_micro_3', name: 'Sentry Damage I', nameCN: '哨卫伤害 I',
        description: '+15% 哨卫伤害',
        x: 2, y: 0, nodeType: 'micro', maxPoints: 3, requiredPoints: 0,
        mods: [{ type: 'MinionDmgPct', value: 15, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      // 3pts 层
      {
        id: 'mg_micro_4', name: 'Minion Speed I', nameCN: '召唤物速度 I',
        description: '+4% 召唤物攻击与施法速度',
        x: 0, y: 1, nodeType: 'micro', maxPoints: 3, requiredPoints: 3,
        mods: [{ type: 'MinionAspdPct', value: 4, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'mg_micro_5', name: 'Sentry Range I', nameCN: '哨卫范围 I',
        description: '+12% 哨卫技能范围, +10% 哨卫持续时间',
        x: 1, y: 1, nodeType: 'micro', maxPoints: 3, requiredPoints: 3,
        mods: [{ type: 'MinionDmgPct', value: 12, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      // 6pts 层
      {
        id: 'mg_micro_6', name: 'Minion Crit I', nameCN: '召唤物暴击 I',
        description: '+40% 召唤物暴击值',
        x: 0, y: 2, nodeType: 'micro', maxPoints: 3, requiredPoints: 6,
        mods: [{ type: 'CritRatingPct', value: 40, addn: false, modType: 'minion', src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'mg_micro_7', name: 'Minion Shield I', nameCN: '召唤物护盾 I',
        description: '+5% 最大护盾, +5% 召唤物最大护盾',
        x: 1, y: 2, nodeType: 'micro', maxPoints: 3, requiredPoints: 6,
        mods: [
          { type: 'MinionDmgPct', value: 5, addn: false, src: 'talent', srcDetail: '机械之神' },
        ],
      },
      {
        id: 'mg_micro_8', name: 'Sentry Crit I', nameCN: '哨卫暴击 I',
        description: '+40% 哨卫技能暴击值',
        x: 2, y: 2, nodeType: 'micro', maxPoints: 3, requiredPoints: 6,
        mods: [{ type: 'CritRatingPct', value: 40, addn: false, modType: 'minion', src: 'talent', srcDetail: '机械之神' }],
      },
      // 9pts 层
      {
        id: 'mg_micro_9', name: 'Barrier I', nameCN: '屏障 I',
        description: '+10% 屏障吸收量',
        x: 0, y: 3, nodeType: 'micro', maxPoints: 3, requiredPoints: 9,
        mods: [{ type: 'DmgPct', value: 10, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'mg_micro_10', name: 'Stats I', nameCN: '属性 I',
        description: '+10 力量, +10 智慧',
        x: 1, y: 3, nodeType: 'micro', maxPoints: 3, requiredPoints: 9,
        mods: [
          { type: 'Stat', stat: 'str', value: 10, src: 'talent', srcDetail: '机械之神' },
          { type: 'Stat', stat: 'int', value: 10, src: 'talent', srcDetail: '机械之神' },
        ],
      },
      // 12pts 层
      {
        id: 'mg_micro_11', name: 'Sentry Damage II', nameCN: '哨卫伤害 II',
        description: '+15% 哨卫伤害',
        x: 2, y: 3, nodeType: 'micro', maxPoints: 3, requiredPoints: 12,
        mods: [{ type: 'MinionDmgPct', value: 15, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      // 15pts 层
      {
        id: 'mg_micro_12', name: 'Minion Damage II', nameCN: '召唤物伤害 II',
        description: '+15% 召唤物伤害',
        x: 0, y: 4, nodeType: 'micro', maxPoints: 3, requiredPoints: 15,
        mods: [{ type: 'MinionDmgPct', value: 15, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'mg_micro_13', name: 'Minion Move Speed', nameCN: '召唤物移动速度',
        description: '+4% 召唤物移动速度',
        x: 1, y: 4, nodeType: 'micro', maxPoints: 3, requiredPoints: 15,
        mods: [{ type: 'MinionAspdPct', value: 4, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'mg_micro_14', name: 'Regen I', nameCN: '回复 I',
        description: '每秒自然回复1/2%生命, +3% 护盾充能速度',
        x: 2, y: 4, nodeType: 'micro', maxPoints: 3, requiredPoints: 15,
        mods: [{ type: 'DmgPct', value: 3, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'mg_micro_15', name: 'Sentry Freq I', nameCN: '哨卫频率 I',
        description: '+5% 哨卫技能释放频率',
        x: 3, y: 4, nodeType: 'micro', maxPoints: 3, requiredPoints: 15,
        mods: [{ type: 'MinionAspdPct', value: 5, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },

      // ---- 中点 (0/1) ----
      // 3pts 层
      {
        id: 'mg_med_1', name: 'Minion Damage III', nameCN: '召唤物伤害 III',
        description: '+30% 召唤物伤害',
        x: 3, y: 0, nodeType: 'medium', maxPoints: 1, requiredPoints: 3,
        mods: [{ type: 'MinionDmgPct', value: 30, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'mg_med_2', name: 'Minion Life II', nameCN: '召唤物生命 II',
        description: '+10% 最大生命, +30% 召唤物最大生命',
        x: 4, y: 0, nodeType: 'medium', maxPoints: 1, requiredPoints: 3,
        mods: [{ type: 'MinionDmgPct', value: 30, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'mg_med_3', name: 'Sentry Damage III', nameCN: '哨卫伤害 III',
        description: '+30% 哨卫伤害',
        x: 5, y: 0, nodeType: 'medium', maxPoints: 1, requiredPoints: 3,
        mods: [{ type: 'MinionDmgPct', value: 30, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      // 6pts 层
      {
        id: 'mg_med_4', name: 'Minion Speed II', nameCN: '召唤物速度 II',
        description: '+8% 召唤物攻击与施法速度',
        x: 3, y: 1, nodeType: 'medium', maxPoints: 1, requiredPoints: 6,
        mods: [{ type: 'MinionAspdPct', value: 8, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'mg_med_5', name: 'Sentry Range II', nameCN: '哨卫范围 II',
        description: '+24% 哨卫技能范围, +20% 哨卫持续时间',
        x: 4, y: 1, nodeType: 'medium', maxPoints: 1, requiredPoints: 6,
        mods: [{ type: 'MinionDmgPct', value: 24, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      // 9pts 层
      {
        id: 'mg_med_6', name: 'Minion Crit Dmg', nameCN: '召唤物暴击伤害',
        description: '+20% 召唤物暴击伤害',
        x: 3, y: 2, nodeType: 'medium', maxPoints: 1, requiredPoints: 9,
        mods: [{ type: 'CritDmgPct', value: 20, addn: false, modType: 'minion', src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'mg_med_7', name: 'Minion Shield II', nameCN: '召唤物护盾 II',
        description: '+10% 最大护盾, +10% 召唤物最大护盾',
        x: 4, y: 2, nodeType: 'medium', maxPoints: 1, requiredPoints: 9,
        mods: [{ type: 'MinionDmgPct', value: 10, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'mg_med_8', name: 'Sentry Crit II', nameCN: '哨卫暴击 II',
        description: '+60% 哨卫技能暴击值, +15% 哨卫技能暴击伤害',
        x: 5, y: 2, nodeType: 'medium', maxPoints: 1, requiredPoints: 9,
        mods: [
          { type: 'CritRatingPct', value: 60, addn: false, modType: 'minion', src: 'talent', srcDetail: '机械之神' },
          { type: 'CritDmgPct', value: 15, addn: false, modType: 'minion', src: 'talent', srcDetail: '机械之神' },
        ],
      },
      // 12pts 层
      {
        id: 'mg_med_9', name: 'Barrier II', nameCN: '屏障 II',
        description: '+20% 屏障吸收量',
        x: 3, y: 3, nodeType: 'medium', maxPoints: 1, requiredPoints: 12,
        mods: [{ type: 'DmgPct', value: 20, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'mg_med_10', name: 'Scaling I', nameCN: '属性转化 I',
        description: '每50点力量+1%召唤物伤害；每5点智慧+1%召唤物暴击值',
        x: 4, y: 3, nodeType: 'medium', maxPoints: 1, requiredPoints: 12,
        mods: [
          { type: 'MinionDmgPct', value: 1, addn: false, per: { stat: 'str', per: 50 }, src: 'talent', srcDetail: '机械之神' },
          { type: 'CritRatingPct', value: 1, addn: false, modType: 'minion', per: { stat: 'int', per: 5 }, src: 'talent', srcDetail: '机械之神' },
        ],
      },
      {
        id: 'mg_med_11', name: 'Scaling II', nameCN: '属性转化 II',
        description: '每50点力量+1%哨卫伤害；每15点智慧+1%哨卫施放频率',
        x: 5, y: 3, nodeType: 'medium', maxPoints: 1, requiredPoints: 12,
        mods: [
          { type: 'MinionDmgPct', value: 1, addn: false, per: { stat: 'str', per: 50 }, src: 'talent', srcDetail: '机械之神' },
          { type: 'MinionAspdPct', value: 1, addn: false, per: { stat: 'int', per: 15 }, src: 'talent', srcDetail: '机械之神' },
        ],
      },
      // 15pts 层
      {
        id: 'mg_med_12', name: 'Sentry Cooldown', nameCN: '哨卫冷却',
        description: '+16% 哨卫技能冷却回复速度',
        x: 3, y: 4, nodeType: 'medium', maxPoints: 1, requiredPoints: 15,
        mods: [{ type: 'MinionAspdPct', value: 16, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      // 18pts 层
      {
        id: 'mg_med_13', name: 'Minion Skill Level', nameCN: '召唤技能等级',
        description: '+1 召唤召唤物的技能等级',
        x: 4, y: 4, nodeType: 'medium', maxPoints: 1, requiredPoints: 18,
        mods: [{ type: 'SkillLevel', value: 1, skillTag: 'minion', src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'mg_med_14', name: 'Minion Aggression', nameCN: '召唤物侵略性',
        description: '+25% 召唤物侵略性',
        x: 5, y: 4, nodeType: 'medium', maxPoints: 1, requiredPoints: 18,
        mods: [{ type: 'MinionAspdPct', value: 25, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'mg_med_15', name: 'Regen II', nameCN: '回复 II',
        description: '+12% 生命自然回复速度；额外-20%护盾充能间隔',
        x: 6, y: 4, nodeType: 'medium', maxPoints: 1, requiredPoints: 18,
        mods: [{ type: 'DmgPct', value: 12, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'mg_med_16', name: 'Sentry Freq II', nameCN: '哨卫频率 II',
        description: '+15% 哨卫技能释放频率',
        x: 7, y: 4, nodeType: 'medium', maxPoints: 1, requiredPoints: 18,
        mods: [{ type: 'MinionAspdPct', value: 15, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'mg_med_17', name: 'Sentry Charges', nameCN: '哨卫充能',
        description: '+1 哨卫技能充能点数上限',
        x: 8, y: 4, nodeType: 'medium', maxPoints: 1, requiredPoints: 18,
        mods: [{ type: 'MinionCount', value: 1, src: 'talent', srcDetail: '机械之神' }],
      },

      // ---- 神格节点 (0/1, 10pts解锁) ----
      {
        id: 'mg_keystone_1', name: 'Command', nameCN: '号令',
        description: '+35% 召唤物攻击与施法速度；额外+100% 召唤技能施法速度',
        x: 6, y: 1, nodeType: 'legendary', maxPoints: 1, requiredPoints: 10,
        mods: [
          { type: 'MinionAspdPct', value: 35, addn: false, src: 'talent', srcDetail: '号令' },
          { type: 'MinionAspdPct', value: 100, addn: true, src: 'talent', srcDetail: '号令' },
        ],
      },
      {
        id: 'mg_keystone_2', name: 'Sentinel', nameCN: '哨兵',
        description: '+1 哨卫数量上限；放置哨卫的技能额外+100%施法速度',
        x: 7, y: 1, nodeType: 'legendary', maxPoints: 1, requiredPoints: 10,
        mods: [
          { type: 'MinionCount', value: 1, src: 'talent', srcDetail: '哨兵' },
          { type: 'CspdPct', value: 100, addn: true, src: 'talent', srcDetail: '哨兵' },
        ],
      },
      {
        id: 'mg_keystone_3', name: 'Bunker', nameCN: '龟缩',
        description: '受到伤害时+35%几率获得屏障',
        x: 8, y: 1, nodeType: 'legendary', maxPoints: 1, requiredPoints: 10,
        mods: [],
      },

      // ---- 高级神格 (0/1, 20pts解锁) ----
      {
        id: 'mg_ultimate_1', name: 'Heavy Guard', nameCN: '强力护卫',
        description: '+3召唤技能等级；-25%召唤物侵略性；每秒统御值增加4点；魔灵+40初始生长值',
        x: 6, y: 3, nodeType: 'legendary', maxPoints: 1, requiredPoints: 20,
        mods: [
          { type: 'SkillLevel', value: 3, skillTag: 'minion', src: 'talent', srcDetail: '强力护卫' },
          { type: 'MinionDmgPct', value: 12, addn: true, src: 'talent', srcDetail: '强力护卫' },
        ],
      },
      {
        id: 'mg_ultimate_2', name: 'Overmod', nameCN: '过度改装',
        description: '额外+35%哨卫伤害，额外-50%非哨卫主动技能伤害',
        x: 7, y: 3, nodeType: 'legendary', maxPoints: 1, requiredPoints: 20,
        mods: [
          { type: 'MinionDmgPct', value: 35, addn: true, src: 'talent', srcDetail: '过度改装' },
        ],
      },
      {
        id: 'mg_ultimate_3', name: 'Isomorphic Arms', nameCN: '同构武装',
        description: '主手武器套用至召唤物',
        x: 8, y: 3, nodeType: 'legendary', maxPoints: 1, requiredPoints: 20,
        mods: [],
      },
    ],
  },

  // ==================== 知识之神 ====================
  knowledge_god: {
    id: 'knowledge_god',
    name: 'God of Knowledge',
    nameCN: '知识之神',
    description: '法术/冰冷/聚能方向',
    coreMechanic: '聚能祝福：每层+5%伤害，上限4层，持续10秒',
    nodes: [
      // ---- 小点 (0/3) ----
      // 0pts 层
      {
        id: 'kg_micro_1', name: 'Spell Damage I', nameCN: '法术伤害 I',
        description: '+12% 法术伤害',
        x: 0, y: 0, nodeType: 'micro', maxPoints: 3, requiredPoints: 0,
        mods: [{ type: 'DmgPct', value: 12, addn: false, dmgModType: 'spell', src: 'talent', srcDetail: '知识之神' }],
      },
      {
        id: 'kg_micro_2', name: 'Life & Shield I', nameCN: '生命与护盾 I',
        description: '+5% 最大生命, +5% 最大护盾',
        x: 1, y: 0, nodeType: 'micro', maxPoints: 3, requiredPoints: 0,
        mods: [
          { type: 'DmgPct', value: 5, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '知识之神' },
        ],
      },
      {
        id: 'kg_micro_3', name: 'Cold Damage I', nameCN: '冰冷伤害 I',
        description: '+12% 冰冷伤害',
        x: 2, y: 0, nodeType: 'micro', maxPoints: 3, requiredPoints: 0,
        mods: [{ type: 'DmgPct', value: 12, addn: false, dmgModType: 'cold', src: 'talent', srcDetail: '知识之神' }],
      },
      // 3pts 层
      {
        id: 'kg_micro_4', name: 'Cast Speed I', nameCN: '施法速度 I',
        description: '+4% 施法速度',
        x: 0, y: 1, nodeType: 'micro', maxPoints: 3, requiredPoints: 3,
        mods: [{ type: 'CspdPct', value: 4, addn: false, src: 'talent', srcDetail: '知识之神' }],
      },
      {
        id: 'kg_micro_5', name: 'Max Mana I', nameCN: '魔力 I',
        description: '+8% 最大魔力',
        x: 1, y: 1, nodeType: 'micro', maxPoints: 3, requiredPoints: 3,
        mods: [{ type: 'Stat', stat: 'int', value: 8, src: 'talent', srcDetail: '知识之神' }],
      },
      // 6pts 层
      {
        id: 'kg_micro_6', name: 'Crit Rating I', nameCN: '暴击值 I',
        description: '+20% 暴击值',
        x: 0, y: 2, nodeType: 'micro', maxPoints: 3, requiredPoints: 6,
        mods: [{ type: 'CritRatingPct', value: 20, addn: false, modType: 'global', src: 'talent', srcDetail: '知识之神' }],
      },
      {
        id: 'kg_micro_7', name: 'Skill Range I', nameCN: '技能范围 I',
        description: '+12% 技能范围',
        x: 1, y: 2, nodeType: 'micro', maxPoints: 3, requiredPoints: 6,
        mods: [{ type: 'DmgPct', value: 12, addn: false, dmgModType: 'area', src: 'talent', srcDetail: '知识之神' }],
      },
      {
        id: 'kg_micro_8', name: 'Spell Block I', nameCN: '法术格挡 I',
        description: '+4% 法术格挡率',
        x: 2, y: 2, nodeType: 'micro', maxPoints: 3, requiredPoints: 6,
        mods: [{ type: 'DmgPct', value: 4, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '知识之神' }],
      },
      // 9pts 层
      {
        id: 'kg_micro_9', name: 'Intelligence I', nameCN: '智慧 I',
        description: '+15 智慧',
        x: 0, y: 3, nodeType: 'micro', maxPoints: 3, requiredPoints: 9,
        mods: [{ type: 'Stat', stat: 'int', value: 15, src: 'talent', srcDetail: '知识之神' }],
      },
      {
        id: 'kg_micro_10', name: 'Cold Damage II', nameCN: '冰冷伤害 II',
        description: '+12% 冰冷伤害',
        x: 1, y: 3, nodeType: 'micro', maxPoints: 3, requiredPoints: 9,
        mods: [{ type: 'DmgPct', value: 12, addn: false, dmgModType: 'cold', src: 'talent', srcDetail: '知识之神' }],
      },
      // 12pts 层
      {
        id: 'kg_micro_11', name: 'Max Shield II', nameCN: '护盾 II',
        description: '+5% 最大护盾',
        x: 2, y: 3, nodeType: 'micro', maxPoints: 3, requiredPoints: 12,
        mods: [{ type: 'DmgPct', value: 5, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '知识之神' }],
      },
      {
        id: 'kg_micro_12', name: 'Freeze Chance', nameCN: '冰结几率',
        description: '+5% 冰结几率',
        x: 0, y: 4, nodeType: 'micro', maxPoints: 3, requiredPoints: 12,
        mods: [{ type: 'DmgPct', value: 5, addn: false, dmgModType: 'cold', src: 'talent', srcDetail: '知识之神' }],
      },
      // 15pts 层
      {
        id: 'kg_micro_13', name: 'Spell Damage II', nameCN: '法术伤害 II',
        description: '+12% 法术伤害',
        x: 1, y: 4, nodeType: 'micro', maxPoints: 3, requiredPoints: 15,
        mods: [{ type: 'DmgPct', value: 12, addn: false, dmgModType: 'spell', src: 'talent', srcDetail: '知识之神' }],
      },
      {
        id: 'kg_micro_14', name: 'Convergence Duration', nameCN: '聚能持续时间',
        description: '+10% 聚能祝福持续时间',
        x: 2, y: 4, nodeType: 'micro', maxPoints: 3, requiredPoints: 15,
        mods: [{ type: 'DmgPct', value: 10, addn: false, dmgModType: 'spell', src: 'talent', srcDetail: '知识之神' }],
      },
      {
        id: 'kg_micro_15', name: 'Mana Seal', nameCN: '魔力封印',
        description: '-2% 魔力封印',
        x: 3, y: 4, nodeType: 'micro', maxPoints: 3, requiredPoints: 15,
        mods: [{ type: 'DmgPct', value: 2, addn: false, dmgModType: 'spell', src: 'talent', srcDetail: '知识之神' }],
      },

      // ---- 中点 (0/1) ----
      // 3pts 层
      {
        id: 'kg_med_1', name: 'Spell Damage III', nameCN: '法术伤害 III',
        description: '+24% 法术伤害',
        x: 3, y: 0, nodeType: 'medium', maxPoints: 1, requiredPoints: 3,
        mods: [{ type: 'DmgPct', value: 24, addn: false, dmgModType: 'spell', src: 'talent', srcDetail: '知识之神' }],
      },
      {
        id: 'kg_med_2', name: 'Life & Shield II', nameCN: '生命与护盾 II',
        description: '+10% 最大生命, +10% 最大护盾',
        x: 4, y: 0, nodeType: 'medium', maxPoints: 1, requiredPoints: 3,
        mods: [{ type: 'DmgPct', value: 10, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '知识之神' }],
      },
      {
        id: 'kg_med_3', name: 'Cold Damage III', nameCN: '冰冷伤害 III',
        description: '+24% 冰冷伤害',
        x: 5, y: 0, nodeType: 'medium', maxPoints: 1, requiredPoints: 3,
        mods: [{ type: 'DmgPct', value: 24, addn: false, dmgModType: 'cold', src: 'talent', srcDetail: '知识之神' }],
      },
      // 6pts 层
      {
        id: 'kg_med_4', name: 'Cast Speed II', nameCN: '施法速度 II',
        description: '+8% 施法速度',
        x: 3, y: 1, nodeType: 'medium', maxPoints: 1, requiredPoints: 6,
        mods: [{ type: 'CspdPct', value: 8, addn: false, src: 'talent', srcDetail: '知识之神' }],
      },
      {
        id: 'kg_med_5', name: 'Max Mana II', nameCN: '魔力 II',
        description: '+12% 最大魔力, 每秒自然回复4/5%魔力',
        x: 4, y: 1, nodeType: 'medium', maxPoints: 1, requiredPoints: 6,
        mods: [{ type: 'Stat', stat: 'int', value: 12, src: 'talent', srcDetail: '知识之神' }],
      },
      // 9pts 层
      {
        id: 'kg_med_6', name: 'Crit Rating II', nameCN: '暴击值 II',
        description: '+30% 暴击值, +15% 暴击伤害',
        x: 3, y: 2, nodeType: 'medium', maxPoints: 1, requiredPoints: 9,
        mods: [
          { type: 'CritRatingPct', value: 30, addn: false, modType: 'global', src: 'talent', srcDetail: '知识之神' },
          { type: 'CritDmgPct', value: 15, addn: false, modType: 'global', src: 'talent', srcDetail: '知识之神' },
        ],
      },
      {
        id: 'kg_med_7', name: 'Skill Range II', nameCN: '技能范围 II',
        description: '+24% 技能范围',
        x: 4, y: 2, nodeType: 'medium', maxPoints: 1, requiredPoints: 9,
        mods: [{ type: 'DmgPct', value: 24, addn: false, dmgModType: 'area', src: 'talent', srcDetail: '知识之神' }],
      },
      {
        id: 'kg_med_8', name: 'Spell Block II', nameCN: '法术格挡 II',
        description: '+6% 法术格挡率；持盾时+20%法术伤害',
        x: 5, y: 2, nodeType: 'medium', maxPoints: 1, requiredPoints: 9,
        mods: [
          { type: 'DmgPct', value: 20, addn: false, dmgModType: 'spell', src: 'talent', srcDetail: '知识之神' },
        ],
      },
      // 12pts 层
      {
        id: 'kg_med_9', name: 'Intelligence II', nameCN: '智慧 II',
        description: '+6% 智慧',
        x: 3, y: 3, nodeType: 'medium', maxPoints: 1, requiredPoints: 12,
        mods: [{ type: 'Stat', stat: 'int', value: 6, src: 'talent', srcDetail: '知识之神' }],
      },
      {
        id: 'kg_med_10', name: 'Cold Damage IV', nameCN: '冰冷伤害 IV',
        description: '+18% 冰冷伤害, +2% 冰冷穿透',
        x: 4, y: 3, nodeType: 'medium', maxPoints: 1, requiredPoints: 12,
        mods: [
          { type: 'DmgPct', value: 18, addn: false, dmgModType: 'cold', src: 'talent', srcDetail: '知识之神' },
          { type: 'ResPenPct', value: 2, penType: 'cold', src: 'talent', srcDetail: '知识之神' },
        ],
      },
      // 15pts 层
      {
        id: 'kg_med_11', name: 'Max Shield III', nameCN: '护盾 III',
        description: '+8% 最大护盾, +6% 护盾充能速度',
        x: 5, y: 3, nodeType: 'medium', maxPoints: 1, requiredPoints: 15,
        mods: [{ type: 'DmgPct', value: 8, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '知识之神' }],
      },
      {
        id: 'kg_med_12', name: 'Freeze Duration', nameCN: '冰结持续时间',
        description: '+12% 冰结持续时间',
        x: 6, y: 3, nodeType: 'medium', maxPoints: 1, requiredPoints: 15,
        mods: [{ type: 'DmgPct', value: 12, addn: false, dmgModType: 'cold', src: 'talent', srcDetail: '知识之神' }],
      },
      // 18pts 层
      {
        id: 'kg_med_13', name: 'Spell Skill Level', nameCN: '法术技能等级',
        description: '+1 法术技能等级',
        x: 3, y: 4, nodeType: 'medium', maxPoints: 1, requiredPoints: 18,
        mods: [{ type: 'SkillLevel', value: 1, skillTag: 'spell', src: 'talent', srcDetail: '知识之神' }],
      },
      {
        id: 'kg_med_14', name: 'Convergence Stacks', nameCN: '聚能层数上限',
        description: '+1 聚能祝福层数上限',
        x: 4, y: 4, nodeType: 'medium', maxPoints: 1, requiredPoints: 18,
        mods: [{ type: 'DmgPct', value: 5, addn: true, dmgModType: 'spell', src: 'talent', srcDetail: '知识之神' }],
      },
      {
        id: 'kg_med_15', name: 'Mana Seal II', nameCN: '魔力封印 II',
        description: '-6% 魔力封印',
        x: 5, y: 4, nodeType: 'medium', maxPoints: 1, requiredPoints: 18,
        mods: [{ type: 'DmgPct', value: 6, addn: false, dmgModType: 'spell', src: 'talent', srcDetail: '知识之神' }],
      },
      {
        id: 'kg_med_16', name: 'Freeze Convergence', nameCN: '冰封聚能',
        description: '造成冰封时+100%几率获得1层聚能祝福',
        x: 6, y: 4, nodeType: 'medium', maxPoints: 1, requiredPoints: 18,
        mods: [{ type: 'DmgPct', value: 5, addn: true, dmgModType: 'spell', src: 'talent', srcDetail: '知识之神' }],
      },

      // ---- 神格节点 (0/1, 10pts解锁) ----
      {
        id: 'kg_keystone_1', name: 'Beacon', nameCN: '灯塔',
        description: '额外+25%法术伤害；额外+25%技能消耗',
        x: 6, y: 1, nodeType: 'legendary', maxPoints: 1, requiredPoints: 10,
        mods: [
          { type: 'DmgPct', value: 25, addn: true, dmgModType: 'spell', src: 'talent', srcDetail: '灯塔' },
        ],
      },
      {
        id: 'kg_keystone_2', name: 'Bitter Cold', nameCN: '苦寒',
        description: '额外+20%周围敌人受到的冰冷伤害；周围敌人无法自然回复生命；击中时+100%几率获得1层聚能祝福；+1聚能祝福层数上限',
        x: 7, y: 1, nodeType: 'legendary', maxPoints: 1, requiredPoints: 10,
        mods: [
          { type: 'DmgPct', value: 20, addn: true, dmgModType: 'cold', isEnemyDebuff: true, src: 'talent', srcDetail: '苦寒' },
          { type: 'DmgPct', value: 5, addn: true, dmgModType: 'spell', src: 'talent', srcDetail: '苦寒' },
        ],
      },
      {
        id: 'kg_keystone_3', name: 'Deep Winter', nameCN: '凛冬',
        description: '敌人每1/5秒-5%冰冷抗性，至多叠加8层',
        x: 8, y: 1, nodeType: 'legendary', maxPoints: 1, requiredPoints: 10,
        mods: [
          { type: 'ResPenPct', value: 40, penType: 'cold', src: 'talent', srcDetail: '凛冬' },
        ],
      },

      // ---- 高级神格 (0/1, 20pts解锁) ----
      {
        id: 'kg_ultimate_1', name: 'Keen Eye', nameCN: '别具慧眼',
        description: '+45%法术伤害；每5点智慧+1%法术伤害',
        x: 6, y: 3, nodeType: 'legendary', maxPoints: 1, requiredPoints: 20,
        mods: [
          { type: 'DmgPct', value: 45, addn: false, dmgModType: 'spell', src: 'talent', srcDetail: '别具慧眼' },
          { type: 'DmgPct', value: 1, addn: false, dmgModType: 'spell', per: { stat: 'int', per: 5 }, src: 'talent', srcDetail: '别具慧眼' },
        ],
      },
      {
        id: 'kg_ultimate_2', name: 'Hot Hand', nameCN: '灸手可热',
        description: '免疫冰结；额外+20%冰冷和火焰伤害',
        x: 7, y: 3, nodeType: 'legendary', maxPoints: 1, requiredPoints: 20,
        mods: [
          { type: 'DmgPct', value: 20, addn: true, dmgModType: 'cold', src: 'talent', srcDetail: '灸手可热' },
          { type: 'DmgPct', value: 20, addn: true, dmgModType: 'fire', src: 'talent', srcDetail: '灸手可热' },
        ],
      },
      {
        id: 'kg_ultimate_3', name: 'Recharge', nameCN: '养精蓄锐',
        description: '每消耗10%魔力获得1层聚能祝福；每有1层聚能祝福+25%魔力自然回复速度',
        x: 8, y: 3, nodeType: 'legendary', maxPoints: 1, requiredPoints: 20,
        mods: [
          { type: 'DmgPct', value: 25, addn: true, dmgModType: 'spell', src: 'talent', srcDetail: '养精蓄锐' },
        ],
      },
    ],
  },
};

export function getTalentBoard(id: string): TalentBoardData | undefined {
  return talentBoards[id];
}

export function getAllTalentBoards(): TalentBoardData[] {
  return Object.values(talentBoards);
}
