import { toString } from './base'

/**
 * Checks if the value is a boolean
 * @param value - The value to check
 * @example
 * ```ts
 * import { isBoolean } from '@ryanuo/utils'
 * isBoolean(true) // true
 * isBoolean(false) // true
 * isBoolean(1) // false
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

/**
 * Checks if the value is a function
 * @example
 * ```ts
 * import { isFunction } from '@ryanuo/utils'
 * isFunction(() => {}) // true
 * isFunction(123) // false
 * isFunction('123') // false
 * ```
 * @param val - The value to check
 * @returns Whether the value is a function
 */
export const isFunction = <T extends Function>(val: any): val is T => typeof val === 'function'

/**
 * Checks if the value is an string
 * @example
 * ```ts
 * import { isString } from '@ryanuo/utils'
 * isString('123') // true
 * isString(123) // false
 * ```
 * @param val - The value to check
 * @returns Whether the value is an string
 */
export const isString = (val: unknown): val is string => typeof val === 'string'

/**
 * Checks if the value is an object
 * @example
 * ```ts
 * import { isObject } from '@ryanuo/utils'
 * isObject({}) // true
 * isObject([]) // false
 * ```
 * @param val - The value to check
 * @returns Whether the value is an object
 */
export const isObject = (val: any): val is object => toString(val) === '[object Object]'

/**
 * Checks if the value is an undefined
 * @example
 * ```ts
 * import { isUndefined } from '@ryanuo/utils'
 * isUndefined(undefined) // true
 * isUndefined(null) // false
 * ```
 * @param val - The value to check
 * @returns Whether the value is an undefined
 */
export const isUndefined = (val: any): val is undefined => toString(val) === '[object Undefined]'

/**
 * Checks if the value is an null
 * @example
 * ```ts
 * import { isNull } from '@ryanuo/utils'
 * isNull(null) // true
 * isNull(undefined) // false
 * ```
 * @param val - The value to check
 * @returns Whether the value is an null
 */
export const isNull = (val: any): val is null => toString(val) === '[object Null]'

/**
 * Checks if the value is an regexp
 * @example
 * ```ts
 * import { isRegExp } from '@ryanuo/utils'
 * isRegExp(/test/) // true
 * isRegExp('test') // false
 * ```
 * @param val - The value to check
 * @returns Whether the value is an regexp
 */
export const isRegExp = (val: any): val is RegExp => toString(val) === '[object RegExp]'

/**
 * Checks if the value is an date
 * @example
 * ```ts
 * import { isDate } from '@ryanuo/utils'
 * isDate(new Date()) // true
 * isDate('2023-01-01') // false
 * isDate(123) // false
 * ```
 * @param val - The value to check
 * @returns Whether the value is an date
 */
export const isDate = (val: any): val is Date => toString(val) === '[object Date]'

/**
 * Checks if the current environment is a browser
 * @example
 * ```ts
 * import { isBrowser } from '@ryanuo/utils'
 * isBrowser() // true
 * ```
 * @returns Whether the current environment is a browser
 */
export function isBrowser(): boolean {
  // @ts-expect-error: 'window' and 'document' may not exist in non-browser environments
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}
