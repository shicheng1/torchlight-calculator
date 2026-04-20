/**
 * 格式化大数字（如 DPS）
 * 1234567 -> "1,234,567"
 */
export function formatNumber(n: number): string {
  if (n === 0) return '0';
  return Math.round(n).toLocaleString('zh-CN');
}

/**
 * 格式化百分比
 * 0.652 -> "65.2%"
 */
export function formatPercent(n: number, decimals: number = 1): string {
  return (n * 100).toFixed(decimals) + '%';
}

/**
 * 格式化 DPS 为简写
 * 1234567 -> "123.5万"
 */
export function formatDPS(n: number): string {
  if (n >= 1_0000_0000_0000) {
    return (n / 1_0000_0000_0000).toFixed(2) + '万亿';
  }
  if (n >= 1_0000_0000) {
    return (n / 1_0000_0000).toFixed(2) + '亿';
  }
  if (n >= 1_0000) {
    return (n / 1_0000).toFixed(1) + '万';
  }
  return formatNumber(n);
}

/**
 * 格式化倍率
 * 3.52 -> "352%"
 */
export function formatMultiplier(n: number): string {
  return (n * 100).toFixed(1) + '%';
}
