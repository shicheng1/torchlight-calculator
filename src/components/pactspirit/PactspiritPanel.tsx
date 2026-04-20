import { useBuildStore } from '@/stores/build-store.ts';
import { getAllPactspirits } from '@/data/pactspirit/index.ts';

const RARITY_COLORS: Record<string, string> = {
  magic: 'text-[#4fc3f7] border-[#4fc3f7]/30',
  rare: 'text-[#ffd54f] border-[#ffd54f]/30',
  legendary: 'text-[#e94560] border-[#e94560]/30',
};

const TYPE_NAMES: Record<string, string> = {
  attack: '攻击',
  spell: '法术',
  minion: '召唤',
  defense: '防御',
  drop: '掉落',
};

export function PactspiritPanel() {
  const { loadout, setPactspirit } = useBuildStore();
  const allSpirits = getAllPactspirits();

  const handleSelect = (slotIndex: number, spiritId: string) => {
    if (!spiritId) {
      setPactspirit(slotIndex, null);
      return;
    }
    const spirit = allSpirits.find(s => s.id === spiritId);
    if (spirit) {
      setPactspirit(slotIndex, {
        spiritId: spirit.id,
        stage: 1,
        innerRingPoints: 0,
        middleRingPoints: 0,
        outerRingPoints: 0,
      });
    }
  };

  return (
    <div className="p-4 space-y-4 overflow-y-auto flex-1">
      <h2 className="text-lg font-bold">契灵配置</h2>

      {/* 3个契灵槽位 */}
      {Array.from({ length: 3 }, (_, slotIndex) => {
        const config = loadout.pactspirits[slotIndex];
        const spirit = config ? allSpirits.find(s => s.id === config.spiritId) : null;

        return (
          <div key={slotIndex} className="bg-[#1a1a40] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#a0a0a0]">槽位 {slotIndex + 1}</span>
              {spirit && (
                <span className={`text-xs px-2 py-0.5 rounded border ${RARITY_COLORS[spirit.rarity]}`}>
                  {spirit.rarity === 'legendary' ? '传奇' : spirit.rarity === 'rare' ? '稀有' : '魔法'}
                </span>
              )}
            </div>

            {/* 契灵选择 */}
            <select
              value={config?.spiritId ?? ''}
              onChange={(e) => handleSelect(slotIndex, e.target.value)}
              className="w-full bg-[#16213e] border border-[#e94560]/30 rounded px-3 py-2 text-sm"
            >
              <option value="">-- 选择契灵 --</option>
              {allSpirits.map(s => (
                <option key={s.id} value={s.id}>
                  {s.nameCN} ({TYPE_NAMES[s.type]})
                </option>
              ))}
            </select>

            {/* 契灵详情 */}
            {spirit && config && (
              <div className="space-y-3">
                <div className="text-sm text-[#a0a0a0]">{spirit.description}</div>

                {/* 阶位滑块 */}
                <div>
                  <label className="text-sm text-[#a0a0a0] block mb-1">
                    阶位: <span className="text-white font-mono">{config.stage}/{spirit.maxStage}</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={spirit.maxStage}
                    value={config.stage}
                    onChange={(e) => setPactspirit(slotIndex, { ...config, stage: parseInt(e.target.value) })}
                    className="w-full accent-[#e94560]"
                  />
                </div>

                {/* 阶位效果 */}
                <div className="space-y-1">
                  {spirit.stageEffects
                    .filter(eff => eff.stage <= config.stage)
                    .map((eff, i) => (
                      <div key={i} className="text-xs bg-[#16213e] rounded px-2 py-1">
                        <span className="text-[#e94560] font-mono">{eff.stage}阶: </span>
                        <span className="text-[#eaeaea]">{eff.description}</span>
                      </div>
                    ))}
                </div>

                {/* 环点数配置 */}
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs text-[#a0a0a0] block mb-1">内环</label>
                    <input
                      type="number"
                      min={0}
                      max={20}
                      value={config.innerRingPoints}
                      onChange={(e) => setPactspirit(slotIndex, { ...config, innerRingPoints: parseInt(e.target.value) || 0 })}
                      className="w-full bg-[#16213e] border border-[#e94560]/30 rounded px-2 py-1 text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#a0a0a0] block mb-1">中环</label>
                    <input
                      type="number"
                      min={0}
                      max={20}
                      value={config.middleRingPoints}
                      onChange={(e) => setPactspirit(slotIndex, { ...config, middleRingPoints: parseInt(e.target.value) || 0 })}
                      className="w-full bg-[#16213e] border border-[#e94560]/30 rounded px-2 py-1 text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#a0a0a0] block mb-1">外环</label>
                    <input
                      type="number"
                      min={0}
                      max={20}
                      value={config.outerRingPoints}
                      onChange={(e) => setPactspirit(slotIndex, { ...config, outerRingPoints: parseInt(e.target.value) || 0 })}
                      className="w-full bg-[#16213e] border border-[#e94560]/30 rounded px-2 py-1 text-sm font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
