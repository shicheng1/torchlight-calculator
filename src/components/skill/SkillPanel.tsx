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
    <div className="p-5 space-y-5 overflow-y-auto flex-1 bg-[#16213e]/80">
      <h2 className="text-xl font-bold text-[#eaeaea] flex items-center gap-2 text-shadow">
        <span className="text-2xl">⚔️</span>
        技能配置
      </h2>

      {/* 技能组标签 */}
      <div className="flex flex-wrap gap-2">
        {loadout.skillGroups.map((_group, i) => (
          <button
            key={i}
            onClick={() => { setSelectedGroup(i); setSelectedSkillGroup(i); }}
            className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 btn-hover ${
              i === selectedGroup
                ? 'bg-gradient-accent text-white shadow-lg shadow-[#e94560]/30'
                : 'bg-[#1a1a40] hover:bg-[#252550] text-[#a0a0a0] shadow-md shadow-[#000]/20'
            }`}
          >
            技能组 {i + 1}
          </button>
        ))}
        {loadout.skillGroups.length < 6 && (
          <button
            onClick={() => useBuildStore.getState().addSkillGroup()}
            className="px-4 py-2 rounded-lg text-sm bg-[#1a1a40] hover:bg-[#252550] text-[#a0a0a0] border border-dashed border-[#e94560]/30 transition-all duration-200 shadow-md shadow-[#000]/20 hover:border-[#e94560]/50"
          >
            +
          </button>
        )}
      </div>

      {/* 主动技能选择 */}
      <div className="bg-[#0f3460]/80 rounded-lg p-4 border border-[#e94560]/20 shadow-md">
        <label className="text-sm text-[#a0a0a0] block mb-2 font-medium">主动技能</label>
        <select
          value={currentGroup.activeSkill.skillId}
          onChange={(e) => setActiveSkill(selectedGroup, e.target.value)}
          className="w-full bg-[#1a1a40] border border-[#e94560]/30 rounded-lg px-4 py-2.5 text-sm input-focus"
        >
          {activeSkills.map(skill => (
            <option key={skill.id} value={skill.id}>
              {skill.nameCN} ({skill.tags.join(', ')})
            </option>
          ))}
        </select>
      </div>

      {/* 主动技能等级 */}
      <div className="bg-[#0f3460]/80 rounded-lg p-4 border border-[#e94560]/20 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm text-[#a0a0a0] font-medium">技能等级</label>
          <span className="font-mono text-white text-lg number-animate">{currentGroup.activeSkill.level}</span>
        </div>
        <input
          type="range"
          min={1}
          max={21}
          value={currentGroup.activeSkill.level}
          onChange={(e) => setSkillLevel(selectedGroup, false, 0, parseInt(e.target.value))}
          className="w-full accent-[#e94560]"
        />
        <div className="flex justify-between text-xs text-[#a0a0a0] mt-1">
          <span>1</span>
          <span>21</span>
        </div>
      </div>

      {/* 辅助技能列表 */}
      <div className="bg-[#0f3460]/80 rounded-lg p-4 border border-[#e94560]/20 shadow-md">
        <label className="text-sm text-[#a0a0a0] block mb-3 font-medium">辅助技能</label>
        <div className="space-y-3">
          {currentGroup.supportSkills.map((support, i) => {
            const skillData = availableSupports.find(s => s.id === support.skillId);
            return (
              <div key={i} className="flex items-center gap-3 bg-[#1a1a40] rounded-lg px-4 py-3 card-hover">
                <span className="flex-1 text-sm font-medium">{skillData?.nameCN ?? support.skillId}</span>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={21}
                    value={support.level}
                    onChange={(e) => setSkillLevel(selectedGroup, true, i, parseInt(e.target.value))}
                    className="w-32 accent-[#e94560]"
                  />
                  <span className="font-mono text-xs w-6 text-center number-animate">{support.level}</span>
                  <button
                    onClick={() => removeSupportSkill(selectedGroup, i)}
                    className="text-[#a0a0a0] hover:text-[#e94560] text-sm transition-colors duration-200 p-1 rounded-full hover:bg-[#e94560]/10"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 添加辅助技能 */}
        {currentGroup.supportSkills.length < 5 && (
          <div className="mt-3">
            <select
              value=""
              onChange={(e) => {
                if (e.target.value) addSupportSkill(selectedGroup, e.target.value);
              }}
              className="w-full bg-[#1a1a40] border border-[#e94560]/30 rounded-lg px-4 py-2.5 text-sm text-[#a0a0a0] input-focus"
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
