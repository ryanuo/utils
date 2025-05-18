import { safeJSONParse } from '../common'

/**
 * @category SafeStorage
 */
interface StorageOptions {
  /**
   * Storage type, either 'local' or 'session'
   * @default 'local'
   */
  storage?: 'local' | 'session'
  /**
   * Expiration time in milliseconds
   * @default undefined (no expiration)
   */
  expires?: number
}

/**
 * @category SafeStorage
 */
export interface SafeStorage {
  /**
   * Get stored value by key
   * @param key Storage key
   * @returns Stored value or null if not found/expired
   */
  get: (<T>(key: string) => T | null) & (<T>(key: string, options: StorageOptions) => T | null)

  /**
   * Set value in storage
   * @param key Storage key
   * @param value Value to store
   * @returns true if successful, false otherwise
   */
  set: ((key: string, value: any) => boolean) & ((key: string, value: any, options: StorageOptions) => boolean)

  /**
   * Remove item from storage
   * @param key Storage key
   */
  remove: ((key: string) => void) & ((key: string, options: StorageOptions) => void)

  /**
   * Clear all items from storage
   */
  clear: (() => void) & ((options: StorageOptions) => void)
}

function getStorage(type: 'local' | 'session' = 'local') {
  return type === 'local' ? localStorage : sessionStorage
}

function withExpiration(value: any, expires?: number) {
  if (!expires)
    return value

  const now = new Date().getTime()
  const item = {
    value,
    expires: now + expires,
  }
  return item
}

function checkExpiration(item: any) {
  if (!item || typeof item !== 'object')
    return item

  if ('expires' in item && 'value' in item) {
    const now = new Date().getTime()
    if (now > item.expires)
      return null // expired

    return item.value
  }

  return item
}

/**
 * A simple storage wrapper that uses localStorage and sessionStorage.
 * @example
 * ```ts twoslash
 * import { safeStorage } from '@ryanuo/utils'
 * // Basic usage (localStorage)
 * safeStorage.set('user', { name: 'John' })
 * const user = safeStorage.get<{ name: string }>('user')
 * // With sessionStorag
 * safeStorage.set('token', 'abc123', { storage: 'session' })
 * const token = safeStorage.get<string>('token', { storage: 'session' })
 * // With expiration (1 hour)
 * safeStorage.set('tempData', { foo: 'bar' }, { expires: 3600000 })
 * // Remove from sessionStorag
 * safeStorage.remove('token', { storage: 'session' })
 * // Clear sessionStorag
 * safeStorage.clear({ storage: 'session' })
 * ```
 * @category SafeStorage
 */
const safeStorage: SafeStorage = {
  get<T>(key: string, options: StorageOptions = {}): T | null {
    try {
      const { storage = 'local' } = options
      const selectedStorage = getStorage(storage)
      const data = selectedStorage.getItem(key)

      if (!data)
        return null

      const parsed = safeJSONParse(data)
      const result = checkExpiration(parsed)

      // Remove if expired
      if (result === null)
        selectedStorage.removeItem(key)

      return result as T | null
    }
    catch {
      return null
    }
  },

  set(key: string, value: any, options: StorageOptions = {}): boolean {
    try {
      const { storage = 'local', expires } = options
      const selectedStorage = getStorage(storage)

      const item = withExpiration(value, expires)
      selectedStorage.setItem(key, JSON.stringify(item))
      return true
    }
    catch {
      return false
    }
  },

  remove(key: string, options: StorageOptions = {}): void {
    const { storage = 'local' } = options
    const selectedStorage = getStorage(storage)
    selectedStorage.removeItem(key)
  },

  clear(options: StorageOptions = {}): void {
    const { storage = 'local' } = options
    const selectedStorage = getStorage(storage)
    selectedStorage.clear()
  },
}

export { safeStorage }
export type { StorageOptions }
