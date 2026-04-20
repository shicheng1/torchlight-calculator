import type { Mod } from '@/engine/types/mod.ts';

// ============ 核心天赋选项 ============
export interface CoreTalentOption {
  id: string;
  nameCN: string;
  description: string;
  mods: Mod[];
}

export interface CoreTalentSlot {
  slotIndex: number;
  unlockPoints: number;  // total points needed to unlock this slot
  options: CoreTalentOption[];  // 3 choices, pick 1
}

// ============ 天赋节点 ============
export interface TalentNodeData {
  id: string;
  name: string;
  nameCN: string;
  description: string;
  x: number;
  y: number;
  nodeType: 'micro' | 'medium' | 'legendary' | 'legendary_medium';
  maxPoints: number;
  /** 层级解锁制：需要在该天赋板上已投入的总点数 >= 此值才能分配 */
  requiredPoints: number;
  mods: Mod[];
}

// ============ 天赋板 ============
export interface TalentBoardData {
  id: string;
  name: string;
  nameCN: string;
  description: string;
  /** 核心机制描述 */
  coreMechanic?: string;
  nodes: TalentNodeData[];
  coreSlots: CoreTalentSlot[];
}

// ============ 天赋板数据 ============
export const talentBoards: Record<string, TalentBoardData> = {

  // ==================== 机械之神 (God of Machines) ====================
  // 召唤/哨卫 | ~38 points | 屏障+统御值
  god_of_machines: {
    id: 'god_of_machines',
    name: 'God of Machines',
    nameCN: '机械之神',
    description: '召唤/哨卫方向',
    coreMechanic: '屏障：20%生命+护盾的防御罩，吸收50%击中伤害 | 统御值：每1点+3%召唤物伤害',
    coreSlots: [
      {
        slotIndex: 0,
        unlockPoints: 10,
        options: [
          {
            id: 'gom_core_1_command',
            nameCN: '号令',
            description: '+35%召唤物攻击与施法速度；额外+100%召唤技能施法速度',
            mods: [
              { type: 'MinionAspdPct', value: 35, addn: false, src: 'talent', srcDetail: '号令' },
              { type: 'MinionAspdPct', value: 100, addn: true, src: 'talent', srcDetail: '号令' },
            ],
          },
          {
            id: 'gom_core_1_sentinel',
            nameCN: '哨兵',
            description: '+1哨卫数量上限；放置哨卫的技能额外+100%施法速度',
            mods: [
              { type: 'MinionCount', value: 1, src: 'talent', srcDetail: '哨兵' },
              { type: 'CspdPct', value: 100, addn: true, src: 'talent', srcDetail: '哨兵' },
            ],
          },
          {
            id: 'gom_core_1_bunker',
            nameCN: '龟缩',
            description: '受到伤害时+35%几率获得屏障',
            mods: [],
          },
        ],
      },
      {
        slotIndex: 1,
        unlockPoints: 20,
        options: [
          {
            id: 'gom_core_2_heavy_guard',
            nameCN: '强力护卫',
            description: '+3召唤技能等级；-25%召唤物侵略性；每秒统御值增加4点；魔灵+40初始生长值',
            mods: [
              { type: 'SkillLevel', value: 3, skillTag: 'minion', src: 'talent', srcDetail: '强力护卫' },
              { type: 'MinionDmgPct', value: 25, addn: false, src: 'talent', srcDetail: '强力护卫' },
            ],
          },
          {
            id: 'gom_core_2_overmod',
            nameCN: '过度改装',
            description: '额外+35%哨卫伤害，额外-50%非哨卫主动技能伤害',
            mods: [
              { type: 'MinionDmgPct', value: 35, addn: true, src: 'talent', srcDetail: '过度改装' },
            ],
          },
          {
            id: 'gom_core_2_isomorphic',
            nameCN: '同构武装',
            description: '主手武器套用至召唤物',
            mods: [],
          },
        ],
      },
    ],
    nodes: [
      // ---- Tier 0 (0pts) ---- 3 small
      {
        id: 'gom_t0_micro_1', name: 'Minion Damage I', nameCN: '召唤物伤害 I',
        description: '+15% 召唤物伤害',
        x: -2, y: 0, nodeType: 'micro', maxPoints: 3, requiredPoints: 0,
        mods: [{ type: 'MinionDmgPct', value: 15, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'gom_t0_micro_2', name: 'Minion Life I', nameCN: '召唤物生命 I',
        description: '+5% 最大生命, +15% 召唤物最大生命',
        x: 0, y: 0, nodeType: 'micro', maxPoints: 3, requiredPoints: 0,
        mods: [
          { type: 'Stat', stat: 'str', value: 5, src: 'talent', srcDetail: '机械之神' } as Mod,
          { type: 'MinionDmgPct', value: 15, addn: false, src: 'talent', srcDetail: '机械之神' },
        ],
      },
      {
        id: 'gom_t0_micro_3', name: 'Sentry Damage I', nameCN: '哨卫伤害 I',
        description: '+15% 哨卫伤害',
        x: 2, y: 0, nodeType: 'micro', maxPoints: 3, requiredPoints: 0,
        mods: [{ type: 'MinionDmgPct', value: 15, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },

      // ---- Tier 3 (3pts) ---- 3 medium + 3 small
      {
        id: 'gom_t3_med_1', name: 'Minion Damage III', nameCN: '召唤物伤害 III',
        description: '+30% 召唤物伤害',
        x: -4, y: 1, nodeType: 'medium', maxPoints: 3, requiredPoints: 3,
        mods: [{ type: 'MinionDmgPct', value: 30, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'gom_t3_med_2', name: 'Minion Life II', nameCN: '召唤物生命 II',
        description: '+10% 最大生命, +30% 召唤物最大生命',
        x: 0, y: 1, nodeType: 'medium', maxPoints: 3, requiredPoints: 3,
        mods: [
          { type: 'Stat', stat: 'str', value: 10, src: 'talent', srcDetail: '机械之神' } as Mod,
          { type: 'MinionDmgPct', value: 30, addn: false, src: 'talent', srcDetail: '机械之神' },
        ],
      },
      {
        id: 'gom_t3_med_3', name: 'Sentry Damage III', nameCN: '哨卫伤害 III',
        description: '+30% 哨卫伤害',
        x: 4, y: 1, nodeType: 'medium', maxPoints: 3, requiredPoints: 3,
        mods: [{ type: 'MinionDmgPct', value: 30, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'gom_t3_micro_1', name: 'Minion Speed I', nameCN: '召唤物速度 I',
        description: '+4% 召唤物攻击与施法速度',
        x: -3, y: 1, nodeType: 'micro', maxPoints: 3, requiredPoints: 3,
        mods: [{ type: 'MinionAspdPct', value: 4, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'gom_t3_micro_2', name: 'Sentry Range I', nameCN: '哨卫范围 I',
        description: '+12% 哨卫技能范围, +10% 哨卫持续时间',
        x: 3, y: 1, nodeType: 'micro', maxPoints: 3, requiredPoints: 3,
        mods: [
          { type: 'DmgPct', value: 12, addn: false, dmgModType: 'minion', src: 'talent', srcDetail: '机械之神' },
        ],
      },

      // ---- Tier 6 (6pts) ---- 2 medium + 3 small
      {
        id: 'gom_t6_med_1', name: 'Minion Speed II', nameCN: '召唤物速度 II',
        description: '+8% 召唤物攻击与施法速度',
        x: -4, y: 2, nodeType: 'medium', maxPoints: 3, requiredPoints: 6,
        mods: [{ type: 'MinionAspdPct', value: 8, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'gom_t6_med_2', name: 'Sentry Range II', nameCN: '哨卫范围 II',
        description: '+24% 哨卫技能范围, +20% 哨卫持续时间',
        x: 4, y: 2, nodeType: 'medium', maxPoints: 3, requiredPoints: 6,
        mods: [
          { type: 'DmgPct', value: 24, addn: false, dmgModType: 'minion', src: 'talent', srcDetail: '机械之神' },
        ],
      },
      {
        id: 'gom_t6_micro_1', name: 'Minion Crit I', nameCN: '召唤物暴击 I',
        description: '+40% 召唤物暴击值',
        x: -2, y: 2, nodeType: 'micro', maxPoints: 3, requiredPoints: 6,
        mods: [{ type: 'CritRatingPct', value: 40, addn: false, modType: 'minion', src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'gom_t6_micro_2', name: 'Minion Shield I', nameCN: '召唤物护盾 I',
        description: '+5% 最大护盾, +5% 召唤物最大护盾',
        x: 0, y: 2, nodeType: 'micro', maxPoints: 3, requiredPoints: 6,
        mods: [
          { type: 'DmgPct', value: 5, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '机械之神' },
        ],
      },
      {
        id: 'gom_t6_micro_3', name: 'Sentry Crit I', nameCN: '哨卫暴击 I',
        description: '+40% 哨卫技能暴击值',
        x: 2, y: 2, nodeType: 'micro', maxPoints: 3, requiredPoints: 6,
        mods: [{ type: 'CritRatingPct', value: 40, addn: false, modType: 'minion', src: 'talent', srcDetail: '机械之神' }],
      },

      // ---- Tier 9 (9pts) ---- 3 medium + 2 small
      {
        id: 'gom_t9_med_1', name: 'Minion Crit Dmg', nameCN: '召唤物暴击伤害',
        description: '+20% 召唤物暴击伤害',
        x: -4, y: 3, nodeType: 'medium', maxPoints: 3, requiredPoints: 9,
        mods: [{ type: 'CritDmgPct', value: 20, addn: false, modType: 'minion', src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'gom_t9_med_2', name: 'Minion Shield II', nameCN: '召唤物护盾 II',
        description: '+10% 最大护盾, +10% 召唤物最大护盾',
        x: 0, y: 3, nodeType: 'medium', maxPoints: 3, requiredPoints: 9,
        mods: [
          { type: 'DmgPct', value: 10, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '机械之神' },
        ],
      },
      {
        id: 'gom_t9_med_3', name: 'Sentry Crit II', nameCN: '哨卫暴击 II',
        description: '+60% 哨卫技能暴击值, +15% 哨卫技能暴击伤害',
        x: 4, y: 3, nodeType: 'medium', maxPoints: 3, requiredPoints: 9,
        mods: [
          { type: 'CritRatingPct', value: 60, addn: false, modType: 'minion', src: 'talent', srcDetail: '机械之神' },
          { type: 'CritDmgPct', value: 15, addn: false, modType: 'minion', src: 'talent', srcDetail: '机械之神' },
        ],
      },
      {
        id: 'gom_t9_micro_1', name: 'Barrier I', nameCN: '屏障 I',
        description: '+10% 屏障吸收量',
        x: -2, y: 3, nodeType: 'micro', maxPoints: 3, requiredPoints: 9,
        mods: [{ type: 'DmgPct', value: 10, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'gom_t9_micro_2', name: 'Stats I', nameCN: '属性 I',
        description: '+10 力量, +10 智慧',
        x: 2, y: 3, nodeType: 'micro', maxPoints: 3, requiredPoints: 9,
        mods: [
          { type: 'Stat', stat: 'str', value: 10, src: 'talent', srcDetail: '机械之神' },
          { type: 'Stat', stat: 'int', value: 10, src: 'talent', srcDetail: '机械之神' },
        ],
      },

      // ---- Tier 12 (12pts) ---- 3 medium + 1 small
      {
        id: 'gom_t12_med_1', name: 'Barrier II', nameCN: '屏障 II',
        description: '+20% 屏障吸收量',
        x: -4, y: 4, nodeType: 'medium', maxPoints: 3, requiredPoints: 12,
        mods: [{ type: 'DmgPct', value: 20, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'gom_t12_med_2', name: 'Scaling I', nameCN: '属性转化 I',
        description: '每50点力量+1%召唤物伤害；每5点智慧+1%召唤物暴击值',
        x: 0, y: 4, nodeType: 'medium', maxPoints: 3, requiredPoints: 12,
        mods: [
          { type: 'MinionDmgPct', value: 1, addn: false, per: { stat: 'str', per: 50 }, src: 'talent', srcDetail: '机械之神' },
          { type: 'CritRatingPct', value: 1, addn: false, modType: 'minion', per: { stat: 'int', per: 5 }, src: 'talent', srcDetail: '机械之神' },
        ],
      },
      {
        id: 'gom_t12_med_3', name: 'Scaling II', nameCN: '属性转化 II',
        description: '每50点力量+1%哨卫伤害；每15点智慧+1%哨卫施放频率',
        x: 4, y: 4, nodeType: 'medium', maxPoints: 3, requiredPoints: 12,
        mods: [
          { type: 'MinionDmgPct', value: 1, addn: false, per: { stat: 'str', per: 50 }, src: 'talent', srcDetail: '机械之神' },
          { type: 'MinionAspdPct', value: 1, addn: false, per: { stat: 'int', per: 15 }, src: 'talent', srcDetail: '机械之神' },
        ],
      },
      {
        id: 'gom_t12_micro_1', name: 'Sentry Damage II', nameCN: '哨卫伤害 II',
        description: '+15% 哨卫伤害',
        x: -2, y: 4, nodeType: 'micro', maxPoints: 3, requiredPoints: 12,
        mods: [{ type: 'MinionDmgPct', value: 15, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },

      // ---- Tier 15 (15pts) ---- 1 medium + 4 small
      {
        id: 'gom_t15_med_1', name: 'Sentry Cooldown', nameCN: '哨卫冷却',
        description: '+16% 哨卫技能冷却回复速度',
        x: -4, y: 5, nodeType: 'medium', maxPoints: 3, requiredPoints: 15,
        mods: [{ type: 'CdrPct', value: 16, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'gom_t15_micro_1', name: 'Minion Damage II', nameCN: '召唤物伤害 II',
        description: '+15% 召唤物伤害',
        x: -2, y: 5, nodeType: 'micro', maxPoints: 3, requiredPoints: 15,
        mods: [{ type: 'MinionDmgPct', value: 15, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'gom_t15_micro_2', name: 'Minion Move Speed', nameCN: '召唤物移动速度',
        description: '+4% 召唤物移动速度',
        x: 0, y: 5, nodeType: 'micro', maxPoints: 3, requiredPoints: 15,
        mods: [{ type: 'MinionAspdPct', value: 4, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'gom_t15_micro_3', name: 'Regen I', nameCN: '回复 I',
        description: '每秒自然回复0.5%生命, +3% 护盾充能速度',
        x: 2, y: 5, nodeType: 'micro', maxPoints: 3, requiredPoints: 15,
        mods: [
          { type: 'LifeRecoveryPct', value: 0.5, addn: false, src: 'talent', srcDetail: '机械之神' },
          { type: 'DmgPct', value: 3, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '机械之神' },
        ],
      },
      {
        id: 'gom_t15_micro_4', name: 'Sentry Freq I', nameCN: '哨卫频率 I',
        description: '+5% 哨卫技能释放频率',
        x: 4, y: 5, nodeType: 'micro', maxPoints: 3, requiredPoints: 15,
        mods: [{ type: 'MinionAspdPct', value: 5, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },

      // ---- Tier 18 (18pts) ---- 5 medium, all 0/1 (legendary_medium)
      {
        id: 'gom_t18_lm_1', name: 'Minion Skill Level', nameCN: '召唤技能等级',
        description: '+1 召唤召唤物的技能等级',
        x: -6, y: 6, nodeType: 'legendary_medium', maxPoints: 1, requiredPoints: 18,
        mods: [{ type: 'SkillLevel', value: 1, skillTag: 'minion', src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'gom_t18_lm_2', name: 'Minion Aggression', nameCN: '召唤物侵略性',
        description: '+25% 召唤物侵略性',
        x: -3, y: 6, nodeType: 'legendary_medium', maxPoints: 1, requiredPoints: 18,
        mods: [{ type: 'MinionAspdPct', value: 25, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'gom_t18_lm_3', name: 'Regen II', nameCN: '回复 II',
        description: '+12% 生命自然回复速度；额外-20%护盾充能间隔',
        x: 0, y: 6, nodeType: 'legendary_medium', maxPoints: 1, requiredPoints: 18,
        mods: [
          { type: 'LifeRecoveryPct', value: 12, addn: false, src: 'talent', srcDetail: '机械之神' },
          { type: 'CdrPct', value: 20, addn: false, src: 'talent', srcDetail: '机械之神' },
        ],
      },
      {
        id: 'gom_t18_lm_4', name: 'Sentry Freq II', nameCN: '哨卫频率 II',
        description: '+15% 哨卫技能释放频率',
        x: 3, y: 6, nodeType: 'legendary_medium', maxPoints: 1, requiredPoints: 18,
        mods: [{ type: 'MinionAspdPct', value: 15, addn: false, src: 'talent', srcDetail: '机械之神' }],
      },
      {
        id: 'gom_t18_lm_5', name: 'Sentry Charges', nameCN: '哨卫充能',
        description: '+1 哨卫技能充能点数上限',
        x: 6, y: 6, nodeType: 'legendary_medium', maxPoints: 1, requiredPoints: 18,
        mods: [{ type: 'MinionCount', value: 1, src: 'talent', srcDetail: '机械之神' }],
      },
    ],
  },

  // ==================== 机械师 (Machinist) ====================
  // 智械/召唤 | ~45 points
  machinist: {
    id: 'machinist',
    name: 'Machinist',
    nameCN: '机械师',
    description: '智械/召唤方向',
    coreMechanic: '统御值：每1点+3%召唤物伤害',
    coreSlots: [
      {
        slotIndex: 0,
        unlockPoints: 16,
        options: [
          {
            id: 'mac_core_1_lord',
            nameCN: '领主',
            description: '召唤物获得额外增益',
            mods: [
              { type: 'MinionDmgPct', value: 20, addn: true, src: 'talent', srcDetail: '领主' },
            ],
          },
          {
            id: 'mac_core_1_warmup',
            nameCN: '预热',
            description: '智械初始即获得满层增益',
            mods: [
              { type: 'MinionAspdPct', value: 15, addn: true, src: 'talent', srcDetail: '预热' },
            ],
          },
          {
            id: 'mac_core_1_muster',
            nameCN: '点兵',
            description: '+1召唤物数量上限',
            mods: [
              { type: 'MinionCount', value: 1, src: 'talent', srcDetail: '点兵' },
            ],
          },
        ],
      },
      {
        slotIndex: 1,
        unlockPoints: 32,
        options: [
          {
            id: 'mac_core_2_blaze',
            nameCN: '侵略如火',
            description: '召唤物侵略性大幅提升，+30%召唤物伤害',
            mods: [
              { type: 'MinionDmgPct', value: 30, addn: true, src: 'talent', srcDetail: '侵略如火' },
            ],
          },
          {
            id: 'mac_core_2_resonance',
            nameCN: '同频共振',
            description: '智械之间产生共鸣，+25%召唤物攻速',
            mods: [
              { type: 'MinionAspdPct', value: 25, addn: true, src: 'talent', srcDetail: '同频共振' },
            ],
          },
          {
            id: 'mac_core_2_united',
            nameCN: '众志成城',
            description: '每个存活召唤物+5%最大生命和护盾',
            mods: [
              { type: 'DmgPct', value: 5, addn: true, dmgModType: 'global', src: 'talent', srcDetail: '众志成城' },
            ],
          },
        ],
      },
    ],
    nodes: [
      // ---- Tier 0 (0pts) ---- 3 small
      {
        id: 'mac_t0_micro_1', name: 'Minion Damage I', nameCN: '召唤物伤害 I',
        description: '+9% 召唤物伤害',
        x: -2, y: 0, nodeType: 'micro', maxPoints: 3, requiredPoints: 0,
        mods: [{ type: 'MinionDmgPct', value: 9, addn: false, src: 'talent', srcDetail: '机械师' }],
      },
      {
        id: 'mac_t0_micro_2', name: 'Life & Shield I', nameCN: '生命与护盾 I',
        description: '+3% 最大生命, +3% 最大护盾',
        x: 0, y: 0, nodeType: 'micro', maxPoints: 3, requiredPoints: 0,
        mods: [
          { type: 'DmgPct', value: 3, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '机械师' },
        ],
      },
      {
        id: 'mac_t0_micro_3', name: 'Sentry Damage I', nameCN: '哨卫伤害 I',
        description: '+12% 哨卫伤害',
        x: 2, y: 0, nodeType: 'micro', maxPoints: 3, requiredPoints: 0,
        mods: [{ type: 'MinionDmgPct', value: 12, addn: false, src: 'talent', srcDetail: '机械师' }],
      },

      // ---- Tier 3 (3pts) ---- 3 medium + 2 small
      {
        id: 'mac_t3_med_1', name: 'Minion Damage II', nameCN: '召唤物伤害 II',
        description: '+18% 召唤物伤害',
        x: -4, y: 1, nodeType: 'medium', maxPoints: 3, requiredPoints: 3,
        mods: [{ type: 'MinionDmgPct', value: 18, addn: false, src: 'talent', srcDetail: '机械师' }],
      },
      {
        id: 'mac_t3_med_2', name: 'Life & Shield II', nameCN: '生命与护盾 II',
        description: '+6% 最大生命, +6% 最大护盾',
        x: 0, y: 1, nodeType: 'medium', maxPoints: 3, requiredPoints: 3,
        mods: [
          { type: 'DmgPct', value: 6, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '机械师' },
        ],
      },
      {
        id: 'mac_t3_med_3', name: 'Sentry Damage II', nameCN: '哨卫伤害 II',
        description: '+24% 哨卫伤害',
        x: 4, y: 1, nodeType: 'medium', maxPoints: 3, requiredPoints: 3,
        mods: [{ type: 'MinionDmgPct', value: 24, addn: false, src: 'talent', srcDetail: '机械师' }],
      },
      {
        id: 'mac_t3_micro_1', name: 'Minion Speed I', nameCN: '召唤物速度 I',
        description: '+3% 召唤物攻速',
        x: -2, y: 1, nodeType: 'micro', maxPoints: 3, requiredPoints: 3,
        mods: [{ type: 'MinionAspdPct', value: 3, addn: false, src: 'talent', srcDetail: '机械师' }],
      },
      {
        id: 'mac_t3_micro_2', name: 'Sentry Freq I', nameCN: '哨卫频率 I',
        description: '+3% 哨卫释放频率',
        x: 2, y: 1, nodeType: 'micro', maxPoints: 3, requiredPoints: 3,
        mods: [{ type: 'MinionAspdPct', value: 3, addn: false, src: 'talent', srcDetail: '机械师' }],
      },

      // ---- Tier 6 (6pts) ---- 2 medium + 3 small
      {
        id: 'mac_t6_med_1', name: 'Minion Speed II', nameCN: '召唤物速度 II',
        description: '+6% 召唤物攻速',
        x: -4, y: 2, nodeType: 'medium', maxPoints: 3, requiredPoints: 6,
        mods: [{ type: 'MinionAspdPct', value: 6, addn: false, src: 'talent', srcDetail: '机械师' }],
      },
      {
        id: 'mac_t6_med_2', name: 'Sentry Freq II', nameCN: '哨卫频率 II',
        description: '+6% 哨卫释放频率',
        x: 4, y: 2, nodeType: 'medium', maxPoints: 3, requiredPoints: 6,
        mods: [{ type: 'MinionAspdPct', value: 6, addn: false, src: 'talent', srcDetail: '机械师' }],
      },
      {
        id: 'mac_t6_micro_1', name: 'Minion Crit I', nameCN: '召唤物暴击 I',
        description: '+15% 召唤物暴击值',
        x: -2, y: 2, nodeType: 'micro', maxPoints: 3, requiredPoints: 6,
        mods: [{ type: 'CritRatingPct', value: 15, addn: false, modType: 'minion', src: 'talent', srcDetail: '机械师' }],
      },
      {
        id: 'mac_t6_micro_2', name: 'Minion Life I', nameCN: '召唤物生命 I',
        description: '+7% 召唤物生命',
        x: 0, y: 2, nodeType: 'micro', maxPoints: 3, requiredPoints: 6,
        mods: [{ type: 'MinionDmgPct', value: 7, addn: false, src: 'talent', srcDetail: '机械师' }],
      },
      {
        id: 'mac_t6_micro_3', name: 'Sentry Crit I', nameCN: '哨卫暴击 I',
        description: '+15% 哨卫暴击值',
        x: 2, y: 2, nodeType: 'micro', maxPoints: 3, requiredPoints: 6,
        mods: [{ type: 'CritRatingPct', value: 15, addn: false, modType: 'minion', src: 'talent', srcDetail: '机械师' }],
      },

      // ---- Tier 9 (9pts) ---- 3 medium + 2 small
      {
        id: 'mac_t9_med_1', name: 'Minion Crit Dmg', nameCN: '召唤物暴击伤害',
        description: '+20% 召唤物暴击值, +5% 召唤物暴击伤害',
        x: -4, y: 3, nodeType: 'medium', maxPoints: 3, requiredPoints: 9,
        mods: [
          { type: 'CritRatingPct', value: 20, addn: false, modType: 'minion', src: 'talent', srcDetail: '机械师' },
          { type: 'CritDmgPct', value: 5, addn: false, modType: 'minion', src: 'talent', srcDetail: '机械师' },
        ],
      },
      {
        id: 'mac_t9_med_2', name: 'Minion Life II', nameCN: '召唤物生命 II',
        description: '+14% 召唤物生命',
        x: 0, y: 3, nodeType: 'medium', maxPoints: 3, requiredPoints: 9,
        mods: [{ type: 'MinionDmgPct', value: 14, addn: false, src: 'talent', srcDetail: '机械师' }],
      },
      {
        id: 'mac_t9_med_3', name: 'Sentry Crit Dmg', nameCN: '哨卫暴击伤害',
        description: '+20% 哨卫暴击值, +5% 哨卫暴击伤害',
        x: 4, y: 3, nodeType: 'medium', maxPoints: 3, requiredPoints: 9,
        mods: [
          { type: 'CritRatingPct', value: 20, addn: false, modType: 'minion', src: 'talent', srcDetail: '机械师' },
          { type: 'CritDmgPct', value: 5, addn: false, modType: 'minion', src: 'talent', srcDetail: '机械师' },
        ],
      },
      {
        id: 'mac_t9_micro_1', name: 'Dominion I', nameCN: '统御值 I',
        description: '每秒统御值+1',
        x: -2, y: 3, nodeType: 'micro', maxPoints: 3, requiredPoints: 9,
        mods: [{ type: 'MinionDmgPct', value: 3, addn: false, src: 'talent', srcDetail: '机械师' }],
      },
      {
        id: 'mac_t9_micro_2', name: 'Sentry Damage III', nameCN: '哨卫伤害 III',
        description: '+12% 哨卫伤害',
        x: 2, y: 3, nodeType: 'micro', maxPoints: 3, requiredPoints: 9,
        mods: [{ type: 'MinionDmgPct', value: 12, addn: false, src: 'talent', srcDetail: '机械师' }],
      },

      // ---- Tier 12 (12pts) ---- 3 medium
      {
        id: 'mac_t12_med_1', name: 'Dominion II', nameCN: '统御值 II',
        description: '每秒统御值+2',
        x: -4, y: 4, nodeType: 'medium', maxPoints: 3, requiredPoints: 12,
        mods: [{ type: 'MinionDmgPct', value: 6, addn: false, src: 'talent', srcDetail: '机械师' }],
      },
      {
        id: 'mac_t12_med_2', name: 'Sentry Boost', nameCN: '哨卫强化',
        description: '+20% 哨卫伤害, +18% 哨卫范围, +9% 哨卫投射速度',
        x: 0, y: 4, nodeType: 'medium', maxPoints: 3, requiredPoints: 12,
        mods: [
          { type: 'MinionDmgPct', value: 20, addn: false, src: 'talent', srcDetail: '机械师' },
          { type: 'DmgPct', value: 18, addn: false, dmgModType: 'minion', src: 'talent', srcDetail: '机械师' },
        ],
      },
      {
        id: 'mac_t12_med_3', name: 'Shield Charge', nameCN: '护盾充能',
        description: '+2% 最大护盾, +1% 护盾充能',
        x: 4, y: 4, nodeType: 'medium', maxPoints: 3, requiredPoints: 12,
        mods: [
          { type: 'DmgPct', value: 2, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '机械师' },
        ],
      },

      // ---- Tier 15 (15pts) ---- 4 small
      {
        id: 'mac_t15_micro_1', name: 'Shield Charge II', nameCN: '护盾充能 II',
        description: '+4% 最大护盾, +2% 护盾充能',
        x: -3, y: 5, nodeType: 'micro', maxPoints: 3, requiredPoints: 15,
        mods: [
          { type: 'DmgPct', value: 4, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '机械师' },
        ],
      },
      {
        id: 'mac_t15_micro_2', name: 'Minion Life III', nameCN: '召唤物生命 III',
        description: '+7% 召唤物生命',
        x: -1, y: 5, nodeType: 'micro', maxPoints: 3, requiredPoints: 15,
        mods: [{ type: 'MinionDmgPct', value: 7, addn: false, src: 'talent', srcDetail: '机械师' }],
      },
      {
        id: 'mac_t15_micro_3', name: 'Barrier I', nameCN: '屏障 I',
        description: '+7% 屏障',
        x: 1, y: 5, nodeType: 'micro', maxPoints: 3, requiredPoints: 15,
        mods: [{ type: 'DmgPct', value: 7, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '机械师' }],
      },
      {
        id: 'mac_t15_micro_4', name: 'Move Speed I', nameCN: '移速 I',
        description: '+2% 移速',
        x: 3, y: 5, nodeType: 'micro', maxPoints: 3, requiredPoints: 15,
        mods: [{ type: 'MoveSpeedPct', value: 2, addn: false, src: 'talent', srcDetail: '机械师' }],
      },

      // ---- Tier 18 (18pts) ---- 5 nodes
      {
        id: 'mac_t18_micro_1', name: 'Minion Life IV', nameCN: '召唤物生命 IV',
        description: '+14% 召唤物生命',
        x: -4, y: 6, nodeType: 'micro', maxPoints: 3, requiredPoints: 18,
        mods: [{ type: 'MinionDmgPct', value: 14, addn: false, src: 'talent', srcDetail: '机械师' }],
      },
      {
        id: 'mac_t18_lm_1', name: 'Minion Damage III', nameCN: '召唤物伤害 III',
        description: '+9% 召唤物伤害 (0/4)',
        x: -2, y: 6, nodeType: 'legendary_medium', maxPoints: 4, requiredPoints: 18,
        mods: [{ type: 'MinionDmgPct', value: 9, addn: false, src: 'talent', srcDetail: '机械师' }],
      },
      {
        id: 'mac_t18_micro_2', name: 'Life Regen I', nameCN: '生命回复 I',
        description: '+2% 最大生命, 每秒0.4%回复',
        x: 0, y: 6, nodeType: 'micro', maxPoints: 3, requiredPoints: 18,
        mods: [
          { type: 'DmgPct', value: 2, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '机械师' },
          { type: 'LifeRecoveryPct', value: 0.4, addn: false, src: 'talent', srcDetail: '机械师' },
        ],
      },
      {
        id: 'mac_t18_lm_2', name: 'Barrier II', nameCN: '屏障 II',
        description: '+25% 屏障 (legendary 0/1)',
        x: 2, y: 6, nodeType: 'legendary_medium', maxPoints: 1, requiredPoints: 18,
        mods: [{ type: 'DmgPct', value: 25, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '机械师' }],
      },
      {
        id: 'mac_t18_micro_3', name: 'Move Speed II', nameCN: '移速 II',
        description: '+4% 移速, 移动时+20%哨卫伤害',
        x: 4, y: 6, nodeType: 'micro', maxPoints: 3, requiredPoints: 18,
        mods: [
          { type: 'MoveSpeedPct', value: 4, addn: false, src: 'talent', srcDetail: '机械师' },
          { type: 'MinionDmgPct', value: 20, addn: true, src: 'talent', srcDetail: '机械师' },
        ],
      },

      // ---- Tier 21 (21pts) ---- 5 nodes
      {
        id: 'mac_t21_lm_3', name: 'Construct Double', nameCN: '智械双倍伤害',
        description: '+2% 智械双倍伤害',
        x: -4, y: 7, nodeType: 'legendary_medium', maxPoints: 1, requiredPoints: 21,
        mods: [{ type: 'DoubleDmgChancePct', value: 2, addn: false, src: 'talent', srcDetail: '机械师' }],
      },
      {
        id: 'mac_t21_lm_4', name: 'Minion Armor Pen', nameCN: '召唤物护甲穿透',
        description: '+3% 召唤物护甲穿透 (0/2)',
        x: -2, y: 7, nodeType: 'legendary_medium', maxPoints: 2, requiredPoints: 21,
        mods: [{ type: 'ArmorPenPct', value: 3, src: 'talent', srcDetail: '机械师' }],
      },
      {
        id: 'mac_t21_micro_4', name: 'Life Regen II', nameCN: '生命回复 II',
        description: '+4% 最大生命, 每秒0.6%回复',
        x: 0, y: 7, nodeType: 'micro', maxPoints: 3, requiredPoints: 21,
        mods: [
          { type: 'DmgPct', value: 4, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '机械师' },
          { type: 'LifeRecoveryPct', value: 0.6, addn: false, src: 'talent', srcDetail: '机械师' },
        ],
      },
      {
        id: 'mac_t21_lm_5', name: 'Sentry Freq III', nameCN: '哨卫频率 III',
        description: '+4% 哨卫释放频率 (0/4)',
        x: 2, y: 7, nodeType: 'legendary_medium', maxPoints: 4, requiredPoints: 21,
        mods: [{ type: 'MinionAspdPct', value: 4, addn: false, src: 'talent', srcDetail: '机械师' }],
      },
      {
        id: 'mac_t21_lm_6', name: 'Sentry Damage IV', nameCN: '哨卫伤害 IV',
        description: '+12% 哨卫伤害 (0/4)',
        x: 4, y: 7, nodeType: 'legendary_medium', maxPoints: 4, requiredPoints: 21,
        mods: [{ type: 'MinionDmgPct', value: 12, addn: false, src: 'talent', srcDetail: '机械师' }],
      },

      // ---- Tier 24 (24pts) ---- 4 legendary
      {
        id: 'mac_t24_leg_1', name: 'Construct Skill Level', nameCN: '智械技能等级',
        description: '+1 智械技能等级 (legendary)',
        x: -3, y: 8, nodeType: 'legendary', maxPoints: 1, requiredPoints: 24,
        mods: [{ type: 'SkillLevel', value: 1, skillTag: 'minion', src: 'talent', srcDetail: '机械师' }],
      },
      {
        id: 'mac_t24_leg_2', name: 'Ailment Base Dmg', nameCN: '异常基础伤害',
        description: '+10 异常基础伤害 (legendary)',
        x: -1, y: 8, nodeType: 'legendary', maxPoints: 1, requiredPoints: 24,
        mods: [{ type: 'DmgPct', value: 10, addn: true, dmgModType: 'ailment', src: 'talent', srcDetail: '机械师' }],
      },
      {
        id: 'mac_t24_leg_3', name: 'Sentry Overdrive', nameCN: '哨卫超频',
        description: '+30% 哨卫释放频率, -5% 哨卫伤害 (legendary)',
        x: 1, y: 8, nodeType: 'legendary', maxPoints: 1, requiredPoints: 24,
        mods: [
          { type: 'MinionAspdPct', value: 30, addn: true, src: 'talent', srcDetail: '机械师' },
          { type: 'MinionDmgPct', value: 5, addn: false, src: 'talent', srcDetail: '机械师' },
        ],
      },
      {
        id: 'mac_t24_leg_4', name: 'Extra Sentry', nameCN: '额外哨卫',
        description: '+1 哨卫数量 (legendary)',
        x: 3, y: 8, nodeType: 'legendary', maxPoints: 1, requiredPoints: 24,
        mods: [{ type: 'MinionCount', value: 1, src: 'talent', srcDetail: '机械师' }],
      },
    ],
  },

  // ==================== 炼金术士 (Alchemist) ====================
  // 魔灵/召唤 | ~35 points
  alchemist: {
    id: 'alchemist',
    name: 'Alchemist',
    nameCN: '炼金术士',
    description: '魔灵/召唤方向',
    coreMechanic: '魔灵：持续存在的召唤伙伴，拥有独立技能和终极技能',
    coreSlots: [
      {
        slotIndex: 0,
        unlockPoints: 24,
        options: [
          {
            id: 'alc_core_1_spring',
            nameCN: '源泉',
            description: '魔灵技能消耗降低，回复增加',
            mods: [
              { type: 'LifeRecoveryPct', value: 15, addn: true, src: 'talent', srcDetail: '源泉' },
            ],
          },
          {
            id: 'alc_core_1_empower',
            nameCN: '赋能',
            description: '魔灵强化技能几率提升',
            mods: [
              { type: 'MinionDmgPct', value: 20, addn: true, src: 'talent', srcDetail: '赋能' },
            ],
          },
          {
            id: 'alc_core_1_charge',
            nameCN: '冲锋号角',
            description: '魔灵终极技能冷却大幅缩短',
            mods: [
              { type: 'CdrPct', value: 25, addn: true, src: 'talent', srcDetail: '冲锋号角' },
            ],
          },
          {
            id: 'alc_core_1_abyss',
            nameCN: '深渊爪牙',
            description: '魔灵获得额外攻击技能',
            mods: [
              { type: 'MinionDmgPct', value: 15, addn: true, src: 'talent', srcDetail: '深渊爪牙' },
            ],
          },
        ],
      },
    ],
    nodes: [
      // ---- Tier 0 (0pts) ---- 3 small
      {
        id: 'alc_t0_micro_1', name: 'Minion & Dmg I', nameCN: '召唤物伤害 I',
        description: '+9% 召唤物伤害, +9% 伤害',
        x: -2, y: 0, nodeType: 'micro', maxPoints: 3, requiredPoints: 0,
        mods: [
          { type: 'MinionDmgPct', value: 9, addn: false, src: 'talent', srcDetail: '炼金术士' },
          { type: 'DmgPct', value: 9, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '炼金术士' },
        ],
      },
      {
        id: 'alc_t0_micro_2', name: 'Life & Shield I', nameCN: '生命与护盾 I',
        description: '+3% 最大生命, +3% 最大护盾',
        x: 0, y: 0, nodeType: 'micro', maxPoints: 3, requiredPoints: 0,
        mods: [
          { type: 'DmgPct', value: 3, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '炼金术士' },
        ],
      },
      {
        id: 'alc_t0_micro_3', name: 'Life Regen I', nameCN: '生命回复 I',
        description: '每秒0.4% 生命回复',
        x: 2, y: 0, nodeType: 'micro', maxPoints: 3, requiredPoints: 0,
        mods: [
          { type: 'LifeRecoveryPct', value: 0.4, addn: false, src: 'talent', srcDetail: '炼金术士' },
        ],
      },

      // ---- Tier 3 (3pts) ---- 3 medium + 2 small
      {
        id: 'alc_t3_med_1', name: 'Minion & Dmg II', nameCN: '召唤物伤害 II',
        description: '+18% 召唤物伤害, +18% 伤害',
        x: -4, y: 1, nodeType: 'medium', maxPoints: 3, requiredPoints: 3,
        mods: [
          { type: 'MinionDmgPct', value: 18, addn: false, src: 'talent', srcDetail: '炼金术士' },
          { type: 'DmgPct', value: 18, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '炼金术士' },
        ],
      },
      {
        id: 'alc_t3_med_2', name: 'Life & Shield II', nameCN: '生命与护盾 II',
        description: '+6% 最大生命, +6% 最大护盾',
        x: 0, y: 1, nodeType: 'medium', maxPoints: 3, requiredPoints: 3,
        mods: [
          { type: 'DmgPct', value: 6, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '炼金术士' },
        ],
      },
      {
        id: 'alc_t3_med_3', name: 'Life Regen II', nameCN: '生命回复 II',
        description: '每秒0.8% 生命回复',
        x: 4, y: 1, nodeType: 'medium', maxPoints: 3, requiredPoints: 3,
        mods: [
          { type: 'LifeRecoveryPct', value: 0.8, addn: false, src: 'talent', srcDetail: '炼金术士' },
        ],
      },
      {
        id: 'alc_t3_micro_1', name: 'Minion Speed I', nameCN: '召唤物速度 I',
        description: '+3% 召唤物攻速, +3% 攻速',
        x: -2, y: 1, nodeType: 'micro', maxPoints: 3, requiredPoints: 3,
        mods: [
          { type: 'MinionAspdPct', value: 3, addn: false, src: 'talent', srcDetail: '炼金术士' },
          { type: 'AspdPct', value: 3, addn: false, src: 'talent', srcDetail: '炼金术士' },
        ],
      },
      {
        id: 'alc_t3_micro_2', name: 'Minion Ailment', nameCN: '召唤物异常',
        description: '+8% 召唤物伤害, +12% 异常几率',
        x: 2, y: 1, nodeType: 'micro', maxPoints: 3, requiredPoints: 3,
        mods: [
          { type: 'MinionDmgPct', value: 8, addn: false, src: 'talent', srcDetail: '炼金术士' },
          { type: 'DmgPct', value: 12, addn: false, dmgModType: 'ailment', src: 'talent', srcDetail: '炼金术士' },
        ],
      },

      // ---- Tier 6 (6pts) ---- 2 medium + 2 small
      {
        id: 'alc_t6_med_1', name: 'Minion Speed II', nameCN: '召唤物速度 II',
        description: '+6% 召唤物攻速, +6% 攻速',
        x: -4, y: 2, nodeType: 'medium', maxPoints: 3, requiredPoints: 6,
        mods: [
          { type: 'MinionAspdPct', value: 6, addn: false, src: 'talent', srcDetail: '炼金术士' },
          { type: 'AspdPct', value: 6, addn: false, src: 'talent', srcDetail: '炼金术士' },
        ],
      },
      {
        id: 'alc_t6_med_2', name: 'Minion Ailment II', nameCN: '召唤物异常 II',
        description: '+16% 召唤物伤害, +24% 异常几率',
        x: 4, y: 2, nodeType: 'medium', maxPoints: 3, requiredPoints: 6,
        mods: [
          { type: 'MinionDmgPct', value: 16, addn: false, src: 'talent', srcDetail: '炼金术士' },
          { type: 'DmgPct', value: 24, addn: false, dmgModType: 'ailment', src: 'talent', srcDetail: '炼金术士' },
        ],
      },
      {
        id: 'alc_t6_micro_1', name: 'Minion Crit I', nameCN: '召唤物暴击 I',
        description: '+15% 召唤物暴击值',
        x: -2, y: 2, nodeType: 'micro', maxPoints: 3, requiredPoints: 6,
        mods: [{ type: 'CritRatingPct', value: 15, addn: false, modType: 'minion', src: 'talent', srcDetail: '炼金术士' }],
      },
      {
        id: 'alc_t6_micro_2', name: 'Shield Charge I', nameCN: '护盾充能 I',
        description: '+3% 护盾充能',
        x: 0, y: 2, nodeType: 'micro', maxPoints: 3, requiredPoints: 6,
        mods: [
          { type: 'DmgPct', value: 3, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '炼金术士' },
        ],
      },

      // ---- Tier 9 (9pts) ---- 3 medium + 2 small
      {
        id: 'alc_t9_med_1', name: 'Minion Crit Dmg', nameCN: '召唤物暴击伤害',
        description: '+20% 召唤物暴击值, +5% 召唤物暴击伤害',
        x: -4, y: 3, nodeType: 'medium', maxPoints: 3, requiredPoints: 9,
        mods: [
          { type: 'CritRatingPct', value: 20, addn: false, modType: 'minion', src: 'talent', srcDetail: '炼金术士' },
          { type: 'CritDmgPct', value: 5, addn: false, modType: 'minion', src: 'talent', srcDetail: '炼金术士' },
        ],
      },
      {
        id: 'alc_t9_med_2', name: 'Shield Charge II', nameCN: '护盾充能 II',
        description: '+6% 护盾充能',
        x: 0, y: 3, nodeType: 'medium', maxPoints: 3, requiredPoints: 9,
        mods: [
          { type: 'DmgPct', value: 6, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '炼金术士' },
        ],
      },
      {
        id: 'alc_t9_med_3', name: 'Pact Ult Dmg', nameCN: '魔灵终极伤害',
        description: '+12% 魔灵终极伤害',
        x: 4, y: 3, nodeType: 'medium', maxPoints: 3, requiredPoints: 9,
        mods: [{ type: 'MinionDmgPct', value: 12, addn: false, src: 'talent', srcDetail: '炼金术士' }],
      },
      {
        id: 'alc_t9_micro_1', name: 'Pact Empower I', nameCN: '魔灵强化 I',
        description: '魔灵+2% 强化技能几率',
        x: -2, y: 3, nodeType: 'micro', maxPoints: 3, requiredPoints: 9,
        mods: [{ type: 'MinionDmgPct', value: 2, addn: false, src: 'talent', srcDetail: '炼金术士' }],
      },
      {
        id: 'alc_t9_micro_2', name: 'Pact Ult Cdr', nameCN: '魔灵终极冷却',
        description: '4.5% 魔灵终极冷却回复',
        x: 2, y: 3, nodeType: 'micro', maxPoints: 3, requiredPoints: 9,
        mods: [{ type: 'CdrPct', value: 4.5, addn: false, src: 'talent', srcDetail: '炼金术士' }],
      },

      // ---- Tier 12 (12pts) ---- 3 medium + 1 small
      {
        id: 'alc_t12_med_1', name: 'Pact Empower II', nameCN: '魔灵强化 II',
        description: '魔灵+4% 强化技能几率',
        x: -4, y: 4, nodeType: 'medium', maxPoints: 3, requiredPoints: 12,
        mods: [{ type: 'MinionDmgPct', value: 4, addn: false, src: 'talent', srcDetail: '炼金术士' }],
      },
      {
        id: 'alc_t12_med_2', name: 'Pact Ult Cdr II', nameCN: '魔灵终极冷却 II',
        description: '+9% 魔灵终极冷却回复',
        x: 0, y: 4, nodeType: 'medium', maxPoints: 3, requiredPoints: 12,
        mods: [{ type: 'CdrPct', value: 9, addn: false, src: 'talent', srcDetail: '炼金术士' }],
      },
      {
        id: 'alc_t12_med_3', name: 'Pact Ult Dmg II', nameCN: '魔灵终极伤害 II',
        description: '+24% 魔灵终极伤害',
        x: 4, y: 4, nodeType: 'medium', maxPoints: 3, requiredPoints: 12,
        mods: [{ type: 'MinionDmgPct', value: 24, addn: false, src: 'talent', srcDetail: '炼金术士' }],
      },
      {
        id: 'alc_t12_micro_1', name: 'Life & Shield III', nameCN: '生命与护盾 III',
        description: '+3% 最大生命, +3% 最大护盾',
        x: -2, y: 4, nodeType: 'micro', maxPoints: 3, requiredPoints: 12,
        mods: [
          { type: 'DmgPct', value: 3, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '炼金术士' },
        ],
      },

      // ---- Tier 15 (15pts) ---- 3 medium + 2 small
      {
        id: 'alc_t15_med_1', name: 'Life & Shield IV', nameCN: '生命与护盾 IV',
        description: '+6% 最大生命, +6% 最大护盾',
        x: -4, y: 5, nodeType: 'medium', maxPoints: 3, requiredPoints: 15,
        mods: [
          { type: 'DmgPct', value: 6, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '炼金术士' },
        ],
      },
      {
        id: 'alc_t15_med_2', name: 'Pact Skill Dmg', nameCN: '魔灵技能伤害',
        description: '+9% 魔灵技能伤害',
        x: 0, y: 5, nodeType: 'medium', maxPoints: 3, requiredPoints: 15,
        mods: [{ type: 'MinionDmgPct', value: 9, addn: false, src: 'talent', srcDetail: '炼金术士' }],
      },
      {
        id: 'alc_t15_med_3', name: 'Pact Source', nameCN: '魔灵之源效果',
        description: '+4% 魔灵之源效果',
        x: 4, y: 5, nodeType: 'medium', maxPoints: 3, requiredPoints: 15,
        mods: [{ type: 'MinionDmgPct', value: 4, addn: false, src: 'talent', srcDetail: '炼金术士' }],
      },
      {
        id: 'alc_t15_micro_1', name: 'Minion & Dmg III', nameCN: '召唤物伤害 III',
        description: '+9% 召唤物伤害, +9% 伤害',
        x: -2, y: 5, nodeType: 'micro', maxPoints: 3, requiredPoints: 15,
        mods: [
          { type: 'MinionDmgPct', value: 9, addn: false, src: 'talent', srcDetail: '炼金术士' },
          { type: 'DmgPct', value: 9, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '炼金术士' },
        ],
      },
      {
        id: 'alc_t15_micro_2', name: 'Mana Seal Comp', nameCN: '魔力封印补偿',
        description: '魔灵技能12.5% 魔力封印补偿',
        x: 2, y: 5, nodeType: 'micro', maxPoints: 3, requiredPoints: 15,
        mods: [{ type: 'CdrPct', value: 12.5, addn: false, src: 'talent', srcDetail: '炼金术士' }],
      },

      // ---- Tier 18 (18pts) ---- 5 legendary (0/1)
      {
        id: 'alc_t18_leg_1', name: 'Pact Skill Level', nameCN: '魔灵技能等级',
        description: '+1 魔灵技能等级, -80% 受伤',
        x: -6, y: 6, nodeType: 'legendary', maxPoints: 1, requiredPoints: 18,
        mods: [
          { type: 'SkillLevel', value: 1, skillTag: 'minion', src: 'talent', srcDetail: '炼金术士' },
          { type: 'DmgPct', value: 80, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '炼金术士' },
        ],
      },
      {
        id: 'alc_t18_leg_2', name: 'Extra Pact Spirit', nameCN: '额外魔灵',
        description: '+1 魔灵数量, -40% 伤害',
        x: -3, y: 6, nodeType: 'legendary', maxPoints: 1, requiredPoints: 18,
        mods: [
          { type: 'MinionCount', value: 1, src: 'talent', srcDetail: '炼金术士' },
          { type: 'DmgPct', value: 40, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '炼金术士' },
        ],
      },
      {
        id: 'alc_t18_leg_3', name: 'Passive Skill Level', nameCN: '被动技能等级',
        description: '+1 被动技能等级',
        x: 0, y: 6, nodeType: 'legendary', maxPoints: 1, requiredPoints: 18,
        mods: [
          { type: 'SkillLevel', value: 1, src: 'talent', srcDetail: '炼金术士' } as Mod,
        ],
      },
      {
        id: 'alc_t18_leg_4', name: 'Damage Transfer', nameCN: '伤害转移',
        description: '8% 伤害转移, -80% 受伤',
        x: 3, y: 6, nodeType: 'legendary', maxPoints: 1, requiredPoints: 18,
        mods: [
          { type: 'DmgPct', value: 80, addn: false, dmgModType: 'global', src: 'talent', srcDetail: '炼金术士' },
        ],
      },
      {
        id: 'alc_t18_leg_5', name: 'Life Regen III', nameCN: '生命回复 III',
        description: '+15% 生命回复, -15% 护盾充能间隔',
        x: 6, y: 6, nodeType: 'legendary', maxPoints: 1, requiredPoints: 18,
        mods: [
          { type: 'LifeRecoveryPct', value: 15, addn: false, src: 'talent', srcDetail: '炼金术士' },
          { type: 'CdrPct', value: 15, addn: false, src: 'talent', srcDetail: '炼金术士' },
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
