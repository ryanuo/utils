import { describe, expect, it } from 'vitest'
import { binarySearch, bubbleSort, fibonacciDP, fibonacciRecursive, isPrime, quickSort } from '../../src/algorithm'

describe('bubbleSort', () => {
  it('should sort an array correctly', () => {
    const unsorted = [5, 3, 8, 4, 2]
    const sorted = bubbleSort(unsorted)
    expect(sorted).toEqual([2, 3, 4, 5, 8])
  })

  it('should handle an empty array', () => {
    const sorted = bubbleSort([])
    expect(sorted).toEqual([])
  })

  it('should handle a single-element array', () => {
    const sorted = bubbleSort([1])
    expect(sorted).toEqual([1])
  })
})

describe('quickSort', () => {
  it('should sort an array correctly', () => {
    const unsorted = [5, 3, 8, 4, 2]
    const sorted = quickSort(unsorted)
    expect(sorted).toEqual([2, 3, 4, 5, 8])
  })

  it('should handle an empty array', () => {
    const sorted = quickSort([])
    expect(sorted).toEqual([])
  })

  it('should handle a single-element array', () => {
    const sorted = quickSort([1])
    expect(sorted).toEqual([1])
  })
})

describe('binarySearch', () => {
  it('should find the correct index of the target', () => {
    const arr = [1, 2, 3, 4, 5]
    const index = binarySearch(arr, 3)
    expect(index).toBe(2)
  })

  it('should return -1 if the target is not in the array', () => {
    const arr = [1, 2, 3, 4, 5]
    const index = binarySearch(arr, 6)
    expect(index).toBe(-1)
  })

  it('should work with an empty array', () => {
    const index = binarySearch([], 1)
    expect(index).toBe(-1)
  })
})

describe('isPrime', () => {
  it('should return true for prime numbers', () => {
    expect(isPrime(11)).toBe(true)
  })

  it('should return false for non-prime numbers', () => {
    expect(isPrime(15)).toBe(false)
  })

  it('should return false for numbers less than or equal to 1', () => {
    expect(isPrime(1)).toBe(false)
  })
})

describe('fibonacciDP', () => {
  it('should return the nth Fibonacci number', () => {
    expect(fibonacciDP(10)).toBe(55)
  })

  it('should handle n = 0', () => {
    expect(fibonacciDP(0)).toBe(0)
  })

  it('should handle n = 1', () => {
    expect(fibonacciDP(1)).toBe(1)
  })
})

describe('fibonacciRecursive', () => {
  it('should return the nth Fibonacci number for small values of n', () => {
    expect(fibonacciRecursive(0)).toBe(0)
    expect(fibonacciRecursive(1)).toBe(1)
    expect(fibonacciRecursive(2)).toBe(1)
    expect(fibonacciRecursive(3)).toBe(2)
    expect(fibonacciRecursive(4)).toBe(3)
    expect(fibonacciRecursive(5)).toBe(5)
    expect(fibonacciRecursive(6)).toBe(8)
    expect(fibonacciRecursive(7)).toBe(13)
    expect(fibonacciRecursive(8)).toBe(21)
    expect(fibonacciRecursive(9)).toBe(34)
    expect(fibonacciRecursive(10)).toBe(55)
  })

  it('should handle the base cases correctly', () => {
    expect(fibonacciRecursive(0)).toBe(0)
    expect(fibonacciRecursive(1)).toBe(1)
  })

  it('should handle negative input gracefully', () => {
    // 根据具体实现调整预期行为。如果函数未定义负数行为，则可以考虑抛出错误或返回特殊值。
    // 这里假设对于负数输入，期望的行为是返回0。
    expect(fibonacciRecursive(-1)).toBe(0)
    expect(fibonacciRecursive(-10)).toBe(0)
  })

  it('should work with larger inputs', () => {
    // 注意：由于递归版本的效率问题，选择一个合理的较大值进行测试。
    // 如果您的环境支持尾调用优化（Tail Call Optimization），可以尝试更大的值。
    expect(fibonacciRecursive(15)).toBe(610)
  })
})
