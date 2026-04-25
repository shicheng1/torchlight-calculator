import type { Mod, DmgPctMod, FlatDmgToAtksMod, FlatDmgToSpellsMod, MinionDmgPctMod, MinionFlatDmgMod, MinionAspdPctMod, MinionCountMod, CritRatingPctMod, FlatCritRatingMod, CritDmgPctMod, AspdPctMod, CspdPctMod, ConvertDmgPctMod, ResPenPctMod, ArmorPenPctMod, DoubleDmgChanceMod, OverloadPctMod, ExplodeDmgPctMod, StatMod, AilmentChancePctMod, AilmentDurationPctMod, AilmentEffectPctMod } from '../types/mod.ts';
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
      case 'DmgPct': {
        const dmgMod = mod as DmgPctMod;
        if (dmgMod.addn) {
          // More 类：独立保留
          result.moreDmg.push({
            value: dmgMod.value,
            modType: dmgMod.dmgModType,
            src: dmgMod.srcDetail ?? dmgMod.src ?? 'unknown',
          });
        } else {
          // INC 类：同类相加
          result.incDmg[dmgMod.dmgModType] = (result.incDmg[dmgMod.dmgModType] ?? 0) + dmgMod.value;
        }
        break;
      }

      // ===== 攻击附加点伤 =====
      case 'FlatDmgToAtks': {
        const flatMod = mod as FlatDmgToAtksMod;
        if (!result.flatDmgToAtks[flatMod.dmgType]) {
          result.flatDmgToAtks[flatMod.dmgType] = { min: 0, max: 0 };
        }
        result.flatDmgToAtks[flatMod.dmgType]!.min += flatMod.value.min;
        result.flatDmgToAtks[flatMod.dmgType]!.max += flatMod.value.max;
        break;
      }

      // ===== 法术附加点伤 =====
      case 'FlatDmgToSpells': {
        const flatMod = mod as FlatDmgToSpellsMod;
        if (!result.flatDmgToSpells[flatMod.dmgType]) {
          result.flatDmgToSpells[flatMod.dmgType] = { min: 0, max: 0 };
        }
        result.flatDmgToSpells[flatMod.dmgType]!.min += flatMod.value.min;
        result.flatDmgToSpells[flatMod.dmgType]!.max += flatMod.value.max;
        break;
      }

      // ===== 召唤物伤害 =====
      case 'MinionDmgPct': {
        const minionMod = mod as MinionDmgPctMod;
        if (minionMod.addn) {
          result.moreMinionDmg.push({
            value: minionMod.value,
            src: minionMod.srcDetail ?? minionMod.src ?? 'unknown',
          });
        } else {
          result.incMinionDmg += minionMod.value;
        }
        break;
      }

      // ===== 召唤物附加点伤 =====
      case 'MinionFlatDmg': {
        const minionMod = mod as MinionFlatDmgMod;
        if (!result.flatMinionDmg[minionMod.dmgType]) {
          result.flatMinionDmg[minionMod.dmgType] = { min: 0, max: 0 };
        }
        result.flatMinionDmg[minionMod.dmgType]!.min += minionMod.value.min;
        result.flatMinionDmg[minionMod.dmgType]!.max += minionMod.value.max;
        break;
      }

      // ===== 召唤物攻速 =====
      case 'MinionAspdPct': {
        const minionMod = mod as MinionAspdPctMod;
        if (minionMod.addn) {
          result.moreMinionAspd.push({
            value: minionMod.value,
            src: minionMod.srcDetail ?? minionMod.src ?? 'unknown',
          });
        } else {
          result.incMinionAspd += minionMod.value;
        }
        break;
      }

      // ===== 召唤物数量 =====
      case 'MinionCount': {
        const minionMod = mod as MinionCountMod;
        result.minionCount += minionMod.value;
        break;
      }

      // ===== 暴击值（百分比） =====
      case 'CritRatingPct': {
        const critMod = mod as CritRatingPctMod;
        if (critMod.addn) {
          result.moreCritRating.push({
            value: critMod.value,
            modType: critMod.modType,
            src: critMod.srcDetail ?? critMod.src ?? 'unknown',
          });
        } else {
          result.incCritRating[critMod.modType] = (result.incCritRating[critMod.modType] ?? 0) + critMod.value;
        }
        break;
      }

      // ===== 暴击值（固定值） =====
      case 'FlatCritRating': {
        const critMod = mod as FlatCritRatingMod;
        result.flatCritRating[critMod.modType] = (result.flatCritRating[critMod.modType] ?? 0) + critMod.value;
        break;
      }

      // ===== 暴击伤害 =====
      case 'CritDmgPct': {
        const critMod = mod as CritDmgPctMod;
        if (critMod.addn) {
          result.moreCritDmg.push({
            value: critMod.value,
            modType: critMod.modType,
            src: critMod.srcDetail ?? critMod.src ?? 'unknown',
          });
        } else {
          result.incCritDmg[critMod.modType] = (result.incCritDmg[critMod.modType] ?? 0) + critMod.value;
        }
        break;
      }

      // ===== 攻击速度 =====
      case 'AspdPct': {
        const aspdMod = mod as AspdPctMod;
        if (aspdMod.addn) {
          result.moreAspd.push({
            value: aspdMod.value,
            src: aspdMod.srcDetail ?? aspdMod.src ?? 'unknown',
          });
        } else {
          result.incAspd += aspdMod.value;
        }
        break;
      }

      // ===== 施法速度 =====
      case 'CspdPct': {
        const cspdMod = mod as CspdPctMod;
        if (cspdMod.addn) {
          result.moreCspd.push({
            value: cspdMod.value,
            src: cspdMod.srcDetail ?? cspdMod.src ?? 'unknown',
          });
        } else {
          result.incCspd += cspdMod.value;
        }
        break;
      }

      // ===== 伤害转化 =====
      case 'ConvertDmgPct': {
        const convertMod = mod as ConvertDmgPctMod;
        result.convertDmg.push({
          from: convertMod.from,
          to: convertMod.to,
          value: convertMod.value,
        });
        break;
      }

      // ===== 抗性穿透 =====
      case 'ResPenPct': {
        const penMod = mod as ResPenPctMod;
        result.resPen[penMod.penType] = (result.resPen[penMod.penType] ?? 0) + penMod.value;
        break;
      }

      // ===== 护甲穿透 =====
      case 'ArmorPenPct': {
        const penMod = mod as ArmorPenPctMod;
        result.armorPen += penMod.value;
        break;
      }

      // ===== 双倍伤害 =====
      case 'DoubleDmgChancePct': {
        const doubleMod = mod as DoubleDmgChanceMod;
        result.doubleDmgChance += doubleMod.value;
        break;
      }

      // ===== 超载 =====
      case 'OverloadPct': {
        const overloadMod = mod as OverloadPctMod;
        if (overloadMod.addn) {
          result.overloadMore.push({
            value: overloadMod.value,
            src: overloadMod.srcDetail ?? overloadMod.src ?? 'unknown',
          });
        } else {
          result.overloadInc += overloadMod.value;
        }
        break;
      }

      // ===== 自爆 =====
      case 'ExplodeDmgPct': {
        const explodeMod = mod as ExplodeDmgPctMod;
        if (explodeMod.addn) {
          result.explodeMore.push({
            value: explodeMod.value,
            src: explodeMod.srcDetail ?? explodeMod.src ?? 'unknown',
          });
        } else {
          result.explodeInc += explodeMod.value;
        }
        break;
      }

      // ===== 主属性 =====
      case 'Stat': {
        const statMod = mod as StatMod;
        switch (statMod.stat) {
          case 'str': result.totalStr += statMod.value; break;
          case 'dex': result.totalDex += statMod.value; break;
          case 'int': result.totalInt += statMod.value; break;
        }
        break;
      }

      // ===== 异常状态触发几率 =====
      case 'AilmentChancePct': {
        const ailmentMod = mod as AilmentChancePctMod;
        const ailmentType = ailmentMod.ailmentType || 'all';
        if (ailmentMod.addn) {
          result.moreAilmentChance.push({
            value: ailmentMod.value,
            ailmentType,
            src: ailmentMod.srcDetail ?? ailmentMod.src ?? 'unknown',
          });
        } else {
          result.incAilmentChance[ailmentType] = (result.incAilmentChance[ailmentType] ?? 0) + ailmentMod.value;
        }
        break;
      }

      // ===== 异常状态持续时间 =====
      case 'AilmentDurationPct': {
        const ailmentMod = mod as AilmentDurationPctMod;
        const ailmentType = ailmentMod.ailmentType || 'all';
        if (ailmentMod.addn) {
          result.moreAilmentDuration.push({
            value: ailmentMod.value,
            ailmentType,
            src: ailmentMod.srcDetail ?? ailmentMod.src ?? 'unknown',
          });
        } else {
          result.incAilmentDuration[ailmentType] = (result.incAilmentDuration[ailmentType] ?? 0) + ailmentMod.value;
        }
        break;
      }

      // ===== 异常状态效果 =====
      case 'AilmentEffectPct': {
        const ailmentMod = mod as AilmentEffectPctMod;
        const ailmentType = ailmentMod.ailmentType || 'all';
        if (ailmentMod.addn) {
          result.moreAilmentEffect.push({
            value: ailmentMod.value,
            ailmentType,
            src: ailmentMod.srcDetail ?? ailmentMod.src ?? 'unknown',
          });
        } else {
          result.incAilmentEffect[ailmentType] = (result.incAilmentEffect[ailmentType] ?? 0) + ailmentMod.value;
        }
        break;
      }
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
    flatCritRating: {},

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

    // 异常状态
    incAilmentChance: {},
    moreAilmentChance: [],
    incAilmentDuration: {},
    moreAilmentDuration: [],
    incAilmentEffect: {},
    moreAilmentEffect: [],
  };
}
