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

/**
 * Get the type name of the value
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
