import { describe, expect, it } from 'vitest'
import { formatCurrency } from '../../src/finance/amount'

describe('formatCurrency', () => {
  it('should correctly format amount with default currency and locale', () => {
    const result = formatCurrency(1000)
    expect(result).toBe('¥1,000.00')
  })

  it('should correctly format amount with specified currency and locale', () => {
    const result = formatCurrency(1000, 'USD', 'en-US')
    expect(result).toBe('$1,000.00')
  })

  it('should correctly format negative amounts', () => {
    const result = formatCurrency(-500, 'EUR', 'de-DE')
    expect(result).toBe('-500,00 €')
  })

  it('should correctly format zero amount', () => {
    const result = formatCurrency(0, 'GBP', 'en-GB')
    expect(result).toBe('£0.00')
  })

  it('should handle decimal amounts correctly', () => {
    const result = formatCurrency(1234.56, 'JPY', 'ja-JP')
    // 注意：对于某些货币（如日元），最小单位可能是整数，因此小数部分可能被舍去。
    expect(result).toBe('￥1,235')
  })

  it('should throw an error for invalid amount', () => {
    expect(() => formatCurrency(Number.NaN)).toThrow()
  })
})
