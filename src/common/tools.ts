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

/**
 * @ignore
 */
export type Curry<F extends (...args: any[]) => any> =
  F extends (...args: infer A) => infer R
    ? A extends []
      ? R
      : A extends [infer First, ...infer Rest]
        ? ((arg: First) => Curry<(...args: Rest) => R>) &
        ((...args: A) => R) // Adding direct invocation signature
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

/**
 * Function debouncing
 * A debouncing function is used to limit the frequency of executing a function within a specified time frame, preventing it from being called too frequently.
 * If the function is called again within the specified interval, the previous call will be canceled and the timer will reset.
 * @example
 * ```ts
 * import { debounce } from '@ryanuo/utils'
 * const debouncedFn = debounce(() => {
 *   console.log('Debounced function executed')
 * })
 * debouncedFn()
 * ```
 * @param fn The function to be debounced.
 * @param delay The delay in milliseconds within which repeated calls to the function will reset the timer.
 * @param immediate A boolean indicating whether the function should execute immediately on the first call. If set to true, the function executes at the start of the wait period; if false, it executes after the wait time following the last call.
 * @returns Returns a new debounced function.
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  immediate: boolean = false,
): (...args: Parameters<T>) => void {
  // Define a variable to store the ID of setTimeout
  let timer: number | null = null

  // Return a new function that processes calls to the original function according to debouncing logic
  return (...args: Parameters<T>) => {
    // If the timer variable is not null, clear the existing setTimeout to recalculate the interval
    if (timer !== null)
      window.clearTimeout(timer)

    // If the immediate parameter is set to true and the timer variable is null, execute the original function immediately
    if (immediate && timer === null)
      fn(...args)

    // Set a new setTimeout. If the function is not called again within the specified interval, execute the original function
    timer = window.setTimeout(() => {
      // If the immediate parameter is not set to true, execute the original function after the waiting period ends
      if (!immediate)
        fn(...args)

      // After execution, reset the timer variable to null so that the interval can be recalculated on the next call
      timer = null
    }, delay)
  }
}

/**
 * Creates a throttled function that only executes the original function at most once per `delay` milliseconds.
 * If `immediate` is true, the original function will be executed immediately upon the first call within the `delay` period.
 *
 * @param fn The original function to be throttled.
 * @param delay The minimum interval in milliseconds between executions of the original function.
 * @param immediate Whether to execute the original function immediately upon the first call within the `delay` period. Defaults to true.
 * @returns Returns a new throttled function.
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  immediate: boolean = true,
): (...args: Parameters<T>) => void {
  let lastExecTime = 0
  let timer: number | null = null

  return (...args: Parameters<T>) => {
    const now = Date.now()
    const timeSinceLastExec = now - lastExecTime

    const execute = () => {
      fn(...args)
      lastExecTime = now
    }

    if (immediate && timeSinceLastExec >= delay) {
      execute()
    }
    else if (timer === null) {
      timer = window.setTimeout(() => {
        if (!immediate || timeSinceLastExec < delay)
          execute()

        timer = null
      }, immediate ? delay - timeSinceLastExec : delay)
    }
  }
}
