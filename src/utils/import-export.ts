import type { Loadout } from '@/engine/types/calc.ts';
import type { CalculationConfig } from '@/engine/types/calc.ts';

export function exportBuild(loadout: Loadout, config: CalculationConfig): string {
  const data = JSON.stringify({ loadout, config, version: 1 }, null, 2);
  return btoa(encodeURIComponent(data));
}

export function importBuild(code: string): { loadout: Loadout; config: CalculationConfig } | null {
  try {
    const data = JSON.parse(decodeURIComponent(atob(code)));
    if (data.version !== 1) return null;
    return { loadout: data.loadout, config: data.config };
  } catch {
    return null;
  }
}

export function exportToJSON(loadout: Loadout, config: CalculationConfig): string {
  return JSON.stringify({ loadout, config, version: 1 }, null, 2);
}

export function importFromJSON(json: string): { loadout: Loadout; config: CalculationConfig } | null {
  try {
    const data = JSON.parse(json);
    if (data.version !== 1) return null;
    return { loadout: data.loadout, config: data.config };
  } catch {
    return null;
  }
}
