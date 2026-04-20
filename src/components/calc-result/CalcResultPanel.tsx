import { useCalculation } from '@/hooks/useCalculation.ts';
import { formatDPS, formatPercent, formatMultiplier } from '@/utils/format.ts';
import { DMG_TYPE_COLORS, DMG_TYPE_NAMES } from '@/engine/constants/damage-types.ts';
import type { DmgChunkType } from '@/engine/types/mod.ts';

export function CalcResultPanel() {
  const result = useCalculation();

  return (
    <div className="bg-[#0f3460] rounded-lg p-4 space-y-3">
      {/* 总 DPS */}
      <div className="text-center">
        <div className="text-xs text-[#a0a0a0] uppercase tracking-wider">总 DPS</div>
        <div className="text-3xl font-bold font-mono text-[#e94560]">
          {formatDPS(result.totalDPS)}
        </div>
      </div>

      {/* 核心属性 */}
      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        <div>
          <div className="text-xs text-[#a0a0a0]">暴击率</div>
          <div className="font-mono">{formatPercent(result.critChance)}</div>
        </div>
        <div>
          <div className="text-xs text-[#a0a0a0]">暴击伤害</div>
          <div className="font-mono">{formatMultiplier(result.critMultiplier)}</div>
        </div>
        <div>
          <div className="text-xs text-[#a0a0a0]">攻速</div>
          <div className="font-mono">{result.attacksPerSecond.toFixed(2)}/s</div>
        </div>
      </div>

      {/* 召唤物详情 */}
      {result.minionDetail && (
        <div className="border-t border-[#e94560]/20 pt-3">
          <div className="text-xs text-[#a0a0a0] uppercase tracking-wider mb-2">召唤物详情</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#a0a0a0]">数量</span>
              <span className="font-mono">{result.minionDetail.minionCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#a0a0a0]">攻速</span>
              <span className="font-mono">{result.minionDetail.minionAttackSpeed.toFixed(2)}/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#a0a0a0]">暴击率</span>
              <span className="font-mono">{formatPercent(result.minionDetail.minionCritChance)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#a0a0a0]">暴击伤害</span>
              <span className="font-mono">{formatMultiplier(result.minionDetail.minionCritMultiplier)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#a0a0a0]">INC增伤</span>
              <span className="font-mono">{result.minionDetail.minionIncTotal.toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#a0a0a0]">More数量</span>
              <span className="font-mono">{result.minionDetail.minionMoreMultipliers.length}</span>
            </div>
          </div>
          {result.minionDetail.explodeDamage > 0 && (
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-[#a0a0a0]">自爆伤害</span>
              <span className="font-mono text-[#ff6b35]">{formatDPS(result.minionDetail.explodeDamage)}</span>
            </div>
          )}
        </div>
      )}

      {/* 伤害类型分解 */}
      <div className="border-t border-[#e94560]/20 pt-3">
        <div className="text-xs text-[#a0a0a0] uppercase tracking-wider mb-2">伤害分解</div>
        <div className="space-y-1">
          {(['physical', 'fire', 'cold', 'lightning', 'erosion'] as DmgChunkType[]).map(type => {
            const detail = result.damageBreakdown[type];
            if (!detail || detail.finalHitDamage <= 0) return null;
            return (
              <div key={type} className="flex justify-between text-sm">
                <span style={{ color: DMG_TYPE_COLORS[type] }}>
                  {DMG_TYPE_NAMES[type]}
                </span>
                <span className="font-mono">{formatDPS(detail.finalHitDamage)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
