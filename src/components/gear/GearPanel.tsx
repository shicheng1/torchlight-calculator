import { useBuildStore } from '@/stores/build-store.ts';
import type { EquipmentSlot } from '@/engine/types/gear.ts';

const SLOT_NAMES: Record<EquipmentSlot, string> = {
  weapon_main: '主手武器',
  weapon_off: '副手武器',
  helmet: '头盔',
  chest: '胸甲',
  gloves: '手套',
  boots: '鞋子',
  neck: '项链',
  ring1: '戒指 1',
  ring2: '戒指 2',
  belt: '腰带',
};

export function GearPanel() {
  const { loadout, clearGear } = useBuildStore();

  return (
    <div className="p-4 space-y-3 overflow-y-auto flex-1">
      <h2 className="text-lg font-bold">装备配置</h2>
      <p className="text-xs text-[#a0a0a0]">装备数据录入功能开发中，当前为占位面板</p>

      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(SLOT_NAMES) as EquipmentSlot[]).map(slot => {
          const gear = loadout.gear[slot];
          return (
            <div
              key={slot}
              className={`rounded-lg border p-3 transition-colors ${
                gear
                  ? 'border-[#e94560]/50 bg-[#0f3460]'
                  : 'border-[#a0a0a0]/20 bg-[#1a1a40] border-dashed'
              }`}
            >
              <div className="text-xs text-[#a0a0a0]">{SLOT_NAMES[slot]}</div>
              <div className="text-sm font-medium mt-1">
                {gear ? '已装备' : '空'}
              </div>
              {gear && (
                <button
                  onClick={() => clearGear(slot)}
                  className="text-xs text-[#a0a0a0] hover:text-[#e94560] mt-1"
                >
                  卸下
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
