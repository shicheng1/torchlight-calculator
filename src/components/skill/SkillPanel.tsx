import { useBuildStore } from '@/stores/build-store.ts';
import { getActiveSkills, getSupportSkillsFor } from '@/data/skills/index.ts';
import { useState } from 'react';

export function SkillPanel() {
  const { loadout, setActiveSkill, addSupportSkill, removeSupportSkill, setSkillLevel, setSelectedSkillGroup } = useBuildStore();
  const [selectedGroup, setSelectedGroup] = useState(loadout.selectedSkillGroupIndex);
  const activeSkills = getActiveSkills();
  const currentGroup = loadout.skillGroups[selectedGroup];

  const currentActiveSkill = activeSkills.find(s => s.id === currentGroup.activeSkill.skillId);
  const availableSupports = currentActiveSkill ? getSupportSkillsFor(currentActiveSkill) : [];

  return (
    <div className="p-4 space-y-4 overflow-y-auto flex-1">
      <h2 className="text-lg font-bold">技能配置</h2>

      {/* 技能组标签 */}
      <div className="flex gap-2">
        {loadout.skillGroups.map((_group, i) => (
          <button
            key={i}
            onClick={() => { setSelectedGroup(i); setSelectedSkillGroup(i); }}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              i === selectedGroup
                ? 'bg-[#e94560] text-white'
                : 'bg-[#1a1a40] hover:bg-[#252550] text-[#a0a0a0]'
            }`}
          >
            技能组 {i + 1}
          </button>
        ))}
        {loadout.skillGroups.length < 6 && (
          <button
            onClick={() => useBuildStore.getState().addSkillGroup()}
            className="px-3 py-1 rounded text-sm bg-[#1a1a40] hover:bg-[#252550] text-[#a0a0a0] border border-dashed border-[#a0a0a0]/30"
          >
            +
          </button>
        )}
      </div>

      {/* 主动技能选择 */}
      <div>
        <label className="text-sm text-[#a0a0a0] block mb-1">主动技能</label>
        <select
          value={currentGroup.activeSkill.skillId}
          onChange={(e) => setActiveSkill(selectedGroup, e.target.value)}
          className="w-full bg-[#1a1a40] border border-[#e94560]/30 rounded px-3 py-2 text-sm"
        >
          {activeSkills.map(skill => (
            <option key={skill.id} value={skill.id}>
              {skill.nameCN} ({skill.tags.join(', ')})
            </option>
          ))}
        </select>
      </div>

      {/* 主动技能等级 */}
      <div>
        <label className="text-sm text-[#a0a0a0] block mb-1">
          技能等级: <span className="text-white font-mono">{currentGroup.activeSkill.level}</span>
        </label>
        <input
          type="range"
          min={1}
          max={21}
          value={currentGroup.activeSkill.level}
          onChange={(e) => setSkillLevel(selectedGroup, false, 0, parseInt(e.target.value))}
          className="w-full accent-[#e94560]"
        />
      </div>

      {/* 辅助技能列表 */}
      <div>
        <label className="text-sm text-[#a0a0a0] block mb-1">辅助技能</label>
        <div className="space-y-2">
          {currentGroup.supportSkills.map((support, i) => {
            const skillData = availableSupports.find(s => s.id === support.skillId);
            return (
              <div key={i} className="flex items-center gap-2 bg-[#1a1a40] rounded px-3 py-2">
                <span className="flex-1 text-sm">{skillData?.nameCN ?? support.skillId}</span>
                <input
                  type="range"
                  min={1}
                  max={21}
                  value={support.level}
                  onChange={(e) => setSkillLevel(selectedGroup, true, i, parseInt(e.target.value))}
                  className="w-24 accent-[#e94560]"
                />
                <span className="font-mono text-xs w-6">{support.level}</span>
                <button
                  onClick={() => removeSupportSkill(selectedGroup, i)}
                  className="text-[#a0a0a0] hover:text-[#e94560] text-sm"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>

        {/* 添加辅助技能 */}
        {currentGroup.supportSkills.length < 5 && (
          <div className="mt-2">
            <select
              value=""
              onChange={(e) => {
                if (e.target.value) addSupportSkill(selectedGroup, e.target.value);
              }}
              className="w-full bg-[#1a1a40] border border-[#e94560]/30 rounded px-3 py-2 text-sm text-[#a0a0a0]"
            >
              <option value="">+ 添加辅助技能</option>
              {availableSupports
                .filter(s => !currentGroup.supportSkills.some(ss => ss.skillId === s.id))
                .map(skill => (
                  <option key={skill.id} value={skill.id}>
                    {skill.nameCN}
                  </option>
                ))
              }
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
