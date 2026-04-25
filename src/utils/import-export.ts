import type { Loadout } from '@/engine/types/calc.ts';
import type { CalculationConfig } from '@/engine/types/calc.ts';

/**
 * 导出构建配置为Base64编码的字符串
 * @param loadout 装备配置
 * @param config 计算配置
 * @returns Base64编码的配置字符串
 */
export function exportBuild(loadout: Loadout, config: CalculationConfig): string {
  const data = JSON.stringify({ loadout, config, version: 1 });
  return btoa(encodeURIComponent(data));
}

/**
 * 从Base64编码的字符串导入构建配置
 * @param code Base64编码的配置字符串
 * @returns 解析后的配置对象，失败返回null
 */
export function importBuild(code: string): { loadout: Loadout; config: CalculationConfig } | null {
  try {
    const data = JSON.parse(decodeURIComponent(atob(code)));
    if (data.version !== 1) return null;
    const loadout = data.loadout;
    // 确保所有数组字段都是数组
    loadout.skillGroups = Array.isArray(loadout.skillGroups) ? loadout.skillGroups : [];
    loadout.talents = Array.isArray(loadout.talents) ? loadout.talents : [];
    loadout.coreTalents = Array.isArray(loadout.coreTalents) ? loadout.coreTalents : [];
    loadout.divinitySlates = Array.isArray(loadout.divinitySlates) ? loadout.divinitySlates : [];
    loadout.heroMemories = Array.isArray(loadout.heroMemories) ? loadout.heroMemories : [];
    loadout.pactspirits = Array.isArray(loadout.pactspirits) ? loadout.pactspirits : [];
    return { loadout, config: data.config };
  } catch (error) {
    console.error('Import build error:', error);
    return null;
  }
}

/**
 * 导出构建配置为JSON字符串
 * @param loadout 装备配置
 * @param config 计算配置
 * @returns JSON字符串
 */
export function exportToJSON(loadout: Loadout, config: CalculationConfig): string {
  return JSON.stringify({ loadout, config, version: 1 }, null, 2);
}

/**
 * 从JSON字符串导入构建配置
 * @param json JSON字符串
 * @returns 解析后的配置对象，失败返回null
 */
export function importFromJSON(json: string): { loadout: Loadout; config: CalculationConfig } | null {
  try {
    const data = JSON.parse(json);
    if (data.version !== 1) return null;
    const loadout = data.loadout;
    // 确保所有数组字段都是数组
    loadout.skillGroups = Array.isArray(loadout.skillGroups) ? loadout.skillGroups : [];
    loadout.talents = Array.isArray(loadout.talents) ? loadout.talents : [];
    loadout.coreTalents = Array.isArray(loadout.coreTalents) ? loadout.coreTalents : [];
    loadout.divinitySlates = Array.isArray(loadout.divinitySlates) ? loadout.divinitySlates : [];
    loadout.heroMemories = Array.isArray(loadout.heroMemories) ? loadout.heroMemories : [];
    loadout.pactspirits = Array.isArray(loadout.pactspirits) ? loadout.pactspirits : [];
    return { loadout, config: data.config };
  } catch (error) {
    console.error('Import JSON error:', error);
    return null;
  }
}

/**
 * 生成构建配置的分享链接
 * @param loadout 装备配置
 * @param config 计算配置
 * @returns 分享链接
 */
export function generateShareLink(loadout: Loadout, config: CalculationConfig): string {
  const code = exportBuild(loadout, config);
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set('build', code);
  return url.toString();
}

/**
 * 从URL参数中导入构建配置
 * @returns 解析后的配置对象，失败返回null
 */
export function importFromUrl(): { loadout: Loadout; config: CalculationConfig } | null {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('build');
  if (!code) return null;
  return importBuild(code);
}
