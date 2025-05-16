/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from 'vitest'
import type { StorageOptions } from '~/browser/storage'
import { safeStorage } from '~/browser/storage' // 请替换为你的实际模块路径

describe('safeStorage', () => {
  const testKey = 'testKey'
  const testValue = { name: 'John', age: 30 }
  const expiresOption: StorageOptions = { storage: 'local', expires: 500 } // 500ms 过期时间

  describe('get method', () => {
    it('should return stored value for valid key', () => {
      safeStorage.set(testKey, testValue)
      const result = safeStorage.get<typeof testValue>(testKey)
      expect(result).toEqual(testValue)
    })

    it('should return null for non-existent key', () => {
      const result = safeStorage.get<{ any: any }>('nonExistentKey')
      expect(result).toBeNull()
    })

    it('should return null for expired item', async () => {
      safeStorage.set(testKey, testValue, expiresOption)
      await new Promise(resolve => setTimeout(resolve, 600)) // 等待过期
      const result = safeStorage.get<typeof testValue>(testKey)
      expect(result).toBeNull()
    })
  })

  describe('set method', () => {
    it('should successfully set a value', () => {
      const result = safeStorage.set(testKey, testValue)
      expect(result).toBe(true)
    })

    it('should store an item with expiration', () => {
      const result = safeStorage.set(testKey, testValue, expiresOption)
      expect(result).toBe(true)

      const storedItem = JSON.parse(localStorage.getItem(testKey) || '{}')
      expect(storedItem.expires).toBeDefined()
    })
  })

  describe('remove method', () => {
    it('should remove an existing item', () => {
      safeStorage.set(testKey, testValue)
      safeStorage.remove(testKey)
      const result = safeStorage.get<typeof testValue>(testKey)
      expect(result).toBeNull()
    })

    it('should do nothing for non-existent key', () => {
      safeStorage.remove('nonExistentKey') // 不应抛出异常
    })
  })

  describe('clear method', () => {
    it('should clear all items in local storage', () => {
      safeStorage.set(testKey, testValue)
      safeStorage.clear()
      const result = safeStorage.get<typeof testValue>(testKey)
      expect(result).toBeNull()
    })

    it('should clear all items in session storage when specified', () => {
      safeStorage.set(testKey, testValue, { storage: 'session' })
      safeStorage.clear({ storage: 'session' })
      const result = safeStorage.get<typeof testValue>(testKey, { storage: 'session' })
      expect(result).toBeNull()
    })
  })
})
