import { useConfigStore } from '@/stores/config-store.ts';

export function ConfigPanel() {
  const { config, updateConfig } = useConfigStore();

  return (
    <div className="p-4 space-y-6 overflow-y-auto flex-1">
      <h2 className="text-lg font-bold">计算配置</h2>

      {/* 怪物配置 */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium text-[#e94560] uppercase tracking-wider">怪物配置</h3>

        {/* 怪物等级 */}
        <div>
          <label className="text-sm text-[#a0a0a0] block mb-1">
            怪物等级: <span className="text-white font-mono">{config.enemyLevel}</span>
          </label>
          <input
            type="range"
            min={1}
            max={100}
            value={config.enemyLevel}
            onChange={(e) => updateConfig({ enemyLevel: parseInt(e.target.value) })}
            className="w-full accent-[#e94560]"
          />
        </div>

        {/* 怪物抗性 */}
        <div className="grid grid-cols-2 gap-3">
          <ConfigInput
            label="火焰抗性"
            value={config.enemyFireRes}
            min={0}
            max={100}
            onChange={(v) => updateConfig({ enemyFireRes: v })}
            color="#ff6b35"
          />
          <ConfigInput
            label="冰冷抗性"
            value={config.enemyColdRes}
            min={0}
            max={100}
            onChange={(v) => updateConfig({ enemyColdRes: v })}
            color="#4fc3f7"
          />
          <ConfigInput
            label="闪电抗性"
            value={config.enemyLightningRes}
            min={0}
            max={100}
            onChange={(v) => updateConfig({ enemyLightningRes: v })}
            color="#ffd54f"
          />
          <ConfigInput
            label="腐蚀抗性"
            value={config.enemyErosionRes}
            min={0}
            max={100}
            onChange={(v) => updateConfig({ enemyErosionRes: v })}
            color="#ab47bc"
          />
        </div>

        {/* 怪物护甲 */}
        <div>
          <label className="text-sm text-[#a0a0a0] block mb-1">
            怪物护甲: <span className="text-white font-mono">{config.enemyArmor.toLocaleString()}</span>
          </label>
          <input
            type="range"
            min={0}
            max={100000}
            step={100}
            value={config.enemyArmor}
            onChange={(e) => updateConfig({ enemyArmor: parseInt(e.target.value) })}
            className="w-full accent-[#e94560]"
          />
        </div>

        {/* 怪物抗性上限 */}
        <div>
          <label className="text-sm text-[#a0a0a0] block mb-1">
            怪物抗性上限: <span className="text-white font-mono">{config.enemyResCap}%</span>
          </label>
          <input
            type="range"
            min={0}
            max={90}
            value={config.enemyResCap}
            onChange={(e) => updateConfig({ enemyResCap: parseInt(e.target.value) })}
            className="w-full accent-[#e94560]"
          />
        </div>
      </section>

      {/* Buff/Debuff 开关 */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium text-[#e94560] uppercase tracking-wider">状态开关</h3>

        <div className="grid grid-cols-2 gap-2">
          <ConfigCheckbox
            label="狂热"
            checked={config.fervorEnabled}
            onChange={(v) => updateConfig({ fervorEnabled: v })}
          />
          <ConfigCheckbox
            label="超载"
            checked={config.overloaded}
            onChange={(v) => updateConfig({ overloaded: v })}
          />
          <ConfigCheckbox
            label="满血"
            checked={config.hasFullLife}
            onChange={(v) => updateConfig({ hasFullLife: v })}
          />
          <ConfigCheckbox
            label="低血"
            checked={config.hasLowLife}
            onChange={(v) => updateConfig({ hasLowLife: v })}
          />
          <ConfigCheckbox
            label="满魔"
            checked={config.hasFullMana}
            onChange={(v) => updateConfig({ hasFullMana: v })}
          />
          <ConfigCheckbox
            label="低魔"
            checked={config.hasLowMana}
            onChange={(v) => updateConfig({ hasLowMana: v })}
          />
          <ConfigCheckbox
            label="引导中"
            checked={config.channeling}
            onChange={(v) => updateConfig({ channeling: v })}
          />
          <ConfigCheckbox
            label="单目标"
            checked={config.singleTarget}
            onChange={(v) => updateConfig({ singleTarget: v })}
          />
        </div>

        <div className="text-xs text-[#a0a0a0] mt-1">敌方异常状态:</div>
        <div className="grid grid-cols-2 gap-2">
          <ConfigCheckbox
            label="冻结"
            checked={config.enemyFrozen}
            onChange={(v) => updateConfig({ enemyFrozen: v })}
          />
          <ConfigCheckbox
            label="点燃"
            checked={config.enemyIgnited}
            onChange={(v) => updateConfig({ enemyIgnited: v })}
          />
          <ConfigCheckbox
            label="感电"
            checked={config.enemyShocked}
            onChange={(v) => updateConfig({ enemyShocked: v })}
          />
          <ConfigCheckbox
            label="冰缓"
            checked={config.enemyChilled}
            onChange={(v) => updateConfig({ enemyChilled: v })}
          />
        </div>
      </section>

      {/* 数值配置 */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium text-[#e94560] uppercase tracking-wider">数值配置</h3>

        <div>
          <label className="text-sm text-[#a0a0a0] block mb-1">
            狂热层数: <span className="text-white font-mono">{config.fervorPoints}</span>
          </label>
          <input
            type="range"
            min={0}
            max={10}
            value={config.fervorPoints}
            onChange={(e) => updateConfig({ fervorPoints: parseInt(e.target.value) })}
            className="w-full accent-[#e94560]"
          />
        </div>

        <div>
          <label className="text-sm text-[#a0a0a0] block mb-1">
            周围敌人数: <span className="text-white font-mono">{config.numEnemiesNearby}</span>
          </label>
          <input
            type="range"
            min={1}
            max={20}
            value={config.numEnemiesNearby}
            onChange={(e) => updateConfig({ numEnemiesNearby: parseInt(e.target.value) })}
            className="w-full accent-[#e94560]"
          />
        </div>
      </section>
    </div>
  );
}

function ConfigInput({
  label,
  value,
  min,
  max,
  onChange,
  color,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  color: string;
}) {
  return (
    <div>
      <label className="text-xs text-[#a0a0a0] block mb-1">
        {label}: <span className="text-white font-mono" style={{ color }}>{value}%</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full accent-[#e94560]"
      />
    </div>
  );
}

function ConfigCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-[#e94560] w-4 h-4"
      />
      <span className={checked ? 'text-[#eaeaea]' : 'text-[#a0a0a0]'}>{label}</span>
    </label>
  );
}
