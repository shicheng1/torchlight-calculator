import type { Mod } from '@/engine/types/mod.ts';

export interface PactspiritData {
  id: string;
  name: string;
  nameCN: string;
  rarity: 'magic' | 'rare' | 'legendary';
  type: 'attack' | 'spell' | 'minion' | 'defense' | 'drop' | 'dot' | 'fire' | 'cold' | 'lightning' | 'erosion' | 'potion';
  description: string;
  maxStage: number;
  stageEffects: { stage: number; description: string; mods: Mod[] }[];
}

export const pactspiritsData: Record<string, PactspiritData> = {
  // ==================== 雾蝎（攻击/传奇） ====================
  fog_scorpion: {
    id: 'fog_scorpion',
    name: 'Fog Scorpion',
    nameCN: '雾蝎',
    rarity: 'legendary',
    type: 'attack',
    description: '攻击型传奇契灵。内环：攻击技能+2%几率造成双倍伤害，+12%攻击伤害，+8%连续攻击几率。中环：攻击技能+4%几率造成双倍伤害，+24%攻击伤害，+16%连续攻击几率。外环(应变)：周围只有1个敌人时额外+20%攻击速度；周围至少2个敌人时+9%移动速度。命运：每个槽位+6*1%伤害，+6*1%召唤物伤害',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：攻击技能+2%几率造成双倍伤害，+12%攻击伤害，+8%连续攻击几率',
        mods: [
          { type: 'DoubleDmgChancePct', value: 2, addn: true, src: 'pactspirit', srcDetail: '雾蝎-内环' } as Mod,
          { type: 'DmgPct', value: 12, addn: false, dmgModType: 'attack', src: 'pactspirit', srcDetail: '雾蝎-内环' } as Mod,
          { type: 'ConsecutiveAtkChancePct', value: 8, addn: false, src: 'pactspirit', srcDetail: '雾蝎-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：攻击技能+4%几率造成双倍伤害，+24%攻击伤害，+16%连续攻击几率',
        mods: [
          { type: 'DoubleDmgChancePct', value: 4, addn: true, src: 'pactspirit', srcDetail: '雾蝎-中环' } as Mod,
          { type: 'DmgPct', value: 24, addn: false, dmgModType: 'attack', src: 'pactspirit', srcDetail: '雾蝎-中环' } as Mod,
          { type: 'ConsecutiveAtkChancePct', value: 16, addn: false, src: 'pactspirit', srcDetail: '雾蝎-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '外环(应变)：周围只有1个敌人时额外+20%攻击速度；周围至少2个敌人时+9%移动速度',
        mods: [
          { type: 'AspdPct', value: 20, addn: true, cond: 'single_target', src: 'pactspirit', srcDetail: '雾蝎-外环' } as Mod,
          { type: 'MoveSpeedPct', value: 9, addn: false, cond: 'enemy_nearby', src: 'pactspirit', srcDetail: '雾蝎-外环' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：周围只有1个敌人时+27%攻速；至少2个敌人时+12%移速+30%移速；额外+4%伤害',
        mods: [
          { type: 'AspdPct', value: 27, addn: false, cond: 'single_target', src: 'pactspirit', srcDetail: '雾蝎-6阶' } as Mod,
          { type: 'MoveSpeedPct', value: 30, addn: false, cond: 'enemy_nearby', src: 'pactspirit', srcDetail: '雾蝎-6阶' } as Mod,
          { type: 'DmgPct', value: 4, addn: false, dmgModType: 'global', src: 'pactspirit', srcDetail: '雾蝎-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 机关权柄（召唤/传奇） ====================
  mechanical_scepter: {
    id: 'mechanical_scepter',
    name: 'Mechanical Scepter',
    nameCN: '机关权柄',
    rarity: 'legendary',
    type: 'minion',
    description: '召唤型传奇契灵。智械召唤物+19%几率造成双倍伤害；智械造成双倍伤害时+8%召唤物攻击与施法速度持续4秒；智械造成双倍伤害时+20%召唤物攻击与施法速度持续4秒；额外+4%召唤物伤害',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '智械召唤物+19%几率造成双倍伤害',
        mods: [
          { type: 'DoubleDmgChancePct', value: 19, addn: true, src: 'pactspirit', srcDetail: '机关权柄' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '智械造成双倍伤害时+8%召唤物攻击与施法速度持续4秒',
        mods: [
          { type: 'MinionAspdPct', value: 8, addn: true, src: 'pactspirit', srcDetail: '机关权柄-3阶' } as Mod,
          { type: 'MinionCspdPct', value: 8, addn: true, src: 'pactspirit', srcDetail: '机关权柄-3阶' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '智械造成双倍伤害时+20%召唤物攻击与施法速度持续4秒',
        mods: [
          { type: 'MinionAspdPct', value: 20, addn: true, src: 'pactspirit', srcDetail: '机关权柄-5阶' } as Mod,
          { type: 'MinionCspdPct', value: 20, addn: true, src: 'pactspirit', srcDetail: '机关权柄-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '额外+4%召唤物伤害',
        mods: [
          { type: 'MinionDmgPct', value: 4, addn: false, src: 'pactspirit', srcDetail: '机关权柄-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 风语叶（召唤/传奇） ====================
  wind_leaf: {
    id: 'wind_leaf',
    name: 'Wind Leaf',
    nameCN: '风语叶',
    rarity: 'legendary',
    type: 'minion',
    description: '召唤型传奇契灵。最近被召唤出来的召唤物额外+30%伤害；最近被召唤出来的召唤物+60暴击值；最近被召唤出来的召唤物+160暴击值；额外+4%召唤物伤害',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '最近被召唤出来的召唤物额外+30%伤害',
        mods: [
          { type: 'MinionDmgPct', value: 30, addn: true, src: 'pactspirit', srcDetail: '风语叶' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '最近被召唤出来的召唤物+60暴击值',
        mods: [
          { type: 'MinionFlatCritRating', value: 60, src: 'pactspirit', srcDetail: '风语叶-3阶' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '最近被召唤出来的召唤物+160暴击值',
        mods: [
          { type: 'MinionFlatCritRating', value: 160, src: 'pactspirit', srcDetail: '风语叶-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '额外+4%召唤物伤害',
        mods: [
          { type: 'MinionDmgPct', value: 4, addn: false, src: 'pactspirit', srcDetail: '风语叶-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 织梦者（法术/传奇） ====================
  dream_weaver: {
    id: 'dream_weaver',
    name: 'Dream Weaver',
    nameCN: '织梦者',
    rarity: 'legendary',
    type: 'spell',
    description: '法术型传奇契灵。法术技能造成的元素伤害额外+19%；最近每次使用元素伤害击中敌人1.2%元素抗性穿透最多4层；最近每次使用元素伤害击中敌人+3%元素抗性穿透最多4层；额外+4%伤害',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '法术技能造成的元素伤害额外+19%',
        mods: [
          { type: 'DmgPct', value: 19, addn: true, dmgModType: 'spell_elemental', src: 'pactspirit', srcDetail: '织梦者' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '最近每次使用元素伤害击中敌人1.2%元素抗性穿透最多4层',
        mods: [
          { type: 'ResPenPct', value: 1.2, addn: true, penType: 'elemental', per: { stat: 'elemental_hit_count', per: 1, limit: 4 }, src: 'pactspirit', srcDetail: '织梦者-3阶' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '最近每次使用元素伤害击中敌人+3%元素抗性穿透最多4层',
        mods: [
          { type: 'ResPenPct', value: 3, addn: true, penType: 'elemental', per: { stat: 'elemental_hit_count', per: 1, limit: 4 }, src: 'pactspirit', srcDetail: '织梦者-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '额外+4%伤害',
        mods: [
          { type: 'DmgPct', value: 4, addn: false, dmgModType: 'global', src: 'pactspirit', srcDetail: '织梦者-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 骨虫之女（法术/传奇） ====================
  bone_worm_daughter: {
    id: 'bone_worm_daughter',
    name: 'Bone Worm Daughter',
    nameCN: '骨虫之女',
    rarity: 'legendary',
    type: 'spell',
    description: '法术型传奇契灵。敌人身上每有1种异常状态+70法术暴击值最多+140；敌人身上每有1种异常状态+7%暴击伤害最多+14%；敌人身上每有1种异常状态+18%暴击伤害最多+36%；额外+4%伤害',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '敌人身上每有1种异常状态+70法术暴击值最多+140',
        mods: [
          { type: 'FlatCritRating', value: 70, modType: 'spell', per: { stat: 'enemy_ailment_count', per: 1, limit: 2 }, src: 'pactspirit', srcDetail: '骨虫之女' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '敌人身上每有1种异常状态+7%暴击伤害最多+14%',
        mods: [
          { type: 'CritDmgPct', value: 7, addn: true, modType: 'global', per: { stat: 'enemy_ailment_count', per: 1, limit: 2 }, src: 'pactspirit', srcDetail: '骨虫之女-3阶' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '敌人身上每有1种异常状态+18%暴击伤害最多+36%',
        mods: [
          { type: 'CritDmgPct', value: 18, addn: true, modType: 'global', per: { stat: 'enemy_ailment_count', per: 1, limit: 2 }, src: 'pactspirit', srcDetail: '骨虫之女-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '额外+4%伤害',
        mods: [
          { type: 'DmgPct', value: 4, addn: false, dmgModType: 'global', src: 'pactspirit', srcDetail: '骨虫之女-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 旅行小蜥-青叶（攻击/稀有） ====================
  traveling_lizard_green_leaf: {
    id: 'traveling_lizard_green_leaf',
    name: 'Traveling Lizard - Green Leaf',
    nameCN: '旅行小蜥-青叶',
    rarity: 'rare',
    type: 'attack',
    description: '攻击型稀有契灵。内环：+12%攻击伤害，+22%攻击暴击值，+4%攻击速度。中环：+24%攻击伤害，+45%攻击暴击值，+8%攻击速度。',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：+12%攻击伤害，+22%攻击暴击值，+4%攻击速度',
        mods: [
          { type: 'DmgPct', value: 12, addn: false, dmgModType: 'attack', src: 'pactspirit', srcDetail: '旅行小蜥-青叶-内环' } as Mod,
          { type: 'CritRatingPct', value: 22, addn: false, modType: 'attack', src: 'pactspirit', srcDetail: '旅行小蜥-青叶-内环' } as Mod,
          { type: 'AspdPct', value: 4, addn: false, src: 'pactspirit', srcDetail: '旅行小蜥-青叶-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：+24%攻击伤害，+45%攻击暴击值，+8%攻击速度',
        mods: [
          { type: 'DmgPct', value: 24, addn: false, dmgModType: 'attack', src: 'pactspirit', srcDetail: '旅行小蜥-青叶-中环' } as Mod,
          { type: 'CritRatingPct', value: 45, addn: false, modType: 'attack', src: 'pactspirit', srcDetail: '旅行小蜥-青叶-中环' } as Mod,
          { type: 'AspdPct', value: 8, addn: false, src: 'pactspirit', srcDetail: '旅行小蜥-青叶-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '5阶：额外+6%对周围敌人造成的攻击伤害',
        mods: [
          { type: 'DmgPct', value: 6, addn: true, dmgModType: 'attack', cond: 'enemy_nearby', src: 'pactspirit', srcDetail: '旅行小蜥-青叶-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：额外+7%伤害，+7%召唤物伤害，+6%对周围敌人攻击伤害，+4%伤害',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '旅行小蜥-青叶-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 7, addn: true, src: 'pactspirit', srcDetail: '旅行小蜥-青叶-6阶' } as Mod,
          { type: 'DmgPct', value: 6, addn: true, dmgModType: 'attack', cond: 'enemy_nearby', src: 'pactspirit', srcDetail: '旅行小蜥-青叶-6阶' } as Mod,
          { type: 'DmgPct', value: 4, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '旅行小蜥-青叶-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 哀怨线球-罗兰（攻击/稀有） ====================
  plaintive_ball_violet: {
    id: 'plaintive_ball_violet',
    name: 'Plaintive Ball of Thread - Violet',
    nameCN: '哀怨线球-罗兰',
    rarity: 'rare',
    type: 'attack',
    description: '攻击型稀有契灵。内环：攻击技能+2%双倍伤害，+12%攻击伤害，+8%连续攻击。中环：+4%双倍伤害，+24%攻击伤害，+16%连续攻击。',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：攻击技能+2%双倍伤害，+12%攻击伤害，+8%连续攻击',
        mods: [
          { type: 'DoubleDmgChancePct', value: 2, addn: false, src: 'pactspirit', srcDetail: '哀怨线球-罗兰-内环' } as Mod,
          { type: 'DmgPct', value: 12, addn: false, dmgModType: 'attack', src: 'pactspirit', srcDetail: '哀怨线球-罗兰-内环' } as Mod,
          { type: 'ConsecutiveAtkChancePct', value: 8, addn: false, src: 'pactspirit', srcDetail: '哀怨线球-罗兰-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：+4%双倍伤害，+24%攻击伤害，+16%连续攻击',
        mods: [
          { type: 'DoubleDmgChancePct', value: 4, addn: false, src: 'pactspirit', srcDetail: '哀怨线球-罗兰-中环' } as Mod,
          { type: 'DmgPct', value: 24, addn: false, dmgModType: 'attack', src: 'pactspirit', srcDetail: '哀怨线球-罗兰-中环' } as Mod,
          { type: 'ConsecutiveAtkChancePct', value: 16, addn: false, src: 'pactspirit', srcDetail: '哀怨线球-罗兰-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '5阶：周围至少2个敌人时+15%移动速度',
        mods: [
          { type: 'MoveSpeedPct', value: 15, addn: false, cond: 'enemy_nearby', src: 'pactspirit', srcDetail: '哀怨线球-罗兰-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：额外+7%伤害，+7%召唤物伤害，+15%移速，+4%伤害',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '哀怨线球-罗兰-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 7, addn: true, src: 'pactspirit', srcDetail: '哀怨线球-罗兰-6阶' } as Mod,
          { type: 'MoveSpeedPct', value: 15, addn: false, cond: 'enemy_nearby', src: 'pactspirit', srcDetail: '哀怨线球-罗兰-6阶' } as Mod,
          { type: 'DmgPct', value: 4, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '哀怨线球-罗兰-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 旅行小蜥-罗兰（攻击/稀有） ====================
  traveling_lizard_violet: {
    id: 'traveling_lizard_violet',
    name: 'Traveling Lizard - Violet',
    nameCN: '旅行小蜥-罗兰',
    rarity: 'rare',
    type: 'attack',
    description: '攻击型稀有契灵。内环：+14%投射物伤害，+6%投射物速度，+22%攻击暴击值。中环：+30%投射物伤害，+12%投射物速度，+45%攻击暴击值。',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：+14%投射物伤害，+6%投射物速度，+22%攻击暴击值',
        mods: [
          { type: 'DmgPct', value: 14, addn: false, dmgModType: 'attack_projectile', src: 'pactspirit', srcDetail: '旅行小蜥-罗兰-内环' } as Mod,
          { type: 'DmgPct', value: 22, addn: false, dmgModType: 'attack', src: 'pactspirit', srcDetail: '旅行小蜥-罗兰-内环' } as Mod,
          { type: 'CritRatingPct', value: 22, addn: false, modType: 'attack', src: 'pactspirit', srcDetail: '旅行小蜥-罗兰-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：+30%投射物伤害，+12%投射物速度，+45%攻击暴击值',
        mods: [
          { type: 'DmgPct', value: 30, addn: false, dmgModType: 'attack_projectile', src: 'pactspirit', srcDetail: '旅行小蜥-罗兰-中环' } as Mod,
          { type: 'DmgPct', value: 45, addn: false, dmgModType: 'attack', src: 'pactspirit', srcDetail: '旅行小蜥-罗兰-中环' } as Mod,
          { type: 'CritRatingPct', value: 45, addn: false, modType: 'attack', src: 'pactspirit', srcDetail: '旅行小蜥-罗兰-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '5阶：对远处的敌人+70攻击投射物技能暴击值',
        mods: [
          { type: 'FlatCritRating', value: 70, modType: 'ranged_attack', src: 'pactspirit', srcDetail: '旅行小蜥-罗兰-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：额外+7%伤害，+7%召唤物伤害，+70投射物暴击值，+4%伤害',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '旅行小蜥-罗兰-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 7, addn: true, src: 'pactspirit', srcDetail: '旅行小蜥-罗兰-6阶' } as Mod,
          { type: 'FlatCritRating', value: 70, modType: 'ranged_attack', src: 'pactspirit', srcDetail: '旅行小蜥-罗兰-6阶' } as Mod,
          { type: 'DmgPct', value: 4, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '旅行小蜥-罗兰-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 良性八哥-宽容绿（攻击/稀有） ====================
  benign_bug_tolerant_green: {
    id: 'benign_bug_tolerant_green',
    name: 'Benign Bug - Tolerant Green',
    nameCN: '良性八哥-宽容绿',
    rarity: 'rare',
    type: 'attack',
    description: '攻击型稀有契灵。内环：+12%攻击伤害，+22%攻击暴击值，+4%攻击速度。中环：+24%攻击伤害，+44%攻击暴击值，+8%攻击速度。阶位特效：额外攻击伤害。',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：+12%攻击伤害，+22%攻击暴击值，+4%攻击速度',
        mods: [
          { type: 'DmgPct', value: 12, addn: false, dmgModType: 'attack', src: 'pactspirit', srcDetail: '良性八哥-宽容绿-内环' } as Mod,
          { type: 'CritRatingPct', value: 22, addn: false, modType: 'attack', src: 'pactspirit', srcDetail: '良性八哥-宽容绿-内环' } as Mod,
          { type: 'AspdPct', value: 4, addn: false, src: 'pactspirit', srcDetail: '良性八哥-宽容绿-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：+24%攻击伤害，+44%攻击暴击值，+8%攻击速度',
        mods: [
          { type: 'DmgPct', value: 24, addn: false, dmgModType: 'attack', src: 'pactspirit', srcDetail: '良性八哥-宽容绿-中环' } as Mod,
          { type: 'CritRatingPct', value: 44, addn: false, modType: 'attack', src: 'pactspirit', srcDetail: '良性八哥-宽容绿-中环' } as Mod,
          { type: 'AspdPct', value: 8, addn: false, src: 'pactspirit', srcDetail: '良性八哥-宽容绿-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '5阶：额外+28%攻击伤害',
        mods: [
          { type: 'DmgPct', value: 28, addn: true, dmgModType: 'attack', src: 'pactspirit', srcDetail: '良性八哥-宽容绿-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：额外+7%伤害，+7%召唤物伤害，+28%攻击伤害，+4%伤害',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '良性八哥-宽容绿-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 7, addn: true, src: 'pactspirit', srcDetail: '良性八哥-宽容绿-6阶' } as Mod,
          { type: 'DmgPct', value: 28, addn: true, dmgModType: 'attack', src: 'pactspirit', srcDetail: '良性八哥-宽容绿-6阶' } as Mod,
          { type: 'DmgPct', value: 4, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '良性八哥-宽容绿-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 小咕咕菇-蓝瘦菇（攻击/稀有） ====================
  shro_shroom_gloom: {
    id: 'shro_shroom_gloom',
    name: 'Shro-Shroom - Gloom Shroom',
    nameCN: '小咕咕菇-蓝瘦菇',
    rarity: 'rare',
    type: 'attack',
    description: '攻击型稀有契灵。内环：+12%攻击伤害，+22%攻击暴击值，+4%攻击速度。中环：+24%攻击伤害，+44%攻击暴击值，+8%攻击速度。阶位特效：额外攻击伤害。',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：+12%攻击伤害，+22%攻击暴击值，+4%攻击速度',
        mods: [
          { type: 'DmgPct', value: 12, addn: false, dmgModType: 'attack', src: 'pactspirit', srcDetail: '小咕咕菇-蓝瘦菇-内环' } as Mod,
          { type: 'CritRatingPct', value: 22, addn: false, modType: 'attack', src: 'pactspirit', srcDetail: '小咕咕菇-蓝瘦菇-内环' } as Mod,
          { type: 'AspdPct', value: 4, addn: false, src: 'pactspirit', srcDetail: '小咕咕菇-蓝瘦菇-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：+24%攻击伤害，+44%攻击暴击值，+8%攻击速度',
        mods: [
          { type: 'DmgPct', value: 24, addn: false, dmgModType: 'attack', src: 'pactspirit', srcDetail: '小咕咕菇-蓝瘦菇-中环' } as Mod,
          { type: 'CritRatingPct', value: 44, addn: false, modType: 'attack', src: 'pactspirit', srcDetail: '小咕咕菇-蓝瘦菇-中环' } as Mod,
          { type: 'AspdPct', value: 8, addn: false, src: 'pactspirit', srcDetail: '小咕咕菇-蓝瘦菇-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '5阶：额外+28%攻击伤害',
        mods: [
          { type: 'DmgPct', value: 28, addn: true, dmgModType: 'attack', src: 'pactspirit', srcDetail: '小咕咕菇-蓝瘦菇-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：额外+7%伤害，+7%召唤物伤害，+28%攻击伤害，+4%伤害',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '小咕咕菇-蓝瘦菇-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 7, addn: true, src: 'pactspirit', srcDetail: '小咕咕菇-蓝瘦菇-6阶' } as Mod,
          { type: 'DmgPct', value: 28, addn: true, dmgModType: 'attack', src: 'pactspirit', srcDetail: '小咕咕菇-蓝瘦菇-6阶' } as Mod,
          { type: 'DmgPct', value: 4, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '小咕咕菇-蓝瘦菇-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 小咕咕菇-牛肝菌（攻击/稀有） ====================
  shro_shroom_boletus: {
    id: 'shro_shroom_boletus',
    name: 'Shro-Shroom - Boletus',
    nameCN: '小咕咕菇-牛肝菌',
    rarity: 'rare',
    type: 'attack',
    description: '攻击型稀有契灵。内环：+12%攻击伤害，+22%攻击暴击值，+4%攻击速度。中环：+24%攻击伤害，+44%攻击暴击值，+8%攻击速度。阶位特效：额外元素伤害。',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：+12%攻击伤害，+22%攻击暴击值，+4%攻击速度',
        mods: [
          { type: 'DmgPct', value: 12, addn: false, dmgModType: 'attack', src: 'pactspirit', srcDetail: '小咕咕菇-牛肝菌-内环' } as Mod,
          { type: 'CritRatingPct', value: 22, addn: false, modType: 'attack', src: 'pactspirit', srcDetail: '小咕咕菇-牛肝菌-内环' } as Mod,
          { type: 'AspdPct', value: 4, addn: false, src: 'pactspirit', srcDetail: '小咕咕菇-牛肝菌-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：+24%攻击伤害，+44%攻击暴击值，+8%攻击速度',
        mods: [
          { type: 'DmgPct', value: 24, addn: false, dmgModType: 'attack', src: 'pactspirit', srcDetail: '小咕咕菇-牛肝菌-中环' } as Mod,
          { type: 'CritRatingPct', value: 44, addn: false, modType: 'attack', src: 'pactspirit', srcDetail: '小咕咕菇-牛肝菌-中环' } as Mod,
          { type: 'AspdPct', value: 8, addn: false, src: 'pactspirit', srcDetail: '小咕咕菇-牛肝菌-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '5阶：额外+28%元素伤害',
        mods: [
          { type: 'DmgPct', value: 28, addn: true, dmgModType: 'elemental', src: 'pactspirit', srcDetail: '小咕咕菇-牛肝菌-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：额外+7%伤害，+7%召唤物伤害，+28%元素伤害，+4%伤害',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '小咕咕菇-牛肝菌-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 7, addn: true, src: 'pactspirit', srcDetail: '小咕咕菇-牛肝菌-6阶' } as Mod,
          { type: 'DmgPct', value: 28, addn: true, dmgModType: 'elemental', src: 'pactspirit', srcDetail: '小咕咕菇-牛肝菌-6阶' } as Mod,
          { type: 'DmgPct', value: 4, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '小咕咕菇-牛肝菌-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 幽狱轻骑-幽光（法术/稀有） ====================
  hell_cavalry_glow: {
    id: 'hell_cavalry_glow',
    name: 'Hell Cavalry - Glow',
    nameCN: '幽狱轻骑-幽光',
    rarity: 'rare',
    type: 'spell',
    description: '法术型稀有契灵。内环：+15%魔力回复，+12%法术伤害，+10%暴击伤害。中环：+30%魔力回复，+24%法术伤害，+20%暴击伤害。',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：+12%法术伤害，+10%暴击伤害',
        mods: [
          { type: 'DmgPct', value: 12, addn: false, dmgModType: 'spell', src: 'pactspirit', srcDetail: '幽狱轻骑-幽光-内环' } as Mod,
          { type: 'CritDmgPct', value: 10, addn: false, modType: 'global', src: 'pactspirit', srcDetail: '幽狱轻骑-幽光-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：+24%法术伤害，+20%暴击伤害',
        mods: [
          { type: 'DmgPct', value: 24, addn: false, dmgModType: 'spell', src: 'pactspirit', srcDetail: '幽狱轻骑-幽光-中环' } as Mod,
          { type: 'CritDmgPct', value: 20, addn: false, modType: 'global', src: 'pactspirit', srcDetail: '幽狱轻骑-幽光-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '5阶：敌人每有1种异常状态+9%暴击伤害，最多+18%',
        mods: [
          { type: 'CritDmgPct', value: 9, addn: true, modType: 'global', per: { stat: 'enemy_ailment_count', per: 1, limit: 2 }, src: 'pactspirit', srcDetail: '幽狱轻骑-幽光-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：额外+7%伤害，+7%召唤物伤害，+9%暴击伤害/异常，+4%伤害',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '幽狱轻骑-幽光-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 7, addn: true, src: 'pactspirit', srcDetail: '幽狱轻骑-幽光-6阶' } as Mod,
          { type: 'CritDmgPct', value: 9, addn: true, modType: 'global', per: { stat: 'enemy_ailment_count', per: 1, limit: 2 }, src: 'pactspirit', srcDetail: '幽狱轻骑-幽光-6阶' } as Mod,
          { type: 'DmgPct', value: 4, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '幽狱轻骑-幽光-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 凛冬莽汉-浅海（法术/稀有） ====================
  winter_darer_shallow_sea: {
    id: 'winter_darer_shallow_sea',
    name: 'Winter Darer - Shallow Sea',
    nameCN: '凛冬莽汉-浅海',
    rarity: 'rare',
    type: 'spell',
    description: '法术型稀有契灵。内环：法术+2%双倍伤害，+12%法术伤害，+4%施法速度。中环：+4%双倍伤害，+24%法术伤害，+8%施法速度。',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：法术+2%双倍伤害，+12%法术伤害，+4%施法速度',
        mods: [
          { type: 'DoubleDmgChancePct', value: 2, addn: false, src: 'pactspirit', srcDetail: '凛冬莽汉-浅海-内环' } as Mod,
          { type: 'DmgPct', value: 12, addn: false, dmgModType: 'spell', src: 'pactspirit', srcDetail: '凛冬莽汉-浅海-内环' } as Mod,
          { type: 'CspdPct', value: 4, addn: false, src: 'pactspirit', srcDetail: '凛冬莽汉-浅海-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：+4%双倍伤害，+24%法术伤害，+8%施法速度',
        mods: [
          { type: 'DoubleDmgChancePct', value: 4, addn: false, src: 'pactspirit', srcDetail: '凛冬莽汉-浅海-中环' } as Mod,
          { type: 'DmgPct', value: 24, addn: false, dmgModType: 'spell', src: 'pactspirit', srcDetail: '凛冬莽汉-浅海-中环' } as Mod,
          { type: 'CspdPct', value: 8, addn: false, src: 'pactspirit', srcDetail: '凛冬莽汉-浅海-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '5阶：周围有劲敌时每秒+5%移速，最多+3层',
        mods: [
          { type: 'MoveSpeedPct', value: 5, addn: false, per: { stat: 'nearby_boss', per: 1, limit: 3 }, src: 'pactspirit', srcDetail: '凛冬莽汉-浅海-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：额外+7%伤害，+7%召唤物伤害，+5%移速/秒，+4%伤害',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '凛冬莽汉-浅海-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 7, addn: true, src: 'pactspirit', srcDetail: '凛冬莽汉-浅海-6阶' } as Mod,
          { type: 'MoveSpeedPct', value: 5, addn: false, per: { stat: 'nearby_boss', per: 1, limit: 3 }, src: 'pactspirit', srcDetail: '凛冬莽汉-浅海-6阶' } as Mod,
          { type: 'DmgPct', value: 4, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '凛冬莽汉-浅海-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 采云者-罗兰（法术/稀有） ====================
  cloudgatherer_violet: {
    id: 'cloudgatherer_violet',
    name: 'Cloudgatherer - Violet',
    nameCN: '采云者-罗兰',
    rarity: 'rare',
    type: 'spell',
    description: '法术型稀有契灵。内环：+12%元素伤害，2%元素抗性穿透，+4%施法速度。中环：+24%元素伤害，4%元素穿透，+8%施法速度。',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：+12%元素伤害，2%元素抗性穿透，+4%施法速度',
        mods: [
          { type: 'DmgPct', value: 12, addn: false, dmgModType: 'elemental', src: 'pactspirit', srcDetail: '采云者-罗兰-内环' } as Mod,
          { type: 'ResPenPct', value: 2, penType: 'elemental', src: 'pactspirit', srcDetail: '采云者-罗兰-内环' } as Mod,
          { type: 'CspdPct', value: 4, addn: false, src: 'pactspirit', srcDetail: '采云者-罗兰-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：+24%元素伤害，4%元素穿透，+8%施法速度',
        mods: [
          { type: 'DmgPct', value: 24, addn: false, dmgModType: 'elemental', src: 'pactspirit', srcDetail: '采云者-罗兰-中环' } as Mod,
          { type: 'ResPenPct', value: 4, penType: 'elemental', src: 'pactspirit', srcDetail: '采云者-罗兰-中环' } as Mod,
          { type: 'CspdPct', value: 8, addn: false, src: 'pactspirit', srcDetail: '采云者-罗兰-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '5阶：每次元素击中+1.6%元素穿透，最多4层',
        mods: [
          { type: 'ResPenPct', value: 1.6, addn: true, penType: 'elemental', per: { stat: 'elemental_hit_count', per: 1, limit: 4 }, src: 'pactspirit', srcDetail: '采云者-罗兰-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：额外+7%伤害，+7%召唤物伤害，+1.6%元素穿透/击中，+4%伤害',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '采云者-罗兰-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 7, addn: true, src: 'pactspirit', srcDetail: '采云者-罗兰-6阶' } as Mod,
          { type: 'ResPenPct', value: 1.6, addn: true, penType: 'elemental', per: { stat: 'elemental_hit_count', per: 1, limit: 4 }, src: 'pactspirit', srcDetail: '采云者-罗兰-6阶' } as Mod,
          { type: 'DmgPct', value: 4, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '采云者-罗兰-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 小咕咕菇-杏鲍菇（法术/稀有） ====================
  shro_shroom_oyster: {
    id: 'shro_shroom_oyster',
    name: 'Shro-Shroom - Oyster Mushroom',
    nameCN: '小咕咕菇-杏鲍菇',
    rarity: 'rare',
    type: 'spell',
    description: '法术型稀有契灵。内环：+12%法术伤害，+22%法术暴击值，+4%施法速度。中环：+24%法术伤害，+45%法术暴击值，+8%施法速度。',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：+12%法术伤害，+22%法术暴击值，+4%施法速度',
        mods: [
          { type: 'DmgPct', value: 12, addn: false, dmgModType: 'spell', src: 'pactspirit', srcDetail: '小咕咕菇-杏鲍菇-内环' } as Mod,
          { type: 'CritRatingPct', value: 22, addn: false, modType: 'spell', src: 'pactspirit', srcDetail: '小咕咕菇-杏鲍菇-内环' } as Mod,
          { type: 'CspdPct', value: 4, addn: false, src: 'pactspirit', srcDetail: '小咕咕菇-杏鲍菇-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：+24%法术伤害，+45%法术暴击值，+8%施法速度',
        mods: [
          { type: 'DmgPct', value: 24, addn: false, dmgModType: 'spell', src: 'pactspirit', srcDetail: '小咕咕菇-杏鲍菇-中环' } as Mod,
          { type: 'CritRatingPct', value: 45, addn: false, modType: 'spell', src: 'pactspirit', srcDetail: '小咕咕菇-杏鲍菇-中环' } as Mod,
          { type: 'CspdPct', value: 8, addn: false, src: 'pactspirit', srcDetail: '小咕咕菇-杏鲍菇-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '5阶：额外+28%法术伤害',
        mods: [
          { type: 'DmgPct', value: 28, addn: true, dmgModType: 'spell', src: 'pactspirit', srcDetail: '小咕咕菇-杏鲍菇-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：额外+7%伤害，+7%召唤物伤害，+28%法术伤害，+4%伤害',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '小咕咕菇-杏鲍菇-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 7, addn: true, src: 'pactspirit', srcDetail: '小咕咕菇-杏鲍菇-6阶' } as Mod,
          { type: 'DmgPct', value: 28, addn: true, dmgModType: 'spell', src: 'pactspirit', srcDetail: '小咕咕菇-杏鲍菇-6阶' } as Mod,
          { type: 'DmgPct', value: 4, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '小咕咕菇-杏鲍菇-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 招财小栗-荷叶（持续/稀有） ====================
  greedy_chestnut_lotus_leaf: {
    id: 'greedy_chestnut_lotus_leaf',
    name: 'Greedy Chestnut - Lotus Leaf',
    nameCN: '招财小栗-荷叶',
    rarity: 'rare',
    type: 'dot',
    description: '持续伤害型稀有契灵。内环：+12%持续伤害，+3.5%异常几率，+10%加剧效果。中环：+24%持续伤害，+7%异常几率，+20%加剧效果。',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：+12%持续伤害，+10%加剧效果',
        mods: [
          { type: 'DmgPct', value: 12, addn: false, dmgModType: 'damage_over_time', src: 'pactspirit', srcDetail: '招财小栗-荷叶-内环' } as Mod,
          { type: 'DmgPct', value: 10, addn: false, dmgModType: 'ailment', src: 'pactspirit', srcDetail: '招财小栗-荷叶-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：+24%持续伤害，+20%加剧效果',
        mods: [
          { type: 'DmgPct', value: 24, addn: false, dmgModType: 'damage_over_time', src: 'pactspirit', srcDetail: '招财小栗-荷叶-中环' } as Mod,
          { type: 'DmgPct', value: 20, addn: false, dmgModType: 'ailment', src: 'pactspirit', srcDetail: '招财小栗-荷叶-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '5阶：最近每造成1次收割+7%收割时间，最多4层',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'damage_over_time', per: { stat: 'harvest_count', per: 1, limit: 4 }, src: 'pactspirit', srcDetail: '招财小栗-荷叶-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：额外+7%伤害，+7%召唤物伤害，+7%收割时间/次，+4%伤害',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '招财小栗-荷叶-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 7, addn: true, src: 'pactspirit', srcDetail: '招财小栗-荷叶-6阶' } as Mod,
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'damage_over_time', per: { stat: 'harvest_count', per: 1, limit: 4 }, src: 'pactspirit', srcDetail: '招财小栗-荷叶-6阶' } as Mod,
          { type: 'DmgPct', value: 4, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '招财小栗-荷叶-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 招财小栗-翡翠（持续/稀有） ====================
  greedy_chestnut_emerald: {
    id: 'greedy_chestnut_emerald',
    name: 'Greedy Chestnut - Emerald',
    nameCN: '招财小栗-翡翠',
    rarity: 'rare',
    type: 'dot',
    description: '持续伤害型稀有契灵。内环：+3.5%异常几率，+12%异常伤害，+6%异常持续。中环：+7%异常几率，+24%异常伤害，+12%异常持续。',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：+12%异常伤害，+6%异常持续',
        mods: [
          { type: 'DmgPct', value: 12, addn: false, dmgModType: 'ailment', src: 'pactspirit', srcDetail: '招财小栗-翡翠-内环' } as Mod,
          { type: 'DmgPct', value: 6, addn: false, dmgModType: 'damage_over_time', src: 'pactspirit', srcDetail: '招财小栗-翡翠-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：+24%异常伤害，+12%异常持续',
        mods: [
          { type: 'DmgPct', value: 24, addn: false, dmgModType: 'ailment', src: 'pactspirit', srcDetail: '招财小栗-翡翠-中环' } as Mod,
          { type: 'DmgPct', value: 12, addn: false, dmgModType: 'damage_over_time', src: 'pactspirit', srcDetail: '招财小栗-翡翠-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '5阶：+10%诅咒效果',
        mods: [
          { type: 'DmgPct', value: 10, addn: true, dmgModType: 'ailment', src: 'pactspirit', srcDetail: '招财小栗-翡翠-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：额外+7%伤害，+7%召唤物伤害，+10%诅咒效果，+4%伤害',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '招财小栗-翡翠-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 7, addn: true, src: 'pactspirit', srcDetail: '招财小栗-翡翠-6阶' } as Mod,
          { type: 'DmgPct', value: 10, addn: true, dmgModType: 'ailment', src: 'pactspirit', srcDetail: '招财小栗-翡翠-6阶' } as Mod,
          { type: 'DmgPct', value: 4, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '招财小栗-翡翠-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 招财小栗-辉光（持续/稀有） ====================
  greedy_chestnut_radiance: {
    id: 'greedy_chestnut_radiance',
    name: 'Greedy Chestnut - Radiance',
    nameCN: '招财小栗-辉光',
    rarity: 'rare',
    type: 'dot',
    description: '持续伤害型稀有契灵。内环：+12%持续伤害，+5%技能持续，+10%加剧效果。中环：+24%持续伤害，+9%技能持续，+20%加剧效果。',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：+12%持续伤害，+10%加剧效果',
        mods: [
          { type: 'DmgPct', value: 12, addn: false, dmgModType: 'damage_over_time', src: 'pactspirit', srcDetail: '招财小栗-辉光-内环' } as Mod,
          { type: 'DmgPct', value: 10, addn: false, dmgModType: 'ailment', src: 'pactspirit', srcDetail: '招财小栗-辉光-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：+24%持续伤害，+20%加剧效果',
        mods: [
          { type: 'DmgPct', value: 24, addn: false, dmgModType: 'damage_over_time', src: 'pactspirit', srcDetail: '招财小栗-辉光-中环' } as Mod,
          { type: 'DmgPct', value: 20, addn: false, dmgModType: 'ailment', src: 'pactspirit', srcDetail: '招财小栗-辉光-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '5阶：生命健康时+16每秒施加加剧值',
        mods: [
          { type: 'DmgPct', value: 16, addn: true, dmgModType: 'ailment', cond: 'full_life', src: 'pactspirit', srcDetail: '招财小栗-辉光-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：额外+7%伤害，+7%召唤物伤害，+16加剧值/秒，+4%伤害',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '招财小栗-辉光-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 7, addn: true, src: 'pactspirit', srcDetail: '招财小栗-辉光-6阶' } as Mod,
          { type: 'DmgPct', value: 16, addn: true, dmgModType: 'ailment', cond: 'full_life', src: 'pactspirit', srcDetail: '招财小栗-辉光-6阶' } as Mod,
          { type: 'DmgPct', value: 4, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '招财小栗-辉光-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 凛冬莽汉（召唤/稀有） ====================
  winter_darer: {
    id: 'winter_darer',
    name: 'Winter Darer',
    nameCN: '凛冬莽汉',
    rarity: 'rare',
    type: 'minion',
    description: '召唤型稀有契灵。内环：+15%召唤物伤害，+4%召唤物攻速，+4%召唤物生命。中环：+30%召唤物伤害，+8%召唤物攻速，+8%召唤物生命。',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：+15%召唤物伤害，+4%召唤物攻速',
        mods: [
          { type: 'MinionDmgPct', value: 15, addn: false, src: 'pactspirit', srcDetail: '凛冬莽汉-内环' } as Mod,
          { type: 'MinionAspdPct', value: 4, addn: false, src: 'pactspirit', srcDetail: '凛冬莽汉-内环' } as Mod,
          { type: 'MinionCspdPct', value: 4, addn: false, src: 'pactspirit', srcDetail: '凛冬莽汉-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：+30%召唤物伤害，+8%召唤物攻速',
        mods: [
          { type: 'MinionDmgPct', value: 30, addn: false, src: 'pactspirit', srcDetail: '凛冬莽汉-中环' } as Mod,
          { type: 'MinionAspdPct', value: 8, addn: false, src: 'pactspirit', srcDetail: '凛冬莽汉-中环' } as Mod,
          { type: 'MinionCspdPct', value: 8, addn: false, src: 'pactspirit', srcDetail: '凛冬莽汉-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '5阶：智械双倍伤害时+10%召唤物攻速，持续4秒',
        mods: [
          { type: 'MinionAspdPct', value: 10, addn: true, src: 'pactspirit', srcDetail: '凛冬莽汉-5阶' } as Mod,
          { type: 'MinionCspdPct', value: 10, addn: true, src: 'pactspirit', srcDetail: '凛冬莽汉-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：额外+7%伤害，+7%召唤物伤害，+10%召唤物攻速，+4%召唤物伤害',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '凛冬莽汉-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 7, addn: true, src: 'pactspirit', srcDetail: '凛冬莽汉-6阶' } as Mod,
          { type: 'MinionAspdPct', value: 10, addn: true, src: 'pactspirit', srcDetail: '凛冬莽汉-6阶' } as Mod,
          { type: 'MinionCspdPct', value: 10, addn: true, src: 'pactspirit', srcDetail: '凛冬莽汉-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 4, addn: true, src: 'pactspirit', srcDetail: '凛冬莽汉-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 采云者-火花（召唤/稀有） ====================
  cloudgatherer_sparkle: {
    id: 'cloudgatherer_sparkle',
    name: 'Cloudgatherer - Sparkle',
    nameCN: '采云者-火花',
    rarity: 'rare',
    type: 'minion',
    description: '召唤型稀有契灵。内环：+15%召唤物伤害，+4%召唤物攻速，+4%召唤物生命。中环：+30%召唤物伤害，+8%召唤物攻速，+8%召唤物生命。',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：+15%召唤物伤害，+4%召唤物攻速',
        mods: [
          { type: 'MinionDmgPct', value: 15, addn: false, src: 'pactspirit', srcDetail: '采云者-火花-内环' } as Mod,
          { type: 'MinionAspdPct', value: 4, addn: false, src: 'pactspirit', srcDetail: '采云者-火花-内环' } as Mod,
          { type: 'MinionCspdPct', value: 4, addn: false, src: 'pactspirit', srcDetail: '采云者-火花-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：+30%召唤物伤害，+8%召唤物攻速',
        mods: [
          { type: 'MinionDmgPct', value: 30, addn: false, src: 'pactspirit', srcDetail: '采云者-火花-中环' } as Mod,
          { type: 'MinionAspdPct', value: 8, addn: false, src: 'pactspirit', srcDetail: '采云者-火花-中环' } as Mod,
          { type: 'MinionCspdPct', value: 8, addn: false, src: 'pactspirit', srcDetail: '采云者-火花-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '5阶：最近被召唤的召唤物+80暴击值',
        mods: [
          { type: 'MinionFlatCritRating', value: 80, src: 'pactspirit', srcDetail: '采云者-火花-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：额外+7%伤害，+7%召唤物伤害，+80暴击值，+4%召唤物伤害',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '采云者-火花-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 7, addn: true, src: 'pactspirit', srcDetail: '采云者-火花-6阶' } as Mod,
          { type: 'MinionFlatCritRating', value: 80, src: 'pactspirit', srcDetail: '采云者-火花-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 4, addn: true, src: 'pactspirit', srcDetail: '采云者-火花-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 招财小栗-藕荷（召唤/稀有） ====================
  greedy_chestnut_lotus_root: {
    id: 'greedy_chestnut_lotus_root',
    name: 'Greedy Chestnut - Lotus Root',
    nameCN: '招财小栗-藕荷',
    rarity: 'rare',
    type: 'minion',
    description: '召唤型稀有契灵。内环：+7%魔灵之源效果，+5%魔灵技能冷却，+4%召唤物生命。中环：+14%魔灵之源效果，+10%魔灵技能冷却，+8%召唤物生命。',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：+7%魔灵之源效果，+5%魔灵技能冷却',
        mods: [
          { type: 'MinionDmgPct', value: 7, addn: false, src: 'pactspirit', srcDetail: '招财小栗-藕荷-内环' } as Mod,
          { type: 'CdrPct', value: 5, addn: false, src: 'pactspirit', srcDetail: '招财小栗-藕荷-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：+14%魔灵之源效果，+10%魔灵技能冷却',
        mods: [
          { type: 'MinionDmgPct', value: 14, addn: false, src: 'pactspirit', srcDetail: '招财小栗-藕荷-中环' } as Mod,
          { type: 'CdrPct', value: 10, addn: false, src: 'pactspirit', srcDetail: '招财小栗-藕荷-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '5阶：额外+4%魔灵技能伤害',
        mods: [
          { type: 'MinionDmgPct', value: 4, addn: true, src: 'pactspirit', srcDetail: '招财小栗-藕荷-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：额外+7%伤害，+7%召唤物伤害，+4%魔灵技能伤害，+4%召唤物伤害',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '招财小栗-藕荷-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 7, addn: true, src: 'pactspirit', srcDetail: '招财小栗-藕荷-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 4, addn: true, src: 'pactspirit', srcDetail: '招财小栗-藕荷-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 4, addn: true, src: 'pactspirit', srcDetail: '招财小栗-藕荷-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 凛冬莽汉-熔岩（火焰/稀有） ====================
  winter_darer_lava: {
    id: 'winter_darer_lava',
    name: 'Winter Darer - Lava',
    nameCN: '凛冬莽汉-熔岩',
    rarity: 'rare',
    type: 'fire',
    description: '火焰型稀有契灵。内环：+14%火焰伤害，+2.5%火焰穿透，+14%火焰范围。中环：+28%火焰伤害，+5%火焰穿透，+28%火焰范围。',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：+14%火焰伤害，+2.5%火焰穿透',
        mods: [
          { type: 'DmgPct', value: 14, addn: false, dmgModType: 'fire', src: 'pactspirit', srcDetail: '凛冬莽汉-熔岩-内环' } as Mod,
          { type: 'ResPenPct', value: 2.5, penType: 'fire', src: 'pactspirit', srcDetail: '凛冬莽汉-熔岩-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：+28%火焰伤害，+5%火焰穿透',
        mods: [
          { type: 'DmgPct', value: 28, addn: false, dmgModType: 'fire', src: 'pactspirit', srcDetail: '凛冬莽汉-熔岩-中环' } as Mod,
          { type: 'ResPenPct', value: 5, penType: 'fire', src: 'pactspirit', srcDetail: '凛冬莽汉-熔岩-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '5阶：额外+6%火焰伤害',
        mods: [
          { type: 'DmgPct', value: 6, addn: true, dmgModType: 'fire', src: 'pactspirit', srcDetail: '凛冬莽汉-熔岩-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：额外+7%伤害，+7%召唤物伤害，+6%火焰伤害，+4%伤害',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '凛冬莽汉-熔岩-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 7, addn: true, src: 'pactspirit', srcDetail: '凛冬莽汉-熔岩-6阶' } as Mod,
          { type: 'DmgPct', value: 6, addn: true, dmgModType: 'fire', src: 'pactspirit', srcDetail: '凛冬莽汉-熔岩-6阶' } as Mod,
          { type: 'DmgPct', value: 4, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '凛冬莽汉-熔岩-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 幽狱轻骑-碎冰（冰冷/稀有） ====================
  hell_cavalry_crushed_ice: {
    id: 'hell_cavalry_crushed_ice',
    name: 'Hell Cavalry - Crushed Ice',
    nameCN: '幽狱轻骑-碎冰',
    rarity: 'rare',
    type: 'cold',
    description: '冰冷型稀有契灵。内环：+14%冰冷伤害，+2.5%冰冷穿透，+3冰结值上限。中环：+28%冰冷伤害，+5%冰冷穿透，+6冰结值上限。',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：+14%冰冷伤害，+2.5%冰冷穿透',
        mods: [
          { type: 'DmgPct', value: 14, addn: false, dmgModType: 'cold', src: 'pactspirit', srcDetail: '幽狱轻骑-碎冰-内环' } as Mod,
          { type: 'ResPenPct', value: 2.5, penType: 'cold', src: 'pactspirit', srcDetail: '幽狱轻骑-碎冰-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：+28%冰冷伤害，+5%冰冷穿透',
        mods: [
          { type: 'DmgPct', value: 28, addn: false, dmgModType: 'cold', src: 'pactspirit', srcDetail: '幽狱轻骑-碎冰-中环' } as Mod,
          { type: 'ResPenPct', value: 5, penType: 'cold', src: 'pactspirit', srcDetail: '幽狱轻骑-碎冰-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '5阶：额外+6%冰冷伤害',
        mods: [
          { type: 'DmgPct', value: 6, addn: true, dmgModType: 'cold', src: 'pactspirit', srcDetail: '幽狱轻骑-碎冰-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：额外+7%伤害，+7%召唤物伤害，+6%冰冷伤害，+4%伤害',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '幽狱轻骑-碎冰-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 7, addn: true, src: 'pactspirit', srcDetail: '幽狱轻骑-碎冰-6阶' } as Mod,
          { type: 'DmgPct', value: 6, addn: true, dmgModType: 'cold', src: 'pactspirit', srcDetail: '幽狱轻骑-碎冰-6阶' } as Mod,
          { type: 'DmgPct', value: 4, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '幽狱轻骑-碎冰-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 幽狱轻骑-闷雷（闪电/稀有） ====================
  hell_cavalry_muffled_thunder: {
    id: 'hell_cavalry_muffled_thunder',
    name: 'Hell Cavalry - Muffled Thunder',
    nameCN: '幽狱轻骑-闷雷',
    rarity: 'rare',
    type: 'lightning',
    description: '闪电型稀有契灵。内环：+14%闪电伤害，+2.5%闪电穿透，+4%攻速施速。中环：+28%闪电伤害，+5%闪电穿透，+8%攻速施速。',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：+14%闪电伤害，+2.5%闪电穿透，+4%攻速施速',
        mods: [
          { type: 'DmgPct', value: 14, addn: false, dmgModType: 'lightning', src: 'pactspirit', srcDetail: '幽狱轻骑-闷雷-内环' } as Mod,
          { type: 'ResPenPct', value: 2.5, penType: 'lightning', src: 'pactspirit', srcDetail: '幽狱轻骑-闷雷-内环' } as Mod,
          { type: 'AspdPct', value: 4, addn: false, src: 'pactspirit', srcDetail: '幽狱轻骑-闷雷-内环' } as Mod,
          { type: 'CspdPct', value: 4, addn: false, src: 'pactspirit', srcDetail: '幽狱轻骑-闷雷-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：+28%闪电伤害，+5%闪电穿透，+8%攻速施速',
        mods: [
          { type: 'DmgPct', value: 28, addn: false, dmgModType: 'lightning', src: 'pactspirit', srcDetail: '幽狱轻骑-闷雷-中环' } as Mod,
          { type: 'ResPenPct', value: 5, penType: 'lightning', src: 'pactspirit', srcDetail: '幽狱轻骑-闷雷-中环' } as Mod,
          { type: 'AspdPct', value: 8, addn: false, src: 'pactspirit', srcDetail: '幽狱轻骑-闷雷-中环' } as Mod,
          { type: 'CspdPct', value: 8, addn: false, src: 'pactspirit', srcDetail: '幽狱轻骑-闷雷-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '5阶：额外+6%闪电伤害',
        mods: [
          { type: 'DmgPct', value: 6, addn: true, dmgModType: 'lightning', src: 'pactspirit', srcDetail: '幽狱轻骑-闷雷-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：额外+7%伤害，+7%召唤物伤害，+6%闪电伤害，+4%伤害',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '幽狱轻骑-闷雷-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 7, addn: true, src: 'pactspirit', srcDetail: '幽狱轻骑-闷雷-6阶' } as Mod,
          { type: 'DmgPct', value: 6, addn: true, dmgModType: 'lightning', src: 'pactspirit', srcDetail: '幽狱轻骑-闷雷-6阶' } as Mod,
          { type: 'DmgPct', value: 4, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '幽狱轻骑-闷雷-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 良性八哥-鬼火黄（腐蚀/稀有） ====================
  benign_bug_ghost_yellow: {
    id: 'benign_bug_ghost_yellow',
    name: 'Benign Bug - Ghost Light Yellow',
    nameCN: '良性八哥-鬼火黄',
    rarity: 'rare',
    type: 'erosion',
    description: '腐蚀型稀有契灵。内环：+28%腐蚀伤害(双)，+2.5%腐蚀穿透。中环：+56%腐蚀伤害(双)，+5%腐蚀穿透。',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：+28%腐蚀伤害，+2.5%腐蚀穿透',
        mods: [
          { type: 'DmgPct', value: 28, addn: false, dmgModType: 'erosion', src: 'pactspirit', srcDetail: '良性八哥-鬼火黄-内环' } as Mod,
          { type: 'ResPenPct', value: 2.5, penType: 'erosion', src: 'pactspirit', srcDetail: '良性八哥-鬼火黄-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：+56%腐蚀伤害，+5%腐蚀穿透',
        mods: [
          { type: 'DmgPct', value: 56, addn: false, dmgModType: 'erosion', src: 'pactspirit', srcDetail: '良性八哥-鬼火黄-中环' } as Mod,
          { type: 'ResPenPct', value: 5, penType: 'erosion', src: 'pactspirit', srcDetail: '良性八哥-鬼火黄-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '5阶：额外+28%腐蚀伤害',
        mods: [
          { type: 'DmgPct', value: 28, addn: true, dmgModType: 'erosion', src: 'pactspirit', srcDetail: '良性八哥-鬼火黄-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：额外+7%伤害，+7%召唤物伤害，+28%腐蚀伤害，+4%伤害',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '良性八哥-鬼火黄-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 7, addn: true, src: 'pactspirit', srcDetail: '良性八哥-鬼火黄-6阶' } as Mod,
          { type: 'DmgPct', value: 28, addn: true, dmgModType: 'erosion', src: 'pactspirit', srcDetail: '良性八哥-鬼火黄-6阶' } as Mod,
          { type: 'DmgPct', value: 4, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '良性八哥-鬼火黄-6阶' } as Mod,
        ],
      },
    ],
  },

  // ==================== 孤影幽幽（灵药/稀有） ====================
  miss_melancholy: {
    id: 'miss_melancholy',
    name: 'Miss Melancholy',
    nameCN: '孤影幽幽',
    rarity: 'rare',
    type: 'potion',
    description: '灵药型稀有契灵。内环：+12%伤害+12%召唤物伤害(双)，+2%移速。中环：+24%伤害+24%召唤物伤害(双)，+4%移速。',
    maxStage: 6,
    stageEffects: [
      {
        stage: 1,
        description: '内环：+24%伤害，+24%召唤物伤害，+2%移速',
        mods: [
          { type: 'DmgPct', value: 24, addn: false, dmgModType: 'global', src: 'pactspirit', srcDetail: '孤影幽幽-内环' } as Mod,
          { type: 'MinionDmgPct', value: 24, addn: false, src: 'pactspirit', srcDetail: '孤影幽幽-内环' } as Mod,
          { type: 'MoveSpeedPct', value: 2, addn: false, src: 'pactspirit', srcDetail: '孤影幽幽-内环' } as Mod,
        ],
      },
      {
        stage: 3,
        description: '中环：+48%伤害，+48%召唤物伤害，+4%移速',
        mods: [
          { type: 'DmgPct', value: 48, addn: false, dmgModType: 'global', src: 'pactspirit', srcDetail: '孤影幽幽-中环' } as Mod,
          { type: 'MinionDmgPct', value: 48, addn: false, src: 'pactspirit', srcDetail: '孤影幽幽-中环' } as Mod,
          { type: 'MoveSpeedPct', value: 4, addn: false, src: 'pactspirit', srcDetail: '孤影幽幽-中环' } as Mod,
        ],
      },
      {
        stage: 5,
        description: '5阶：灵药技能持续期间额外+4%伤害和召唤物伤害',
        mods: [
          { type: 'DmgPct', value: 4, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '孤影幽幽-5阶' } as Mod,
          { type: 'MinionDmgPct', value: 4, addn: true, src: 'pactspirit', srcDetail: '孤影幽幽-5阶' } as Mod,
        ],
      },
      {
        stage: 6,
        description: '6阶满级：额外+7%伤害，+7%召唤物伤害，+4%伤害和召唤物伤害，+4%伤害',
        mods: [
          { type: 'DmgPct', value: 7, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '孤影幽幽-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 7, addn: true, src: 'pactspirit', srcDetail: '孤影幽幽-6阶' } as Mod,
          { type: 'DmgPct', value: 4, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '孤影幽幽-6阶' } as Mod,
          { type: 'MinionDmgPct', value: 4, addn: true, src: 'pactspirit', srcDetail: '孤影幽幽-6阶' } as Mod,
          { type: 'DmgPct', value: 4, addn: true, dmgModType: 'global', src: 'pactspirit', srcDetail: '孤影幽幽-6阶' } as Mod,
        ],
      },
    ],
  },
};

export function getPactspirit(id: string): PactspiritData | undefined {
  return pactspiritsData[id];
}

export function getAllPactspirits(): PactspiritData[] {
  return Object.values(pactspiritsData);
}
