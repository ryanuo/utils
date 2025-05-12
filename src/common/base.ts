/**
 * to string type of value [Object.prototype.toString]
 * @example
 * ```ts
 * import { toString } from '@ryanuo/utils'
 * toString({}) // '[object Object]'
 * ```
 * @param v - The value to check
 * @returns The string representation of the value
 */
export const toString = (v: any) => Object.prototype.toString.call(v)
