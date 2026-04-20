import { useBuildStore } from '@/stores/build-store.ts';
import { getAllSlates } from '@/data/slate/index.ts';

export function SlatePanel() {
  const { loadout, addSlate, removeSlate } = useBuildStore();
  const allSlates = getAllSlates();

  const equippedIds = new Set(loadout.divinitySlates.map(s => s.slateId));
  const availableSlates = allSlates.filter(s => !equippedIds.has(s.id));

  return (
    <div className="p-4 space-y-4 overflow-y-auto flex-1">
      <h2 className="text-lg font-bold">石板配置</h2>

      {/* 已装备石板列表 */}
      <div className="space-y-3">
        {loadout.divinitySlates.map((config, index) => {
          const slate = allSlates.find(s => s.id === config.slateId);
          if (!slate) return null;

          return (
            <div key={`${config.slateId}-${index}`} className="bg-[#1a1a40] rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-white">{slate.nameCN}</span>
                  <span className="text-xs text-[#a0a0a0] ml-2">{slate.name}</span>
                </div>
                <button
                  onClick={() => removeSlate(index)}
                  className="text-[#a0a0a0] hover:text-[#e94560] text-sm px-2 py-1 rounded hover:bg-[#e94560]/10 transition-colors"
                >
                  移除
                </button>
              </div>

              <div className="flex gap-4 text-xs text-[#a0a0a0]">
                <span>形状: <span className="text-[#eaeaea]">{slate.shape}</span></span>
                <span>神明: <span className="text-[#eaeaea]">{slate.god}</span></span>
                <span>刻印: <span className="text-[#eaeaea]">{config.engravings.length}/{slate.maxEngravings}</span></span>
              </div>

              {/* 石板属性 */}
              <div className="space-y-1">
                {slate.mods.map((mod, i) => (
                  <div key={i} className="text-xs bg-[#16213e] rounded px-2 py-1 text-[#eaeaea]">
                    {formatSlateMod(mod)}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 添加石板 */}
      {availableSlates.length > 0 && (
        <div className="bg-[#1a1a40] rounded-lg p-4">
          <label className="text-sm text-[#a0a0a0] block mb-2">添加石板</label>
          <select
            value=""
            onChange={(e) => {
              if (e.target.value) {
                const slate = allSlates.find(s => s.id === e.target.value);
                if (slate) {
                  addSlate({ slateId: slate.id, engravings: [] });
                }
              }
            }}
            className="w-full bg-[#16213e] border border-[#e94560]/30 rounded px-3 py-2 text-sm"
          >
            <option value="">-- 选择石板 --</option>
            {availableSlates.map(s => (
              <option key={s.id} value={s.id}>
                {s.nameCN} ({s.shape} - {s.god})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 拼图区域占位 */}
      <div className="bg-[#1a1a40] rounded-lg p-4">
        <div className="text-sm text-[#a0a0a0] mb-2">石板拼图区域</div>
        <div className="grid grid-cols-4 gap-2 aspect-square max-w-64 mx-auto">
          {Array.from({ length: 16 }, (_, i) => (
            <div
              key={i}
              className="bg-[#16213e] border border-[#3a3a5a] rounded flex items-center justify-center text-xs text-[#3a3a5a]"
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className="text-xs text-[#3a3a5a] text-center mt-2">拼图功能开发中</div>
      </div>
    </div>
  );
}

function formatSlateMod(mod: import('@/engine/types/mod.ts').Mod): string {
  switch (mod.type) {
    case 'MinionDmgPct':
      return `召唤物伤害${mod.addn ? '额外' : ''}+${mod.value}%`;
    case 'MinionAspdPct':
      return `召唤物攻速${mod.addn ? '额外' : ''}+${mod.value}%`;
    case 'ExplodeDmgPct':
      return `自爆伤害${mod.addn ? '额外' : ''}+${mod.value}%`;
    case 'OverloadPct':
      return `超载效果${mod.addn ? '额外' : ''}+${mod.value}%`;
    case 'DmgPct':
      return `伤害${mod.addn ? '额外' : ''}+${mod.value}%`;
    case 'CritRatingPct':
      return `暴击值${mod.addn ? '额外' : ''}+${mod.value}%`;
    default:
      return `${mod.type}: ${mod.value}`;
  }
}
