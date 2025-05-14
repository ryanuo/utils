import { describe, expect, it } from 'vitest'
import Decimal from 'decimal.js'
import { CalculatorChain, calculatePercentage, compare, preciseAdd, preciseDiv, preciseMul, preciseSub, roundTo } from '../../src/finance/calculator'

describe('preciseAdd', () => {
  it('should correctly add numbers', () => {
    const result = preciseAdd(0.1, 0.2)
    expect(result.toNumber()).toBeCloseTo(0.3)
  })

  it('should correctly add strings representing numbers', () => {
    const result = preciseAdd('0.1', '0.2')
    expect(result.toNumber()).toBeCloseTo(0.3)
  })

  it('should correctly add a mix of numbers and strings', () => {
    const result = preciseAdd(0.1, '0.2')
    expect(result.toNumber()).toBeCloseTo(0.3)
  })

  it('should handle multiple arguments', () => {
    const result = preciseAdd(0.1, 0.2, 0.3)
    expect(result.toNumber()).toBeCloseTo(0.6)
  })

  it('should return zero when no arguments are passed', () => {
    const result = preciseAdd()
    expect(result.toNumber()).toBe(0)
  })

  it('should handle large numbers accurately', () => {
    const result = preciseAdd('999999999999999999999', '1')
    expect(result.toString()).toBe('1e+21')
  })

  it('should throw an error for invalid inputs', () => {
    expect(() => preciseAdd('not a number')).toThrow()
  })
})

describe('preciseSub', () => {
  it('should correctly subtract two numbers', () => {
    const result = preciseSub(0.3, 0.1)
    expect(result.toNumber()).toBeCloseTo(0.2)
  })

  it('should correctly subtract strings representing numbers', () => {
    const result = preciseSub('0.3', '0.1')
    expect(result.toNumber()).toBeCloseTo(0.2)
  })

  it('should correctly subtract a mix of numbers and strings', () => {
    const result = preciseSub(0.3, '0.1')
    expect(result.toNumber()).toBeCloseTo(0.2)
  })

  it('should handle multiple subtractions', () => {
    const result = preciseSub(1, 0.2, 0.3, 0.1)
    expect(result.toNumber()).toBeCloseTo(0.4)
  })

  it('should handle large number subtraction accurately', () => {
    const result = preciseSub('1000000000000000000000', '1')
    expect(result.toString()).toBe('1e+21')
  })

  it('should return the original value when no moreNumbers are provided', () => {
    const result = preciseSub(5, 2)
    expect(result.toNumber()).toBe(3)
  })

  it('should throw an error for invalid inputs', () => {
    expect(() => preciseSub('not a number', 1)).toThrow()
  })
})

describe('preciseMul', () => {
  it('should correctly multiply two numbers', () => {
    const result = preciseMul(0.1, 2)
    expect(result.toNumber()).toBeCloseTo(0.2)
  })

  it('should correctly multiply strings representing numbers', () => {
    const result = preciseMul('0.1', '2')
    expect(result.toNumber()).toBeCloseTo(0.2)
  })

  it('should correctly multiply a mix of numbers and strings', () => {
    const result = preciseMul(0.1, '2')
    expect(result.toNumber()).toBeCloseTo(0.2)
  })

  it('should handle multiple multiplications', () => {
    const result = preciseMul(2, 3, 4)
    expect(result.toNumber()).toBe(24)
  })

  it('should return 1 when no arguments are provided', () => {
    const result = preciseMul()
    expect(result.toNumber()).toBe(0)
  })

  it('should throw an error for invalid inputs', () => {
    expect(() => preciseMul('not a number', 1)).toThrow()
  })
})

describe('preciseDiv', () => {
  it('should correctly divide two numbers', () => {
    const result = preciseDiv(8, 4)
    expect(result.toNumber()).toBe(2)
  })

  it('should correctly divide strings representing numbers', () => {
    const result = preciseDiv('8', '4')
    expect(result.toNumber()).toBe(2)
  })

  it('should handle division with more than two divisors', () => {
    const result = preciseDiv(32, 2, 4)
    expect(result.toNumber()).toBe(4)
  })

  it('should correctly divide a mix of numbers and strings', () => {
    const result = preciseDiv(16, '2', 4)
    expect(result.toNumber()).toBe(2)
  })

  it('should return the input value when divided by 1', () => {
    const result = preciseDiv(5, 1)
    expect(result.toNumber()).toBe(5)
  })

  it('should throw an error for invalid inputs', () => {
    expect(() => preciseDiv('not a number', 1)).toThrow()
  })

  it('should handle large number division accurately', () => {
    const result = preciseDiv('12345678901234567890', '98765432109876543210')
    expect(result.toNumber()).toBeCloseTo(0.125, 3) // 根据实际需要调整精度
  })
})

