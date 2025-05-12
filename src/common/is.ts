/**
 * @param value - The value to check
 * Checks if the value is a boolean
 * @example
 * ```ts
 * import { isBoolean } from '@ryanuo/utils'
 * isBoolean(true) // true
 * isBoolean(false) // true
 * isBoolean(1) // false
 * isBoolean('true') // false
 * isBoolean(null) // false
 * isBoolean(undefined) // false
 * isBoolean({}) // false
 * isBoolean([]) // false
 * ```
 * @returns Whether the value is a boolean
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

/**
 * Checks if the value is a number
 * @param value - The value to check
 * @example
 * ```ts
 * import { isNumber } from '@ryanuo/utils'
 * isNumber(123) // true
 * isNumber('123') // false
 * ```
 * @returns Whether the value is a number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}
