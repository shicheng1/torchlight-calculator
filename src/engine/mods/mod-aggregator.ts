import type { Mod } from '../types/mod.ts';
import type { AggregatedMods } from '../types/calc.ts';
import { MINION_BASE_CRIT_RATING } from '../constants/defaults.ts';

/**
 * 将解析后的 Mod 列表聚合为结构化的 AggregatedMods
 * INC 类同类相加，More 类每个独立保留
 * 这是计算管线的第三阶段
 */
export function aggregateMods(mods: Mod[]): AggregatedMods {
  const result: AggregatedMods = createEmptyAggregatedMods();

  for (const mod of mods) {
    switch (mod.type) {
      // ===== 伤害百分比 =====
      case 'DmgPct':
        if (mod.addn) {
          // More 类：独立保留
          result.moreDmg.push({
            value: mod.value,
            modType: mod.dmgModType,
            src: mod.srcDetail ?? mod.src ?? 'unknown',
          });
        } else {
          // INC 类：同类相加
          result.incDmg[mod.dmgModType] = (result.incDmg[mod.dmgModType] ?? 0) + mod.value;
        }
        break;

      // ===== 攻击附加点伤 =====
      case 'FlatDmgToAtks':
        if (!result.flatDmgToAtks[mod.dmgType]) {
          result.flatDmgToAtks[mod.dmgType] = { min: 0, max: 0 };
        }
        result.flatDmgToAtks[mod.dmgType]!.min += mod.value.min;
        result.flatDmgToAtks[mod.dmgType]!.max += mod.value.max;
        break;

      // ===== 法术附加点伤 =====
      case 'FlatDmgToSpells':
        if (!result.flatDmgToSpells[mod.dmgType]) {
          result.flatDmgToSpells[mod.dmgType] = { min: 0, max: 0 };
        }
        result.flatDmgToSpells[mod.dmgType]!.min += mod.value.min;
        result.flatDmgToSpells[mod.dmgType]!.max += mod.value.max;
        break;

      // ===== 召唤物伤害 =====
      case 'MinionDmgPct':
        if (mod.addn) {
          result.moreMinionDmg.push({
            value: mod.value,
            src: mod.srcDetail ?? mod.src ?? 'unknown',
          });
        } else {
          result.incMinionDmg += mod.value;
        }
        break;

      // ===== 召唤物附加点伤 =====
      case 'MinionFlatDmg':
        if (!result.flatMinionDmg[mod.dmgType]) {
          result.flatMinionDmg[mod.dmgType] = { min: 0, max: 0 };
        }
        result.flatMinionDmg[mod.dmgType]!.min += mod.value.min;
        result.flatMinionDmg[mod.dmgType]!.max += mod.value.max;
        break;

      // ===== 召唤物攻速 =====
      case 'MinionAspdPct':
        if (mod.addn) {
          result.moreMinionAspd.push({
            value: mod.value,
            src: mod.srcDetail ?? mod.src ?? 'unknown',
          });
        } else {
          result.incMinionAspd += mod.value;
        }
        break;

      // ===== 召唤物数量 =====
      case 'MinionCount':
        result.minionCount += mod.value;
        break;

      // ===== 暴击值（百分比） =====
      case 'CritRatingPct':
        if (mod.addn) {
          result.moreCritRating.push({
            value: mod.value,
            modType: mod.modType,
            src: mod.srcDetail ?? mod.src ?? 'unknown',
          });
        } else {
          result.incCritRating[mod.modType] = (result.incCritRating[mod.modType] ?? 0) + mod.value;
        }
        break;

      // ===== 暴击值（固定值） =====
      case 'FlatCritRating':
        // 固定暴击值直接加到 INC 中（等效于百分比加成的基础值）
        result.incCritRating[mod.modType] = (result.incCritRating[mod.modType] ?? 0) + mod.value;
        break;

      // ===== 暴击伤害 =====
      case 'CritDmgPct':
        if (mod.addn) {
          result.moreCritDmg.push({
            value: mod.value,
            modType: mod.modType,
            src: mod.srcDetail ?? mod.src ?? 'unknown',
          });
        } else {
          result.incCritDmg[mod.modType] = (result.incCritDmg[mod.modType] ?? 0) + mod.value;
        }
        break;

      // ===== 攻击速度 =====
      case 'AspdPct':
        if (mod.addn) {
          result.moreAspd.push({
            value: mod.value,
            src: mod.srcDetail ?? mod.src ?? 'unknown',
          });
        } else {
          result.incAspd += mod.value;
        }
        break;

      // ===== 施法速度 =====
      case 'CspdPct':
        if (mod.addn) {
          result.moreCspd.push({
            value: mod.value,
            src: mod.srcDetail ?? mod.src ?? 'unknown',
          });
        } else {
          result.incCspd += mod.value;
        }
        break;

      // ===== 伤害转化 =====
      case 'ConvertDmgPct':
        result.convertDmg.push({
          from: mod.from,
          to: mod.to,
          value: mod.value,
        });
        break;

      // ===== 抗性穿透 =====
      case 'ResPenPct':
        result.resPen[mod.penType] = (result.resPen[mod.penType] ?? 0) + mod.value;
        break;

      // ===== 护甲穿透 =====
      case 'ArmorPenPct':
        result.armorPen += mod.value;
        break;

      // ===== 双倍伤害 =====
      case 'DoubleDmgChancePct':
        if (mod.addn) {
          // More 类双倍伤害暂时简化处理
          result.doubleDmgChance += mod.value;
        } else {
          result.doubleDmgChance += mod.value;
        }
        break;

      // ===== 超载 =====
      case 'OverloadPct':
        if (mod.addn) {
          result.overloadMore.push({
            value: mod.value,
            src: mod.srcDetail ?? mod.src ?? 'unknown',
          });
        } else {
          result.overloadInc += mod.value;
        }
        break;

      // ===== 自爆 =====
      case 'ExplodeDmgPct':
        if (mod.addn) {
          result.explodeMore.push({
            value: mod.value,
            src: mod.srcDetail ?? mod.src ?? 'unknown',
          });
        } else {
          result.explodeInc += mod.value;
        }
        break;

      // ===== 主属性 =====
      case 'Stat':
        switch (mod.stat) {
          case 'str': result.totalStr += mod.value; break;
          case 'dex': result.totalDex += mod.value; break;
          case 'int': result.totalInt += mod.value; break;
        }
        break;
    }
  }

  return result;
}

function createEmptyAggregatedMods(): AggregatedMods {
  return {
    incDmg: {},
    incAspd: 0,
    incCspd: 0,
    incCritRating: {},
    incCritDmg: {},
    incMinionDmg: 0,
    incMinionAspd: 0,

    moreDmg: [],
    moreAspd: [],
    moreCspd: [],
    moreCritRating: [],
    moreCritDmg: [],
    moreMinionDmg: [],
    moreMinionAspd: [],

    flatDmgToAtks: {},
    flatDmgToSpells: {},
    flatMinionDmg: {},

    minionCount: 0,
    minionBaseCritRating: MINION_BASE_CRIT_RATING,

    convertDmg: [],
    resPen: {},
    armorPen: 0,

    doubleDmgChance: 0,

    overloadInc: 0,
    overloadMore: [],
    explodeInc: 0,
    explodeMore: [],

    totalStr: 0,
    totalDex: 0,
    totalInt: 0,
  };
}
