import { useBuildStore } from '@/stores/build-store.ts';
import { getHeroMemoriesForHero, type HeroMemoryData } from '@/data/hero-memory/index.ts';

const RARITY_COLORS: Record<string, string> = {
  magic: 'text-[#4fc3f7] border-[#4fc3f7]/30',
  rare: 'text-[#ffd54f] border-[#ffd54f]/30',
  legendary: 'text-[#e94560] border-[#e94560]/30',
};

export function MemoryPanel() {
  const { loadout, setHeroMemory } = useBuildStore();
  const heroId = loadout.hero.heroId;
  const availableMemories = getHeroMemoriesForHero(heroId);

  const handleSelect = (slotIndex: number, memoryId: string) => {
    if (!memoryId) {
      setHeroMemory(slotIndex, null);
      return;
    }
    const memory = availableMemories.find(m => m.id === memoryId);
    if (memory) {
      setHeroMemory(slotIndex, {
        memoryId: memory.id,
        level: 1,
        affixes: [],
      });
    }
  };

  return (
    <div className="p-4 space-y-4 overflow-y-auto flex-1">
      <h2 className="text-lg font-bold">追忆配置</h2>

      {/* 5个追忆槽位 */}
      {Array.from({ length: 5 }, (_, slotIndex) => {
        const config = loadout.heroMemories[slotIndex];
        const memory = config ? availableMemories.find(m => m.id === config.memoryId) : null;

        return (
          <div key={slotIndex} className="bg-[#1a1a40] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#a0a0a0]">追忆槽位 {slotIndex + 1}</span>
              {memory && (
                <span className={`text-xs px-2 py-0.5 rounded border ${RARITY_COLORS[memory.rarity]}`}>
                  {memory.rarity === 'legendary' ? '传奇' : memory.rarity === 'rare' ? '稀有' : '魔法'}
                </span>
              )}
            </div>

            {/* 追忆选择 */}
            <select
              value={config?.memoryId ?? ''}
              onChange={(e) => handleSelect(slotIndex, e.target.value)}
              className="w-full bg-[#16213e] border border-[#e94560]/30 rounded px-3 py-2 text-sm"
            >
              <option value="">-- 选择追忆 --</option>
              {availableMemories.map(m => (
                <option key={m.id} value={m.id}>
                  {m.nameCN}
                </option>
              ))}
            </select>

            {/* 追忆详情 */}
            {memory && config && (
              <div className="space-y-3">
                <div className="text-sm text-[#a0a0a0]">{memory.description}</div>

                {/* 套装加成预览 */}
                <MemorySetBonusPreview memory={memory} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MemorySetBonusPreview({ memory }: { memory: HeroMemoryData }) {
  return (
    <div className="space-y-1">
      <div className="text-xs text-[#a0a0a0]">套装加成:</div>
      {memory.setBonuses.map((bonus, i) => (
        <div key={i} className="text-xs bg-[#16213e] rounded px-2 py-1">
          <span className="text-[#e94560] font-mono">{bonus.pieces}件: </span>
          <span className="text-[#eaeaea]">{bonus.description}</span>
        </div>
      ))}
    </div>
  );
}