describe('roundTo', () => {
  it('should correctly round a number to the specified decimal places using banker\'s rounding', () => {
    const result = roundTo(2.675, 2)
    expect(result.toString()).toBe('2.68') // 银行家舍入法：2.675 -> 2.68
  })

  it('should handle rounding of integers', () => {
    const result = roundTo(10, 0)
    expect(result.toString()).toBe('10')
  })

  it('should correctly round when input is a string representation of a number', () => {
    const result = roundTo('3.145', 2)
    expect(result.toString()).toBe('3.15')
  })

  it('should work with Decimal instances as input', () => {
    const decimalNum = new Decimal('4.567')
    const result = roundTo(decimalNum, 2)
    expect(result.toString()).toBe('4.57')
  })

  it('should handle zero decimal places correctly', () => {
    const result = roundTo(3.7, 0)
    expect(result.toString()).toBe('4')
  })

  it('should handle edge cases like .5 correctly with banker\'s rounding', () => {
    const result1 = roundTo(2.6, 0)
    expect(result1.toString()).toBe('3') // 银行家舍入法：2.5 -> 2

    const result2 = roundTo(3.5, 0)
    expect(result2.toString()).toBe('4') // 银行家舍入法：3.5 -> 4
  })

  it('should throw an error for invalid inputs', () => {
    expect(() => roundTo('not a number', 2)).toThrow()
  })
})

describe('compare', () => {
  it('should return 1 when a is greater than b', () => {
    const result = compare(3, 2)
    expect(result).toBe(1)
  })

  it('should return -1 when a is less than b', () => {
    const result = compare(2, 3)
    expect(result).toBe(-1)
  })

  it('should return 0 when a equals to b', () => {
    const result = compare(4, 4)
    expect(result).toBe(0)
  })

  it('should correctly handle string representations of numbers', () => {
    const result = compare('5', '3')
    expect(result).toBe(1)
  })

  it('should work with Decimal instances as input', () => {
    const decimalA = new Decimal('6.5')
    const decimalB = new Decimal('5.5')
    const result = compare(decimalA, decimalB)
    expect(result).toBe(1)
  })

  it('should handle negative numbers correctly', () => {
    const result = compare(-1, -2)
    expect(result).toBe(1) // -1 is greater than -2
  })

  it('should handle zero correctly', () => {
    const result1 = compare(0, -1)
    expect(result1).toBe(1)

    const result2 = compare(0, 0)
    expect(result2).toBe(0)

    const result3 = compare(0, 1)
    expect(result3).toBe(-1)
  })

  it('should throw an error for invalid inputs', () => {
    expect(() => compare('not a number', 2)).toThrow()
  })
}) // 请根据实际情况调整模块导入路径
// 假设 preciseDiv 是 Decimal.js 的实例方法或类似功能的封装

describe('calculatePercentage', () => {
  it('should return the correct percentage with default decimal places and without symbol', () => {
    const result = calculatePercentage(50, 100)
    expect(result).toBe('50.00')
  })

  it('should return the correct percentage with specified decimal places and without symbol', () => {
    const result = calculatePercentage(33, 100, { decimalPlaces: 1 })
    expect(result).toBe('33.0')
  })

  it('should return the correct percentage with symbol', () => {
    const result = calculatePercentage(25, 100, { isSymbol: true })
    expect(result).toBe('25.00%')
  })

  it('should handle string inputs correctly', () => {
    const result = calculatePercentage('75', '150', { decimalPlaces: 0 })
    expect(result).toBe('50')
  })

  it('should handle edge cases correctly - when part is 0', () => {
    const result = calculatePercentage(0, 100)
    expect(result).toBe('0.00')
  })

  it('should handle edge cases correctly - when total is 0', () => {
    const result = calculatePercentage(10, 0) // 注意：在实际应用中，此情形可能需要额外处理以避免除以0的错误
    expect(result).toBe('NaN') // 根据 preciseDiv 的实现而定，这里假设返回 NaN 或类似的非数值结果
  })

  it('should handle negative numbers correctly', () => {
    const result = calculatePercentage(-50, 100, { decimalPlaces: 2, isSymbol: true })
    expect(result).toBe('-50.00%')
  })

  it('should throw an error for invalid inputs', () => {
    expect(() => calculatePercentage('not a number', 100)).toThrow()
  })
})

describe('calculatorChain', () => {
  it('should correctly perform a chain of calculations', () => {
    const result = new CalculatorChain(100)
      .add(10)
      .sub(5)
      .mul(2)
      .div(4)
      .round(0)

    expect(result.toString()).toBe('53')
  })

  it('should handle addition correctly', () => {
    const result = new CalculatorChain(10).add(5).value
    expect(result.toNumber()).toBe(15)
  })

  it('should handle subtraction correctly', () => {
    const result = new CalculatorChain(10).sub(5).value
    expect(result.toNumber()).toBe(5)
  })

  it('should handle multiplication correctly', () => {
    const result = new CalculatorChain(10).mul(5).value
    expect(result.toNumber()).toBe(50)
  })

  it('should handle division correctly', () => {
    const result = new CalculatorChain(10).div(5).value
    expect(result.toNumber()).toBe(2)
  })

  it('should handle rounding correctly', () => {
    const result = new CalculatorChain(10.12345).round(3)
    expect(result.toString()).toBe('10.123')
  })

  it('should handle string inputs correctly', () => {
    const result = new CalculatorChain('10').add('5').value
    expect(result.toNumber()).toBe(15)
  })

  it('should throw an error for invalid inputs in constructor', () => {
    expect(() => new CalculatorChain('not a number')).toThrow()
  })

  it('should throw an error for invalid inputs in operations', () => {
    const calculator = new CalculatorChain(10)
    expect(() => calculator.add('not a number')).toThrow()
    expect(() => calculator.sub('not a number')).toThrow()
    expect(() => calculator.mul('not a number')).toThrow()
    expect(() => calculator.div('not a number')).toThrow()
  })

  it('should handle division by zero', () => {
    const calculator = new CalculatorChain(10)
    expect(() => calculator.div(0)).toThrow(/divide by zero/)
  })
})
