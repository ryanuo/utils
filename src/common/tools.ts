/**
 * Generate a unique UUID
 * UUID (Universally Unique Identifier) is a standard used in distributed systems to uniquely identify information
 * This function implements a simple UUID generation algorithm, primarily used to generate unique identifiers for use in applications
 * @example
 * ```ts
 * import { getUuid } from '@ryanuo/utils'
 * console.log(getUuid()) // xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 * ```
 * @returns {string} The generated UUID string in the format 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
 */
export function getUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

type Curry<F extends (...args: any[]) => any> =
  F extends (...args: infer A) => infer R
    ? A extends []
      ? R
      : A extends [infer First, ...infer Rest]
        ? ((arg: First) => Curry<(...args: Rest) => R>) &
        ((...args: A) => R) // 添加直接调用签名
        : R
    : never
/**
 * Converts a function into a curried function.
 * The feature of a curried function is that it can receive one or more arguments,
 * and returns a new function until all required arguments are received, then executes the original function.
 * @example
 * ```ts
 * import { curry } from '@ryanuo/utils'
 * const add = (a: number, b: number) => a + b
 * const curriedAdd = curry(add)
 * console.log(curriedAdd(1)(2)) // 3
 * console.log(curriedAdd(1, 2)) // 3
 * ```
 * @param fn The function to be converted; can be any type of function.
 * @returns Returns a curried function capable of gradually receiving arguments until the original function's requirements are satisfied.
 */
export function curry<F extends (...args: any[]) => any>(fn: F): Curry<F> {
  return function curried(...args: any[]): any {
    if (args.length >= fn.length)
      return fn(...args)

    return function (...nextArgs: any[]) {
      const combinedArgs = [...args, ...nextArgs]
      return curried(...combinedArgs)
    }
  } as Curry<F>
}

/**
 * Safely parses a JSON string
 * @example
 * ```ts
 * import { safeParseJSON } from '@ryanuo/utils'
 * const json = '{"name": "John", "age": 30}'
 * const obj = safeParseJSON(json)
 * console.log(obj) // { name: 'John', age: 30 }
 * ```
 * @param json The JSON string to be parsed
 * @returns A successfully parsed JSON object, or null if parsing fails
 */
export function safeJSONParse(json: string) {
  try {
    return JSON.parse(json)
  }
  catch (e) {
    return null
  }
}
