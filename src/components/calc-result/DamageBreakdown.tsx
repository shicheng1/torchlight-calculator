import { useState } from 'react';
import { useCalculation } from '@/hooks/useCalculation.ts';
import { useUIStore } from '@/stores/ui-store.ts';
import { formatDPS, formatPercent, formatMultiplier } from '@/utils/format.ts';
import { DMG_TYPE_COLORS, DMG_TYPE_NAMES, DMG_MOD_TYPE_NAMES, DMG_CHUNK_TYPES } from '@/engine/constants/damage-types.ts';
import type { DmgChunkType, DmgModType } from '@/engine/types/mod.ts';

export function DamageBreakdown() {
  const result = useCalculation();
  const show = useUIStore((s) => s.showDamageBreakdown);
  const toggle = useUIStore((s) => s.toggleDamageBreakdown);

  return (
    <div className="border-t border-[#e94560]/20 pt-3 mt-3">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between text-xs text-[#a0a0a0] uppercase tracking-wider hover:text-[#eaeaea] transition-colors"
      >
        <span>伤害分解详情</span>
        <span>{show ? '收起' : '展开'}</span>
      </button>

      {show && (
        <div className="mt-3 space-y-3">
          {/* 伤害类型构成分析 */}
          <DamageTypeSection />

          {/* INC 增伤来源 */}
          <IncBreakdownSection />

          {/* More 增伤来源 */}
          <MoreBreakdownSection />

          {/* 暴击期望 */}
          <CritSection />

          {/* 抗性穿透 */}
          <ResistanceSection />

          {/* 召唤物详情 */}
          {result.minionDetail && <MinionSection />}
        </div>
      )}
    </div>
  );
}

function IncBreakdownSection() {
  const result = useCalculation();
  const [expanded, setExpanded] = useState(true);

  if (result.incBreakdown.length === 0) {
    return (
      <div className="text-xs text-[#a0a0a0]">
        <div className="font-medium text-[#eaeaea] mb-1">INC 增伤来源</div>
        <div>无 INC 增伤</div>
      </div>
    );
  }

  return (
    <div className="text-xs">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full font-medium text-[#eaeaea] mb-1"
      >
        <span>INC 增伤来源</span>
        <span className="text-[#a0a0a0]">{expanded ? '-' : '+'}</span>
      </button>
      {expanded && (
        <div className="space-y-1 pl-2">
          {result.incBreakdown.map((inc, i) => (
            <div key={i}>
              <div className="flex justify-between">
                <span style={{ color: '#4fc3f7' }}>
                  {DMG_MOD_TYPE_NAMES[inc.modType as DmgModType] ?? inc.modType}
                </span>
                <span className="font-mono text-[#eaeaea]">+{inc.total.toFixed(0)}%</span>
              </div>
              <div className="pl-3 space-y-0.5 mt-0.5">
                {inc.sources.map((src, j) => (
                  <div key={j} className="flex justify-between text-[#a0a0a0]">
                    <span>{src.detail ?? src.src}</span>
                    <span className="font-mono">+{src.value.toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MoreBreakdownSection() {
  const result = useCalculation();
  const [expanded, setExpanded] = useState(true);

  if (result.moreBreakdown.length === 0) {
    return (
      <div className="text-xs text-[#a0a0a0]">
        <div className="font-medium text-[#eaeaea] mb-1">More 增伤来源</div>
        <div>无 More 增伤</div>
      </div>
    );
  }

  const totalMore = result.moreBreakdown.reduce((sum, m) => sum + m.value, 0);

  return (
    <div className="text-xs">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full font-medium text-[#eaeaea] mb-1"
      >
        <span>More 增伤来源</span>
        <span className="text-[#a0a0a0]">{expanded ? '-' : '+'}</span>
      </button>
      {expanded && (
        <div className="space-y-0.5 pl-2">
          {result.moreBreakdown.map((more, i) => (
            <div key={i} className="flex justify-between">
              <span className="text-[#a0a0a0]">
                {more.detail ?? more.src}
                <span className="ml-1 text-[#3a3a5a]">
                  ({DMG_MOD_TYPE_NAMES[more.modType] ?? more.modType})
                </span>
              </span>
              <span className="font-mono text-[#ffd54f]">x{((100 + more.value) / 100).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between pt-1 border-t border-[#3a3a5a]">
            <span className="text-[#eaeaea]">More 总乘区</span>
            <span className="font-mono text-[#e94560]">
              x{((100 + totalMore) / 100).toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function CritSection() {
  const result = useCalculation();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="text-xs">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full font-medium text-[#eaeaea] mb-1"
      >
        <span>暴击期望</span>
        <span className="text-[#a0a0a0]">{expanded ? '-' : '+'}</span>
      </button>
      {expanded && (
        <div className="space-y-0.5 pl-2 text-[#a0a0a0]">
          <div className="flex justify-between">
            <span>暴击率</span>
            <span className="font-mono text-[#eaeaea]">{formatPercent(result.critChance)}</span>
          </div>
          <div className="flex justify-between">
            <span>暴击倍率</span>
            <span className="font-mono text-[#eaeaea]">{formatMultiplier(result.critMultiplier)}</span>
          </div>
          <div className="flex justify-between">
            <span>暴击期望系数</span>
            <span className="font-mono text-[#ffd54f]">{result.expectedCritDamage.toFixed(3)}</span>
          </div>
          <div className="text-[#3a3a5a] mt-1">
            = (1 - {formatPercent(result.critChance)}) x 1 + {formatPercent(result.critChance)} x {formatMultiplier(result.critMultiplier)}
          </div>
        </div>
      )}
    </div>
  );
}

function ResistanceSection() {
  const result = useCalculation();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="text-xs">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full font-medium text-[#eaeaea] mb-1"
      >
        <span>有效抗性</span>
        <span className="text-[#a0a0a0]">{expanded ? '-' : '+'}</span>
      </button>
      {expanded && (
        <div className="space-y-0.5 pl-2">
          {(['physical', 'fire', 'cold', 'lightning', 'erosion'] as DmgChunkType[]).map(type => (
            <div key={type} className="flex justify-between">
              <span style={{ color: DMG_TYPE_COLORS[type] }}>
                {DMG_TYPE_NAMES[type]}
              </span>
              <span className="font-mono text-[#eaeaea]">
                {result.effectiveResistances[type].toFixed(1)}%
              </span>
            </div>
          ))}
          <div className="flex justify-between pt-1 border-t border-[#3a3a5a]">
            <span className="text-[#a0a0a0]">护甲减伤</span>
            <span className="font-mono text-[#eaeaea]">
              {formatPercent(result.armorMitigation)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function MinionSection() {
  const result = useCalculation();
  const [expanded, setExpanded] = useState(false);
  const detail = result.minionDetail;
  if (!detail) return null;

  return (
    <div className="text-xs">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full font-medium text-[#eaeaea] mb-1"
      >
        <span>召唤物计算过程</span>
        <span className="text-[#a0a0a0]">{expanded ? '-' : '+'}</span>
      </button>
      {expanded && (
        <div className="space-y-0.5 pl-2 text-[#a0a0a0]">
          <div className="flex justify-between">
            <span>召唤物数量</span>
            <span className="font-mono text-[#eaeaea]">{detail.minionCount}</span>
          </div>
          <div className="flex justify-between">
            <span>单体攻速</span>
            <span className="font-mono text-[#eaeaea]">{detail.minionAttackSpeed.toFixed(2)}/s</span>
          </div>
          <div className="flex justify-between">
            <span>基础伤害</span>
            <span className="font-mono text-[#eaeaea]">{formatDPS(detail.minionBaseDamage)}</span>
          </div>
          <div className="flex justify-between">
            <span>INC 增伤</span>
            <span className="font-mono text-[#4fc3f7]">+{detail.minionIncTotal.toFixed(0)}%</span>
          </div>
          {detail.minionMoreMultipliers.length > 0 && (
            <div className="pl-3 space-y-0.5">
              {detail.minionMoreMultipliers.map((m, i) => (
                <div key={i} className="flex justify-between">
                  <span>{m.src}</span>
                  <span className="font-mono text-[#ffd54f]">x{((100 + m.value) / 100).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-between">
            <span>暴击率</span>
            <span className="font-mono text-[#eaeaea]">{formatPercent(detail.minionCritChance)}</span>
          </div>
          <div className="flex justify-between">
            <span>暴击倍率</span>
            <span className="font-mono text-[#eaeaea]">{formatMultiplier(detail.minionCritMultiplier)}</span>
          </div>
          <div className="flex justify-between">
            <span>期望单次伤害</span>
            <span className="font-mono text-[#e94560]">{formatDPS(detail.minionExpectedDamage)}</span>
          </div>
          {detail.explodeDamage > 0 && (
            <div className="flex justify-between">
              <span>自爆伤害</span>
              <span className="font-mono text-[#ff6b35]">{formatDPS(detail.explodeDamage)}</span>
            </div>
          )}
          <div className="flex justify-between pt-1 border-t border-[#3a3a5a]">
            <span className="text-[#eaeaea]">总召唤物DPS</span>
            <span className="font-mono text-[#e94560]">{formatDPS(detail.totalMinionDPS)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
