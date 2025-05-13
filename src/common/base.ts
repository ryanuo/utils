/**
 * to string type of value [Object.prototype.toString]
 * @category type
 * @example
 * ```ts
 * import { toString } from '@ryanuo/utils'
 * toString({}) // '[object Object]'
 * ```
 * @param v - The value to check
 * @returns The string representation of the value
 */
export const toString = (v: any) => Object.prototype.toString.call(v)

/**
 * Get the type name of the value
 * @category type
 * @example
 * ```ts
 * import { getTypeName } from '@ryanuo/utils'
 * getTypeName({}) // 'object'
 * getTypeName([]) // 'array'
 * getTypeName('') // 'string'
 * getTypeName(1) // 'number'
 * ```
 * @param v - get type name
 * @returns The type name of the value
 */
export function getTypeName(v: any) {
  const type = toString(v)
  return type.slice(8, -1).toLowerCase()
}

/**
 * Convert a number to a fixed value with specified decimal places.
 * @category type
 * @example
 * ```ts
 * import { numberToFixed } from '@ryanuo/utils'
 * numberToFixed(1.23456) // 1.2346
 * numberToFixed(1.23456, 2) // 1.23
 * numberToFixed(1.23456, 3) // 1.235
 * ```
 * @param num The number to be converted.
 * @param fixed The number of decimal places, defaults to 4.
 * @returns The converted number with the specified number of decimal places.
 */
export function numberToFixed(num: number, fixed: number = 4) {
  // Check if the input number is zero or NaN, in which case return 0 directly.
  if (num === 0 || Number.isNaN(num))
    return 0

  // Use the toFixed method of the Number object to convert the input number to a string representation with the specified number of decimal places,
  // then convert it back to a number type and return it.
  return Number(num.toFixed(fixed))
}

/**
 * 安全的深拷贝（处理循环引用）
 * @category type
 * @example
 * ```ts
 * import { deepClone } from '@ryanuo/utils'
 * const obj = { a: 1, b: { c: 2 } }
 * const cloneObj = deepClone(obj)
 * console.log(cloneObj) // { a: 1, b: { c: 2 } }
 * ```
 * @param obj 源对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object')
    return obj

  if (obj instanceof Date)
    return new Date(obj.getTime()) as unknown as T

  if (obj instanceof RegExp)
    return new RegExp(obj.source, obj.flags) as unknown as T

  if (Array.isArray(obj))
    return obj.map(item => deepClone(item)) as unknown as T

  const clone = {} as T
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key))
      clone[key] = deepClone(obj[key])
  }
  return clone
}
