import { useState } from 'react';
import { useBuildStore } from '@/stores/build-store.ts';
import type { EquipmentSlot } from '@/engine/types/gear.ts';
import { GearEditor } from './GearEditor.tsx';
import { getGearBase } from '@/data/gear/index.ts';

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
  const [editingSlot, setEditingSlot] = useState<EquipmentSlot | null>(null);

  const handleEdit = (slot: EquipmentSlot) => {
    setEditingSlot(slot);
  };

  const handleCloseEditor = () => {
    setEditingSlot(null);
  };

  return (
    <div className="p-4 space-y-3 overflow-y-auto flex-1">
      <h2 className="text-lg font-bold">装备配置</h2>

      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(SLOT_NAMES) as EquipmentSlot[]).map(slot => {
          const gear = loadout.gear[slot];
          const gearBase = gear ? getGearBase(gear.baseId) : null;
          
          return (
            <div
              key={slot}
              className={`rounded-lg border p-3 transition-colors cursor-pointer ${
                gear
                  ? 'border-[#e94560]/50 bg-[#0f3460] hover:bg-[#134077]'
                  : 'border-[#a0a0a0]/20 bg-[#1a1a40] border-dashed hover:bg-[#23235a]'
              }`}
              onClick={() => handleEdit(slot)}
            >
              <div className="text-xs text-[#a0a0a0]">{SLOT_NAMES[slot]}</div>
              <div className="text-sm font-medium mt-1">
                {gearBase ? gearBase.nameCN : '空'}
              </div>
              {gear?.setId && (
                <div className="text-xs text-[#4ade80] mt-1">
                  套装: {gear.setId === 'set_warrior' ? '战士套装' : '法师套装'}
                </div>
              )}
              {gear && (
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-[#a0a0a0]">
                    词缀: {gear.affixes.length}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearGear(slot);
                    }}
                    className="text-xs text-[#a0a0a0] hover:text-[#e94560]"
                  >
                    卸下
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {editingSlot && (
        <GearEditor
          slot={editingSlot}
          gear={loadout.gear[editingSlot]}
          onClose={handleCloseEditor}
        />
      )}
    </div>
  );
}
