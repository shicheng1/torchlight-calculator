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

const SLOT_ICONS: Record<EquipmentSlot, string> = {
  weapon_main: '⚔️',
  weapon_off: '🛡️',
  helmet: '👑',
  chest: '📦',
  gloves: '🧤',
  boots: '👢',
  neck: '📿',
  ring1: '💍',
  ring2: '💍',
  belt: '🧶',
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
    <div className="p-5 space-y-5 overflow-y-auto flex-1 bg-[#16213e]/80">
      <h2 className="text-xl font-bold text-[#eaeaea] flex items-center gap-2 text-shadow">
        <span className="text-2xl">🛡️</span>
        装备配置
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {(Object.keys(SLOT_NAMES) as EquipmentSlot[]).map(slot => {
          const gear = loadout.gear[slot];
          const gearBase = gear ? getGearBase(gear.baseId) : null;
          
          return (
            <div
              key={slot}
              className={`rounded-lg border p-4 transition-all duration-200 cursor-pointer card-hover ${
                gear
                  ? 'border-[#e94560]/50 bg-gradient-to-br from-[#0f3460] to-[#134077] shadow-lg shadow-[#000]/30'
                  : 'border-[#a0a0a0]/20 bg-[#1a1a40] border-dashed hover:bg-[#23235a] shadow-md shadow-[#000]/20'
              }`}
              onClick={() => handleEdit(slot)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-lg">{SLOT_ICONS[slot]}</div>
                <span className="text-xs text-[#a0a0a0]">{SLOT_NAMES[slot]}</span>
              </div>
              <div className="text-sm font-medium mt-1 mb-2">
                {gearBase ? gearBase.nameCN : '空'}
              </div>
              {gear?.setId && (
                <div className="text-xs text-[#4ade80] mt-1 mb-2 bg-[#4ade80]/10 border border-[#4ade80]/30 rounded px-2 py-1 inline-block">
                  套装: {gear.setId === 'set_warrior' ? '战士套装' : '法师套装'}
                </div>
              )}
              {gear && (
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-[#a0a0a0]">
                    词缀: {gear.affixes.length}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearGear(slot);
                    }}
                    className="text-xs text-[#a0a0a0] hover:text-[#e94560] transition-colors duration-200 p-1 rounded-full hover:bg-[#e94560]/10"
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
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm fade-in">
          <div className="bg-gradient-to-br from-[#0f3460] to-[#16213e] rounded-xl p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto shadow-2xl shadow-[#000]/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#e94560]">编辑装备 - {SLOT_NAMES[editingSlot]}</h3>
              <button
                onClick={handleCloseEditor}
                className="px-3 py-1 rounded-full bg-[#1a1a40] hover:bg-[#252550] transition-colors duration-200"
              >
                ✕
              </button>
            </div>
            <GearEditor
              slot={editingSlot}
              gear={loadout.gear[editingSlot]}
              onClose={handleCloseEditor}
            />
          </div>
        </div>
      )}
    </div>
  );
}
