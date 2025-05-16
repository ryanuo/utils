import { describe, expect, it } from 'vitest'
import { linearRegression, normalizeData, normalizeMinMax } from '~/ai/machine'

/**
 * normalizeData 测试
 */
describe('normalizeData', () => {
  it('should normalize the data correctly given mean and standard deviation', () => {
    // Given
    const data = [1, 2, 3, 4, 5]
    const mean = 3
    const stdDev = Math.sqrt(2) // 标准差是方差的平方根，这里的方差为 2

    // When
    const normalized = normalizeData(data, mean, stdDev)

    // Then
    expect(normalized).toEqual([
      -2 / Math.sqrt(2), // (1-3) / sqrt(2)
      -1 / Math.sqrt(2), // (2-3) / sqrt(2)
      0, // (3-3) / sqrt(2)
      1 / Math.sqrt(2), // (4-3) / sqrt(2)
      2 / Math.sqrt(2), // (5-3) / sqrt(2)
    ])
  })

  it('should handle a case where all elements are the same', () => {
    // Given
    const data = [10, 10, 10, 10]
    const mean = 10
    const stdDev = 0 // 当所有元素相同时，理论上标准差应该是0，但在实际操作中我们不能除以0

    // When & Then
    expect(() => normalizeData(data, mean, stdDev)).toThrow(/division by zero/)
  })

  it('should return an empty array if the input array is empty', () => {
    // Given
    const data: number[] = []
    const mean = 0
    const stdDev = 1

    // When
    const normalized = normalizeData(data, mean, stdDev)

    // Then
    expect(normalized).toEqual([])
  })
})

/**
 * normalizeMinMax 测试
 */
describe('normalizeMinMax', () => {
  it('should correctly normalize the data to [0, 1] interval', () => {
    // Given
    const data = [1, 2, 3, 4, 5]

    // When
    const normalized = normalizeMinMax(data)

    // Then
    expect(normalized).toEqual([0, 0.25, 0.5, 0.75, 1])
  })

  it('should handle a case where all elements are the same', () => {
    // Given
    const data = [5, 5, 5, 5]

    // When
    const normalized = normalizeMinMax(data)

    // Then
    expect(normalized.every(value => value === 0)).toBe(true) // 当所有元素相同时，归一化后都应为0
  })

  it('should return an empty array if the input array is empty', () => {
    // Given
    const data: any = []

    // When
    const normalized = normalizeMinMax(data)

    // Then
    expect(normalized).toEqual([])
  })

  it('should handle negative values and correctly normalize them', () => {
    // Given
    const data = [-4, -2, 0, 2, 4]

    // When
    const normalized = normalizeMinMax(data)

    // Then
    expect(normalized).toEqual([0, 0.25, 0.5, 0.75, 1])
  })
}) // 请根据实际路径导入你的函数

/**
 * Linear Regression 测试
 */
describe('linearRegression', () => {
  it('should correctly predict the next value in a simple increasing sequence', () => {
    const data = [1, 2, 3, 4]
    const prediction = linearRegression(data)
    expect(prediction).toBeCloseTo(5) // 预期的下一个值是5
  })

  it('should handle and predict the next value for a constant sequence', () => {
    const data = [5, 5, 5, 5]
    const prediction = linearRegression(data)
    expect(prediction).toBe(5) // 对于常数序列，斜率为0，预期值应与输入相同
  })

  it('should return NaN if the input array is empty', () => {
    const data: number[] = []
    const prediction = linearRegression(data)
    expect(Number.isNaN(prediction)).toBe(true) // 空数组应返回NaN
  })

  it('should correctly predict the next value with negative numbers', () => {
    const data = [-4, -2, 0, 2]
    const prediction = linearRegression(data)
    expect(prediction).toBeCloseTo(4) // 基于给定的数据点，下一个值应该是4
  })

  it('should handle single element arrays by returning that element as prediction', () => {
    const data = [7]
    const prediction = linearRegression(data)
    expect(prediction).toBe(7) // 单元素数组，预期输出即为该元素
  })
})
