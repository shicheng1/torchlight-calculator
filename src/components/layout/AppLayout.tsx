import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { getAllHeroes, getHero } from '@/data/heroes/index.ts';
import { useBuildStore } from '@/stores/build-store.ts';
import type { HeroData } from '@/engine/types/hero.ts';

interface AppLayoutProps {
  children: ReactNode;
  onImport?: () => void;
  onExport?: () => void;
  onReset?: () => void;
}

// 英雄图标映射
const HERO_ICONS: Record<string, string> = {
  moto: '🤖',
  gemma: '🔥',
  yarga: '⏳',
};

// 主属性颜色
const STAT_COLORS: Record<string, string> = {
  str: '#c8c8c8',
  dex: '#4fc3f7',
  int: '#ffd54f',
};

export function AppLayout({ children, onImport, onExport, onReset }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[#1a1a2e] text-[#eaeaea]">
      {/* 顶部导航栏 */}
      <header className="h-12 bg-[#0f3460] border-b border-[#e94560]/30 flex items-center px-4">
        <h1 className="text-lg font-bold text-[#e94560]">
          🔥 火炬之光：无限 伤害计算器
        </h1>
        <div className="ml-auto flex gap-2 text-sm">
          <button
            onClick={onImport}
            className="px-3 py-1 rounded bg-[#1a1a40] hover:bg-[#252550] transition-colors"
          >
            导入
          </button>
          <button
            onClick={onExport}
            className="px-3 py-1 rounded bg-[#1a1a40] hover:bg-[#252550] transition-colors"
          >
            导出
          </button>
          <button
            onClick={onReset}
            className="px-3 py-1 rounded bg-[#1a1a40] hover:bg-[#252550] transition-colors"
          >
            重置
          </button>
        </div>
      </header>

      {/* 主体区域 */}
      <div className="flex h-[calc(100vh-3rem)]">
        {/* 左侧英雄面板 */}
        <aside className="w-60 bg-[#16213e] border-r border-[#e94560]/20 p-4 overflow-y-auto">
          <HeroPanel />
        </aside>

        {/* 右侧内容区 */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

function HeroPanel() {
  const allHeroes = useMemo(() => getAllHeroes(), []);
  const { loadout, setHero, setLevel } = useBuildStore();
  const currentHero = getHero(loadout.hero.heroId);

  const handleHeroChange = (heroId: string) => {
    const hero = getHero(heroId);
    if (hero && hero.traits.length > 0) {
      setHero(heroId, hero.traits[0].id);
    }
  };

  const handleTraitChange = (traitId: string) => {
    setHero(loadout.hero.heroId, traitId);
  };

  const handleLevelChange = (level: number) => {
    const clamped = Math.max(1, Math.min(100, level));
    setLevel(clamped);
  };

  return (
    <div className="space-y-4">
      {/* 英雄选择下拉 */}
      <div>
        <label className="block text-xs text-[#a0a0a0] mb-1">选择英雄</label>
        <select
          value={loadout.hero.heroId}
          onChange={(e) => handleHeroChange(e.target.value)}
          className="w-full bg-[#0f3460] border border-[#e94560]/30 rounded px-2 py-1.5 text-sm
                     focus:outline-none focus:border-[#e94560] transition-colors cursor-pointer"
        >
          {allHeroes.map(hero => (
            <option key={hero.id} value={hero.id}>
              {hero.nameCN}
            </option>
          ))}
        </select>
      </div>

      {/* 英雄头像和名称 */}
      {currentHero && (
        <HeroDisplay hero={currentHero} level={loadout.hero.level} traitId={loadout.hero.traitId} />
      )}

      {/* 等级输入 */}
      <div>
        <label className="block text-xs text-[#a0a0a0] mb-1">等级</label>
        <input
          type="number"
          value={loadout.hero.level}
          onChange={(e) => handleLevelChange(Number(e.target.value))}
          min={1}
          max={100}
          className="w-full bg-[#0f3460] border border-[#e94560]/30 rounded px-2 py-1.5 text-sm font-mono
                     focus:outline-none focus:border-[#e94560] transition-colors"
        />
      </div>

      {/* 特性选择 */}
      {currentHero && currentHero.traits.length > 0 && (
        <div>
          <label className="block text-xs text-[#a0a0a0] mb-1">特性</label>
          <div className="space-y-1">
            {currentHero.traits.map(trait => (
              <button
                key={trait.id}
                onClick={() => handleTraitChange(trait.id)}
                className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors ${
                  loadout.hero.traitId === trait.id
                    ? 'bg-[#e94560]/20 border border-[#e94560]/50 text-[#e94560]'
                    : 'bg-[#0f3460]/50 border border-transparent hover:border-[#e94560]/30 text-[#c8c8c8]'
                }`}
              >
                <div className="font-medium">{trait.nameCN}</div>
                <div className="text-[10px] text-[#a0a0a0] mt-0.5 line-clamp-2">{trait.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function HeroDisplay({ hero, level, traitId }: { hero: HeroData; level: number; traitId: string }) {
  const icon = HERO_ICONS[hero.id] ?? '⭐';

  // 根据等级动态计算属性
  const effectiveLevel = Math.max(1, level);
  const totalStr = hero.baseStr + hero.strPerLevel * (effectiveLevel - 1);
  const totalDex = hero.baseDex + hero.dexPerLevel * (effectiveLevel - 1);
  const totalInt = hero.baseInt + hero.intPerLevel * (effectiveLevel - 1);
  const totalLife = hero.baseLife + hero.lifePerLevel * (effectiveLevel - 1);
  const totalMana = hero.baseMana + hero.manaPerLevel * (effectiveLevel - 1);

  // 当前选中的特性
  const currentTrait = hero.traits.find(t => t.id === traitId);

  return (
    <div className="space-y-3">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#0f3460] border-2 border-[#e94560]/50 flex items-center justify-center text-3xl">
          {icon}
        </div>
        <h2 className="mt-2 text-base font-bold">{hero.nameCN}</h2>
        {currentTrait && (
          <p className="text-xs text-[#e94560] font-medium mt-1">{currentTrait.nameCN}</p>
        )}
      </div>

      {/* 特性描述 */}
      {currentTrait && (
        <div className="bg-[#0f3460]/50 rounded-lg p-3 border border-[#e94560]/20">
          <div className="text-xs text-[#eaeaea] leading-relaxed">{currentTrait.description}</div>
        </div>
      )}

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-[#a0a0a0]">等级</span>
          <span className="font-mono">{effectiveLevel}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#a0a0a0]">力量</span>
          <span className="font-mono" style={{ color: STAT_COLORS.str }}>{totalStr}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#a0a0a0]">敏捷</span>
          <span className="font-mono" style={{ color: STAT_COLORS.dex }}>{totalDex}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#a0a0a0]">智慧</span>
          <span className="font-mono" style={{ color: STAT_COLORS.int }}>{totalInt}</span>
        </div>
        <div className="border-t border-[#e94560]/10 pt-2">
          <div className="flex justify-between">
            <span className="text-[#a0a0a0]">生命</span>
            <span className="font-mono text-[#4caf50]">{totalLife}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#a0a0a0]">魔力</span>
            <span className="font-mono text-[#42a5f5]">{totalMana}</span>
          </div>
        </div>
      </div>

      {/* 武器类型 */}
      <div className="text-xs text-[#a0a0a0]">
        <span>可用武器：</span>
        <span className="text-[#c8c8c8]">{hero.weaponTypes.join('、')}</span>
      </div>
    </div>
  );
}
