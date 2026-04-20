import type { DmgChunkType } from '../types/mod.ts';
import type { AggregatedMods, CalculationConfig } from '../types/calc.ts';
import { ELEMENTAL_TYPES } from '../constants/damage-types.ts';

export interface ResistanceResult {
  effectiveResistances: Record<DmgChunkType, number>;
  armorMitigation: number;
}

/**
 * 计算有效抗性和护甲减伤
 */
export function applyEnemyDefense(
  dmg: Record<DmgChunkType, number>,
  aggregated: AggregatedMods,
  config: CalculationConfig
): ResistanceResult {
  const effectiveResistances: Record<DmgChunkType, number> = {
    physical: 0,
    fire: 0,
    cold: 0,
    lightning: 0,
    erosion: 0,
  };

  const result = { ...dmg };

  // 元素伤害抗性计算
  const enemyResMap: Record<string, number> = {
    fire: config.enemyFireRes,
    cold: config.enemyColdRes,
    lightning: config.enemyLightningRes,
    erosion: config.enemyErosionRes,
  };

  for (const dmgType of ELEMENTAL_TYPES) {
    let enemyRes = enemyResMap[dmgType] ?? 0;

    // 应用穿透
    const specificPen = aggregated.resPen[dmgType] ?? 0;
    const elementalPen = aggregated.resPen['elemental'] ?? 0;
    const allPen = aggregated.resPen['all'] ?? 0;
    const totalPen = specificPen + elementalPen + allPen;

    enemyRes = Math.max(-100, enemyRes - totalPen);

    // 有效抗性 = min(当前抗性, 上限)
    const effectiveRes = Math.min(enemyRes, config.enemyResCap);
    effectiveResistances[dmgType] = effectiveRes;

    // 应用减伤
    result[dmgType] *= (1 - effectiveRes / 100);
  }

  // 腐蚀伤害抗性
  {
    let enemyRes = config.enemyErosionRes;
    const specificPen = aggregated.resPen['erosion'] ?? 0;
    const allPen = aggregated.resPen['all'] ?? 0;
    enemyRes = Math.max(-100, enemyRes - specificPen - allPen);
    const effectiveRes = Math.min(enemyRes, config.enemyResCap);
    effectiveResistances['erosion'] = effectiveRes;
    result['erosion'] *= (1 - effectiveRes / 100);
  }

  // 物理伤害受护甲减伤
  if (result['physical'] > 0) {
    const armor = config.enemyArmor;
    const armorMitigation = armor / (0.9 * armor + 30000);
    effectiveResistances['physical'] = armorMitigation * 100;

    // 护甲穿透
    const effectiveArmorMit = Math.max(0, armorMitigation - aggregated.armorPen / 100);

    // 对非物理伤害，护甲减伤只生效60%
    // 这里只处理物理伤害的护甲减伤
    result['physical'] *= (1 - effectiveArmorMit);

    return {
      effectiveResistances,
      armorMitigation: effectiveArmorMit,
    };
  }

  return { effectiveResistances, armorMitigation: 0 };
}
