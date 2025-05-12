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
