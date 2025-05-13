import { toString } from './base'

/**
 * Checks if the value is a boolean
 * @param value - The value to check
 * @category is
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
 * @category is
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
 * @category is
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
 * @category is
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
 * @category is
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
 * Check if an object is empty.
 * @example
 * ```ts
 * import { isEmptyObject } from '@ryanuo/utils'
 * isEmptyObject({}) // true
 * isEmptyObject([]) // true
 * isEmptyObject({ a: 1 }) // false
 * ```
 */
export const isEmptyObject = (val: any): val is object => isObject(val) && Object.keys(val).length === 0

/**
 * Checks if the value is an undefined
 * @category is
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
 * @category is
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
 * @category is
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
 * @category is
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
 * @category is
 * @example
 * ```ts
 * import { isBrowser } from '@ryanuo/utils'
 * isBrowser() // true
 * ```
 * @returns Whether the current environment is a browser
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}
