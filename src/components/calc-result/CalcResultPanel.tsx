import { useCalculation } from '@/hooks/useCalculation.ts';
import { formatDPS, formatPercent, formatMultiplier } from '@/utils/format.ts';
import { DMG_TYPE_COLORS, DMG_TYPE_NAMES } from '@/engine/constants/damage-types.ts';
import type { DmgChunkType } from '@/engine/types/mod.ts';
import { useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// 注册Chart.js组件
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export function CalcResultPanel() {
  const result = useCalculation();
  const [activeTab, setActiveTab] = useState('overview');

  // 准备伤害类型数据
  const damageTypes = (['physical', 'fire', 'cold', 'lightning', 'erosion'] as DmgChunkType[]).filter(type => {
    const detail = result.damageBreakdown[type];
    return detail && detail.finalHitDamage > 0;
  });

  const chartData = {
    labels: damageTypes.map(type => DMG_TYPE_NAMES[type]),
    datasets: [
      {
        data: damageTypes.map(type => result.damageBreakdown[type].finalHitDamage),
        backgroundColor: damageTypes.map(type => DMG_TYPE_COLORS[type]),
        borderColor: damageTypes.map(type => DMG_TYPE_COLORS[type]),
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: ['总DPS', '暴击率', '暴击伤害', '攻速'],
    datasets: [
      {
        label: '数值',
        data: [
          result.totalDPS,
          result.critChance * 100,
          (result.critMultiplier - 1) * 100,
          result.attacksPerSecond
        ],
        backgroundColor: [
          '#e94560',
          '#4fc3f7',
          '#ffd54f',
          '#4ade80'
        ],
        borderColor: [
          '#e94560',
          '#4fc3f7',
          '#ffd54f',
          '#4ade80'
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#a0a0a0',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw as number;
            return `${label}: ${formatDPS(value)}`;
          }
        }
      }
    }
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw as number;
            if (label === '总DPS') return `${label}: ${formatDPS(value)}`;
            if (label === '攻速') return `${label}: ${value.toFixed(2)}/s`;
            return `${label}: ${value.toFixed(1)}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#a0a0a0'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#a0a0a0'
        }
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0f3460] to-[#16213e] rounded-xl p-5 border border-[#e94560]/20 shadow-lg shadow-[#000]/30">
      {/* 总 DPS */}
      <div className="text-center mb-6">
        <div className="text-xs text-[#a0a0a0] uppercase tracking-wider mb-1">总 DPS</div>
        <div className="text-3xl font-bold font-mono text-[#e94560] damage-number">
          {formatDPS(result.totalDPS)}
        </div>
        {result.minionDetail && (
          <div className="text-sm text-[#a0a0a0] mt-1">
            召唤物: {formatDPS(result.minionDetail.totalMinionDPS)}
          </div>
        )}
      </div>

      {/* 标签切换 */}
      <div className="flex mb-4 border-b border-[#e94560]/20">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-sm transition-colors relative ${
            activeTab === 'overview'
              ? 'text-[#e94560] font-medium'
              : 'text-[#a0a0a0] hover:text-[#eaeaea]'
          }`}
        >
          概览
          {activeTab === 'overview' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e94560]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('chart')}
          className={`px-4 py-2 text-sm transition-colors relative ${
            activeTab === 'chart'
              ? 'text-[#e94560] font-medium'
              : 'text-[#a0a0a0] hover:text-[#eaeaea]'
          }`}
        >
          图表
          {activeTab === 'chart' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e94560]" />
          )}
        </button>
      </div>

      {/* 内容区域 */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* 核心属性 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#1a1a40] rounded-lg p-3 border border-[#e94560]/20">
              <div className="text-xs text-[#a0a0a0] mb-1">暴击率</div>
              <div className="font-mono text-lg number-animate">{formatPercent(result.critChance)}</div>
            </div>
            <div className="bg-[#1a1a40] rounded-lg p-3 border border-[#e94560]/20">
              <div className="text-xs text-[#a0a0a0] mb-1">暴击伤害</div>
              <div className="font-mono text-lg number-animate">{formatMultiplier(result.critMultiplier)}</div>
            </div>
            <div className="bg-[#1a1a40] rounded-lg p-3 border border-[#e94560]/20">
              <div className="text-xs text-[#a0a0a0] mb-1">攻速</div>
              <div className="font-mono text-lg number-animate">{result.attacksPerSecond.toFixed(2)}/s</div>
            </div>
            <div className="bg-[#1a1a40] rounded-lg p-3 border border-[#e94560]/20">
              <div className="text-xs text-[#a0a0a0] mb-1">期望系数</div>
              <div className="font-mono text-lg number-animate">{result.expectedCritDamage.toFixed(2)}</div>
            </div>
          </div>

          {/* 伤害类型分解 */}
          <div className="border-t border-[#e94560]/20 pt-3">
            <div className="text-xs text-[#a0a0a0] uppercase tracking-wider mb-2">伤害分解</div>
            <div className="space-y-2">
              {damageTypes.map(type => {
                const detail = result.damageBreakdown[type];
                return (
                  <div key={type} className="flex items-center justify-between text-sm">
                    <span style={{ color: DMG_TYPE_COLORS[type] }} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: DMG_TYPE_COLORS[type] }}></div>
                      {DMG_TYPE_NAMES[type]}
                    </span>
                    <span className="font-mono">{formatDPS(detail.finalHitDamage)}</span>
                  </div>
                );
              })}
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
                {result.minionDetail.explodeDamage > 0 && (
                  <div className="flex justify-between col-span-2">
                    <span className="text-[#a0a0a0]">自爆伤害</span>
                    <span className="font-mono text-[#ff6b35]">{formatDPS(result.minionDetail.explodeDamage)}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'chart' && (
        <div className="space-y-6">
          {/* 伤害类型饼图 */}
          <div>
            <div className="text-xs text-[#a0a0a0] uppercase tracking-wider mb-3">伤害类型分布</div>
            <div className="h-64">
              {damageTypes.length > 0 ? (
                <Pie data={chartData} options={chartOptions} />
              ) : (
                <div className="h-full flex items-center justify-center text-[#a0a0a0]">
                  无伤害数据
                </div>
              )}
            </div>
          </div>

          {/* 核心属性条形图 */}
          <div>
            <div className="text-xs text-[#a0a0a0] uppercase tracking-wider mb-3">核心属性</div>
            <div className="h-64">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
