import type { DmgChunkType } from '../types/mod.ts';
import { CONVERSION_ORDER } from '../constants/damage-types.ts';

/**
 * 应用伤害转化
 * 转化顺序固定：物理 → 闪电 → 冰冷 → 火焰 → 腐蚀
 * 转化上限 100%，超出部分无效
 * 转化后同时享受来源和目标类型的 INC 加成
 */
export function applyDamageConversion(
  chunks: Record<DmgChunkType, number>,
  conversions: { from: DmgChunkType; to: DmgChunkType; value: number }[]
): {
  result: Record<DmgChunkType, number>;
  conversionDetails: { from: DmgChunkType; to: DmgChunkType; amount: number }[];
} {
  const result = { ...chunks };
  const conversionDetails: { from: DmgChunkType; to: DmgChunkType; amount: number }[] = [];

  for (const fromType of CONVERSION_ORDER) {
    // 收集从该类型转出的所有转化
    const fromConversions = conversions.filter(c => c.from === fromType);
    if (fromConversions.length === 0) continue;

    // 计算总转化百分比，上限 100%
    const totalConvertPct = Math.min(100,
      fromConversions.reduce((sum, c) => sum + c.value, 0)
    );

    if (totalConvertPct <= 0 || result[fromType] <= 0) continue;

    const amount = result[fromType] * (totalConvertPct / 100);
    result[fromType] -= amount;

    // 按比例分配到各目标类型
    for (const conv of fromConversions) {
      const share = (conv.value / totalConvertPct) * amount;
      result[conv.to] += share;
      conversionDetails.push({
        from: fromType,
        to: conv.to,
        amount: share,
      });
    }
  }

  return { result, conversionDetails };
}
