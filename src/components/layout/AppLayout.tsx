import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { getAllHeroes, getHero } from '@/data/heroes/index.ts';
import { useBuildStore } from '@/stores/build-store.ts';
import type { HeroData } from '@/engine/types/hero.ts';
import HelpSystem from '@/components/common/HelpSystem.tsx';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-[#eaeaea]">
      {/* 顶部导航栏 */}
      <header className="h-14 bg-gradient-to-r from-[#0f3460] to-[#16213e] border-b border-[#e94560]/30 flex items-center px-4 shadow-lg shadow-[#000]/30">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🔥</div>
          <h1 className="text-lg font-bold text-[#e94560] tracking-wide">
            火炬之光：无限 伤害计算器
          </h1>
        </div>
        <div className="ml-auto flex gap-3 text-sm">
          <button
            onClick={onImport}
            className="px-4 py-2 rounded-lg bg-[#1a1a40] hover:bg-[#252550] transition-all duration-200 shadow-md shadow-[#000]/20 hover:shadow-lg hover:shadow-[#000]/30"
          >
            导入
          </button>
          <button
            onClick={onExport}
            className="px-4 py-2 rounded-lg bg-[#1a1a40] hover:bg-[#252550] transition-all duration-200 shadow-md shadow-[#000]/20 hover:shadow-lg hover:shadow-[#000]/30"
          >
            导出
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-lg bg-[#e94560] hover:bg-[#d63850] text-white transition-all duration-200 shadow-md shadow-[#e94560]/20 hover:shadow-lg hover:shadow-[#e94560]/30"
          >
            重置
          </button>
          <button
            onClick={() => setIsHelpOpen(true)}
            className="px-4 py-2 rounded-lg bg-[#1a1a40] hover:bg-[#252550] transition-all duration-200 shadow-md shadow-[#000]/20 hover:shadow-lg hover:shadow-[#000]/30"
          >
            帮助
          </button>
          {/* 移动端菜单按钮 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden px-3 py-1.5 rounded-lg bg-[#1a1a40] hover:bg-[#252550] transition-colors"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* 主体区域 */}
      <div className="flex min-h-[calc(100vh-3.5rem)]">
        {/* 左侧英雄面板 - 移动端可折叠 */}
        <aside className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-64 bg-[#16213e] border-r border-[#e94560]/20 p-4 overflow-y-auto transition-all duration-300 shadow-lg shadow-[#000]/30 z-10`}>
          <HeroPanel />
        </aside>

        {/* 右侧内容区 */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {children}
        </main>
      </div>
      
      {/* 帮助系统 */}
      <HelpSystem isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
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
    <div className="space-y-5">
      {/* 英雄选择下拉 */}
      <div className="bg-[#0f3460]/80 rounded-lg p-4 border border-[#e94560]/20 shadow-md">
        <label className="block text-xs text-[#a0a0a0] mb-2 font-medium">选择英雄</label>
        <select
          value={loadout.hero.heroId}
          onChange={(e) => handleHeroChange(e.target.value)}
          className="w-full bg-[#1a1a40] border border-[#e94560]/30 rounded-lg px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-[#e94560]/50 focus:border-transparent transition-all cursor-pointer"
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
      <div className="bg-[#0f3460]/80 rounded-lg p-4 border border-[#e94560]/20 shadow-md">
        <label className="block text-xs text-[#a0a0a0] mb-2 font-medium">等级</label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={loadout.hero.level}
            onChange={(e) => handleLevelChange(Number(e.target.value))}
            min={1}
            max={100}
            className="flex-1 bg-[#1a1a40] border border-[#e94560]/30 rounded-lg px-3 py-2 text-sm font-mono
                     focus:outline-none focus:ring-2 focus:ring-[#e94560]/50 focus:border-transparent transition-all"
          />
          <div className="text-xs text-[#a0a0a0] whitespace-nowrap">1-100</div>
        </div>
      </div>

      {/* 特性选择 */}
      {currentHero && currentHero.traits.length > 0 && (
        <div className="bg-[#0f3460]/80 rounded-lg p-4 border border-[#e94560]/20 shadow-md">
          <label className="block text-xs text-[#a0a0a0] mb-2 font-medium">特性</label>
          <div className="space-y-2">
            {currentHero.traits.map(trait => (
              <button
                key={trait.id}
                onClick={() => handleTraitChange(trait.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                  loadout.hero.traitId === trait.id
                    ? 'bg-[#e94560]/20 border border-[#e94560]/50 text-[#e94560] shadow-sm shadow-[#e94560]/10'
                    : 'bg-[#1a1a40] border border-transparent hover:border-[#e94560]/30 text-[#c8c8c8] hover:bg-[#252550]'
                }`}
              >
                <div className="font-medium">{trait.nameCN}</div>
                <div className="text-[10px] text-[#a0a0a0] mt-1 line-clamp-2">{trait.description}</div>
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
    <div className="bg-[#0f3460]/80 rounded-lg p-5 border border-[#e94560]/20 shadow-md">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#0f3460] to-[#1a1a40] border-2 border-[#e94560]/50 flex items-center justify-center text-4xl shadow-lg shadow-[#000]/30">
          {icon}
        </div>
        <h2 className="mt-3 text-lg font-bold">{hero.nameCN}</h2>
        {currentTrait && (
          <p className="text-xs text-[#e94560] font-medium mt-1">{currentTrait.nameCN}</p>
        )}
      </div>

      {/* 特性描述 */}
      {currentTrait && (
        <div className="mt-4 p-3 bg-[#1a1a40]/80 rounded-lg border border-[#e94560]/10">
          <div className="text-xs text-[#eaeaea] leading-relaxed">{currentTrait.description}</div>
        </div>
      )}

      <div className="mt-4 space-y-2 text-sm">
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
        <div className="border-t border-[#e94560]/10 pt-3 mt-2">
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
      <div className="mt-4 text-xs text-[#a0a0a0] p-3 bg-[#1a1a40]/80 rounded-lg border border-[#e94560]/10">
        <span className="font-medium text-[#c8c8c8]">可用武器：</span>
        <span className="text-[#a0a0a0]">{hero.weaponTypes.join('、')}</span>
      </div>
    </div>
  );
}
