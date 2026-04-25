import { useState } from 'react';
import { useBuildStore } from '@/stores/build-store.ts';
import type { EquipmentSlot, GearInstance, Affix } from '@/engine/types/gear.ts';
import { affixes, getGearBasesBySlot } from '@/data/gear/index.ts';

interface GearEditorProps {
  slot: EquipmentSlot;
  gear: GearInstance | null;
  onClose: () => void;
}

export function GearEditor({ slot, gear, onClose }: GearEditorProps) {
  const { setGear } = useBuildStore();
  
  const [baseId, setBaseId] = useState(gear?.baseId || '');
  const [affixIds, setAffixIds] = useState<string[]>(gear?.affixes.map(a => a.id) || []);
  const [setId, setSetId] = useState(gear?.setId || '');
  const [quality, setQuality] = useState(gear?.quality || 0);

  const availableBases = getGearBasesBySlot(slot);
  const selectedBase = availableBases.find(b => b.id === baseId);
  const availableAffixes = affixes.filter(a => selectedBase?.allowedAffixTypes.includes(a.affixType));

  const handleSave = () => {
    const selectedAffixes: Affix[] = affixIds
      .map(id => affixes.find(a => a.id === id))
      .filter((a): a is Affix => a !== undefined);

    const newGear: GearInstance = {
      slot,
      baseId,
      rarity: selectedBase?.rarity || 'normal',
      affixes: selectedAffixes,
      quality,
      setId: setId || undefined
    };

    setGear(slot, newGear);
    onClose();
  };

  const handleAddAffix = (affixId: string) => {
    if (!affixIds.includes(affixId)) {
      setAffixIds([...affixIds, affixId]);
    }
  };

  const handleRemoveAffix = (affixId: string) => {
    setAffixIds(affixIds.filter(id => id !== affixId));
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-[#0f172a] border border-[#e94560]/30 rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">编辑装备</h3>
          <button 
            onClick={onClose}
            className="text-[#a0a0a0] hover:text-white"
          >
            ×
          </button>
        </div>

        {/* 装备基底选择 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">装备基底</label>
          <select
            value={baseId}
            onChange={(e) => setBaseId(e.target.value)}
            className="w-full bg-[#1e293b] border border-[#a0a0a0]/20 rounded px-3 py-2 text-sm"
          >
            <option value="">选择基底</option>
            {availableBases.map(base => (
              <option key={base.id} value={base.id}>
                {base.nameCN} ({base.equipmentType})
              </option>
            ))}
          </select>
        </div>

        {/* 套装选择 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">套装</label>
          <select
            value={setId}
            onChange={(e) => setSetId(e.target.value)}
            className="w-full bg-[#1e293b] border border-[#a0a0a0]/20 rounded px-3 py-2 text-sm"
          >
            <option value="">无套装</option>
            <option value="set_warrior">战士套装</option>
            <option value="set_mage">法师套装</option>
          </select>
        </div>

        {/* 品质 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">品质: {quality}%</label>
          <input
            type="range"
            min="0"
            max="20"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* 词缀选择 */}
        {selectedBase && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              词缀 ({affixIds.length}/{selectedBase.maxPrefixes + selectedBase.maxSuffixes})
            </label>
            <div className="space-y-2">
              {availableAffixes.map(affix => (
                <div key={affix.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`affix-${affix.id}`}
                    checked={affixIds.includes(affix.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleAddAffix(affix.id);
                      } else {
                        handleRemoveAffix(affix.id);
                      }
                    }}
                  />
                  <label 
                    htmlFor={`affix-${affix.id}`}
                    className="ml-2 text-sm flex-1"
                  >
                    {affix.text}
                  </label>
                  <span className="text-xs text-[#a0a0a0]">{affix.affixType}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 保存按钮 */}
        <div className="flex gap-2 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 border border-[#a0a0a0]/20 rounded hover:bg-[#1e293b]"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 px-4 bg-[#e94560] rounded hover:bg-[#c0392b]"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}