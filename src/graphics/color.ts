/**
 * HEX颜色转RGBA对象
 * @category Color
 * @param hex #RRGGBB 或 #RRGGBBAA
 */
function hexToRgba(hex: string): { r: number, g: number, b: number, a: number } {
  if (!/^#(?:[0-9a-f]{6}|[0-9a-f]{8})$/i.test(hex))
    throw new Error('Invalid hex color')
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)
  const a = hex.length > 7 ? Number.parseInt(hex.slice(7, 9), 16) / 255 : 1
  return { r, g, b, a }
}

/**
 * RGBA对象转HEX
 * @category Color
 */
function rgbaToHex({ r, g, b, a = 1 }: { r: number, g: number, b: number, a?: number }): string {
  // 检查输入值是否有效
  if (r < 0 || r > 255)
    throw new Error('Invalid red value')
  if (g < 0 || g > 255)
    throw new Error('Invalid green value')
  if (b < 0 || b > 255)
    throw new Error('Invalid blue value')
  if (a < 0 || a > 1)
    throw new Error('Invalid alpha value')

  const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${a < 1 ? toHex(a * 255) : ''}`
}

/**
 * 线性颜色插值
 * @category Color
 * @param color1 HEX颜色
 * @param color2 HEX颜色
 * @param t 插值系数 (0-1)
 */
function lerpColor(color1: string, color2: string, t: number): string {
  if (!/^#(?:[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color1))
    throw new Error('Invalid hex color')
  if (t < 0 || t > 1)
    throw new Error('Invalid t value')

  const c1 = hexToRgba(color1)
  const c2 = hexToRgba(color2)

  return rgbaToHex({
    r: c1.r + (c2.r - c1.r) * t,
    g: c1.g + (c2.g - c1.g) * t,
    b: c1.b + (c2.b - c1.b) * t,
    a: c1.a + (c2.a - c1.a) * t,
  })
}

export { hexToRgba, rgbaToHex, lerpColor }
