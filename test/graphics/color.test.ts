import { describe, expect, it } from 'vitest'
import { hexToRgba, lerpColor, rgbaToHex } from '../../src/graphics/color'

describe('hexToRgba', () => {
  it('should correctly convert #RRGGBB to RGBA object with default alpha', () => {
    const result = hexToRgba('#FF5733')
    expect(result).toEqual({ r: 255, g: 87, b: 51, a: 1 })
  })

  it('should correctly convert #RRGGBBAA to RGBA object with specified alpha', () => {
    const result = hexToRgba('#FF573380')
    expect(result).toEqual({ r: 255, g: 87, b: 51, a: 0.5019607843137255 }) // 128/255 ≈ 0.502
  })

  it('should handle lowercase hex values', () => {
    const result = hexToRgba('#ff5733')
    expect(result).toEqual({ r: 255, g: 87, b: 51, a: 1 })
  })

  it('should handle six-digit uppercase hex values with leading hash', () => {
    const result = hexToRgba('#0000FF')
    expect(result).toEqual({ r: 0, g: 0, b: 255, a: 1 })
  })

  it('should handle eight-digit lowercase hex values with leading hash', () => {
    const result = hexToRgba('#0000ff80')
    expect(result).toEqual({ r: 0, g: 0, b: 255, a: 0.5019607843137255 })
  })

  it('should throw an error for invalid hex length', () => {
    expect(() => hexToRgba('#FFF')).toThrow()
    expect(() => hexToRgba('#FFFFF')).toThrow()
    expect(() => hexToRgba('#FFFFFFFFF')).toThrow()
  })

  it('should throw an error for non-hex characters', () => {
    expect(() => hexToRgba('#ZZZ000')).toThrow()
    expect(() => hexToRgba('#FFFFFFGG')).toThrow()
  })
}) // 请根据实际情况调整模块导入路径

describe('rgbaToHex', () => {
  it('should correctly convert an RGBA object with default alpha to HEX string', () => {
    const result = rgbaToHex({ r: 255, g: 87, b: 51 })
    expect(result).toBe('#ff5733')
  })

  it('should correctly convert an RGBA object with specified alpha to HEX string', () => {
    const result = rgbaToHex({ r: 255, g: 87, b: 51, a: 0.5 })
    expect(result).toBe('#ff573380') // 0.5 * 255 ≈ 128 (hex: 80)
  })

  it('should handle zero values for R, G, B and A', () => {
    const result = rgbaToHex({ r: 0, g: 0, b: 0, a: 0 })
    expect(result).toBe('#00000000')
  })

  it('should handle maximum values for R, G, B and A', () => {
    const result = rgbaToHex({ r: 255, g: 255, b: 255, a: 1 })
    expect(result).toBe('#ffffff')
  })

  it('should round non-integer RGB values', () => {
    const result = rgbaToHex({ r: 254.6, g: 87.3, b: 51.9 })
    expect(result).toBe('#ff5734')
  })

  it('should handle alpha value that rounds to full opacity', () => {
    const result = rgbaToHex({ r: 255, g: 87, b: 51, a: 0.999 })
    expect(result).toBe('#ff5733ff') // 0.999 * 255 ≈ 255 (hex: ff)
  })

  it('should handle alpha value that rounds to zero opacity', () => {
    const result = rgbaToHex({ r: 255, g: 87, b: 51, a: 0.001 })
    expect(result).toBe('#ff573300') // 0.001 * 255 ≈ 0 (hex: 00)
  })

  it('should throw an error for out-of-bound RGB values', () => {
    expect(() => rgbaToHex({ r: -1, g: 87, b: 51 })).toThrow()
    expect(() => rgbaToHex({ r: 256, g: 87, b: 51 })).toThrow()
  })

  it('should throw an error for out-of-bound alpha value', () => {
    expect(() => rgbaToHex({ r: 255, g: 87, b: 51, a: -0.1 })).toThrow()
    expect(() => rgbaToHex({ r: 255, g: 87, b: 51, a: 1.1 })).toThrow()
  })
})
// 假设 hexToRgba 和 rgbaToHex 已被正确导入

describe('lerpColor', () => {
  it('should correctly interpolate between two colors with t=0.5', () => {
    // 中间色调，t=0.5时应该是两种颜色的平均值
    const result = lerpColor('#ff0000', '#0000ff', 0.5)
    expect(result).toBe('#800080') // 紫色
  })

  it('should return color1 when t=0', () => {
    // 当t=0时，结果应完全等于color1
    const result = lerpColor('#ff0000', '#0000ff', 0)
    expect(result).toBe('#ff0000')
  })

  it('should return color2 when t=1', () => {
    // 当t=1时，结果应完全等于color2
    const result = lerpColor('#ff0000', '#0000ff', 1)
    expect(result).toBe('#0000ff')
  })

  it('should handle edge cases for t (less than 0 or greater than 1)', () => {
    // 超出范围的t值应该被限制在[0, 1]区间内
    expect(() => lerpColor('#ff0000', '#0000ff', -1)).toThrowError()

    expect(() => lerpColor('#ff0000', '#0000ff', 2)).toThrowError()
  })

  it('should throw an error on invalid color inputs', () => {
    // 预期对无效颜色输入抛出错误
    expect(() => lerpColor('#gg0000', '#0000ff', 0.5)).toThrow()
    expect(() => lerpColor('#ff0000', '#gg0000', 0.5)).toThrow()
  })
})
