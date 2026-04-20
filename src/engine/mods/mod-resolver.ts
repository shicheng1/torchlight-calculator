import type { Mod, Condition } from '../types/mod.ts';
import type { CalculationConfig } from '../types/calc.ts';
import type { SkillTag } from '../types/mod.ts';

interface ModResolveContext {
  config: CalculationConfig;
  skillTags: SkillTag[];
  heroId: string;
  traitId: string;
}

/**
 * 解析 Mod 列表：过滤不满足条件的 Mod，展开 per-stackable Mod
 * 这是计算管线的第二阶段
 */
export function resolveMods(
  allMods: Mod[],
  context: ModResolveContext
): Mod[] {
  const resolved: Mod[] = [];

  for (const mod of allMods) {
    // 1. 检查条件是否满足
    if (mod.cond && !isConditionMet(mod.cond, context.config)) {
      continue;
    }

    // 2. 如果有 per-stackable，展开为具体数值
    if (mod.per) {
      const expanded = expandPerStackable(mod, context);
      if (expanded) {
        resolved.push(expanded);
      }
    } else {
      resolved.push(mod);
    }
  }

  return resolved;
}

function isConditionMet(cond: Condition, config: CalculationConfig): boolean {
  switch (cond) {
    case 'full_life': return config.hasFullLife;
    case 'low_life': return config.hasLowLife;
    case 'full_mana': return config.hasFullMana;
    case 'low_mana': return config.hasLowMana;
    case 'enemy_frozen': return config.enemyFrozen;
    case 'enemy_ignited': return config.enemyIgnited;
    case 'enemy_shocked': return config.enemyShocked;
    case 'enemy_chilled': return config.enemyChilled;
    case 'single_target': return config.singleTarget;
    case 'channeling': return config.channeling;
    case 'overloaded': return config.overloaded;
    case 'enemy_nearby': return config.numEnemiesNearby > 0;
    case 'fervor_active': return config.fervorEnabled;
    case 'custom': return true; // 自定义条件默认满足
    default: return true;
  }
}

function expandPerStackable(mod: Mod, _context: ModResolveContext): Mod | null {
  if (!mod.per) return mod;

  // 获取当前叠加值（简化版，实际需要根据 stat 类型查找）
  // 这里返回原始 mod，实际叠加计算在聚合阶段处理
  return mod;
}
