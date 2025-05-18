/**
 * 封装通用或特定领域算法，解决计算、排序、加密等逻辑问题。
 * @module algorithm
 */

/**
 * 冒泡排序（Bubble Sort）
 * @category Algorithm
 * @example
 * ```ts twoslash
 * import { bubbleSort } from '@ryanuo/utils'
 * const sorted = bubbleSort([5, 3, 8, 4, 2])
 * console.log(sorted)  // [2, 3, 4, 5, 8]
 * ```
 * @param arr 数组
 * @returns 排序后的数组
 */
export function bubbleSort(arr: number[]): number[] {
  const n = arr.length
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1])
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]] // 交换
    }
  }
  return arr
}

/**
 * 快速排序（Quick Sort）
 * @category Algorithm
 * @example
 * ```ts twoslash
 * import { quickSort } from '@ryanuo/utils'
 * const sorted = quickSort([5, 3, 8, 4, 2])
 * console.log(sorted)  // [2, 3, 4, 5, 8]
 * ```
 * @param arr 数组
 * @returns 排序后的数组
 */
export function quickSort(arr: number[]): number[] {
  if (arr.length <= 1)
    return arr
  const pivot = arr[0]
  const left = arr.filter(x => x < pivot)
  const right = arr.filter(x => x > pivot)
  return [...quickSort(left), pivot, ...quickSort(right)]
}

/**
 * 二分查找（Binary Search）
 * @category Algorithm
 * @example
 * ```ts twoslash
 * import { binarySearch } from '@ryanuo/utils'
 * const index = binarySearch([1, 2, 3, 4, 5], 3)
 * console.log(index)  // 2
 * ```
 * @param arr 已排序的数组
 * @param target 查找目标
 * @returns 如果找到返回索引，否则返回 -1
 */
export function binarySearch(arr: number[], target: number): number {
  let left = 0
  let right = arr.length - 1
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] === target)
      return mid
    if (arr[mid] < target)
      left = mid + 1
    else right = mid - 1
  }
  return -1 // 如果找不到返回 -1
}

/**
 * 判断一个数是否为质数（Prime Number Check）
 * @category Algorithm
 * @example
 * ```ts twoslash
 * import { isPrime } from '@ryanuo/utils'
 * console.log(isPrime(11))  // true
 * console.log(isPrime(15))  // false
 * ```
 * @param num 数字
 * @returns 是否为质数
 */
export function isPrime(num: number): boolean {
  if (num <= 1)
    return false
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0)
      return false
  }

  return true
}

/**
 * 斐波那契数列（Fibonacci Sequence） 动态规划
 * @category Algorithm
 * @example
 * ```ts twoslash
 * import { fibonacciDP } from '@ryanuo/utils'
 * console.log(fibonacciDP(10))  // 55
 * ```
 * @param n 数列的索引
 * @returns 斐波那契数列的第 n 项
 */
export function fibonacciDP(n: number): number {
  const dp = [0, 1]
  for (let i = 2; i <= n; i++)
    dp[i] = dp[i - 1] + dp[i - 2]

  return dp[n]
}

/**
 * 斐波那契数列（递归版）
 * @category Algorithm
 * @example
 * ```ts twoslash
 * import { fibonacciRecursive } from '@ryanuo/utils'
 * console.log(fibonacciRecursive(10))  // 55
 * ```
 * @param n 数列的索引
 * @returns 斐波那契数列的第 n 项，若 n 为负数则返回 0
 */
export function fibonacciRecursive(n: number): number {
  if (n < 0)
    return 0

  if (n <= 1)
    return n

  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2)
}
