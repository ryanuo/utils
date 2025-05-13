import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  isBoolean,
  isBrowser,
  isDate,
  isEmptyObject,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isRegExp,
  isString,
  isUndefined,
} from '../../src'

describe('isBoolean', () => {
  it('should return true for boolean values', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
  })

  it('should return false for non-boolean values', () => {
    expect(isBoolean(1)).toBe(false)
    expect(isBoolean('true')).toBe(false)
  })
})

describe('isNumber', () => {
  it('should return true for numbers', () => {
    expect(isNumber(123)).toBe(true)
    expect(isNumber(0)).toBe(true)
  })

  it('should return false for non-numbers', () => {
    expect(isNumber('123')).toBe(false)
    expect(isNumber(Number.NaN)).toBe(false)
  })
})

describe('isFunction', () => {
  it('should return true for functions', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(() => {})).toBe(true)
  })

  it('should return false for non-functions', () => {
    expect(isFunction(123)).toBe(false)
    expect(isFunction('123')).toBe(false)
  })
})

describe('isString', () => {
  it('should return true for strings', () => {
    expect(isString('123')).toBe(true)
    expect(isString('')).toBe(true)
  })

  it('should return false for non-strings', () => {
    expect(isString(123)).toBe(false)
    expect(isString(null)).toBe(false)
  })
})

describe('isObject', () => {
  it('should return true for objects', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ key: 'value' })).toBe(true)
  })

  it('should return false for non-objects', () => {
    expect(isObject([])).toBe(false)
    expect(isObject(null)).toBe(false)
  })
})

describe('isUndefined', () => {
  it('should return true for undefined', () => {
    expect(isUndefined(undefined)).toBe(true)
  })

  it('should return false for non-undefined values', () => {
    expect(isUndefined(null)).toBe(false)
    expect(isUndefined(0)).toBe(false)
  })
})

describe('isNull', () => {
  it('should return true for null', () => {
    expect(isNull(null)).toBe(true)
  })

  it('should return false for non-null values', () => {
    expect(isNull(undefined)).toBe(false)
    expect(isNull(0)).toBe(false)
  })
})

describe('isRegExp', () => {
  it('should return true for regular expressions', () => {
    expect(isRegExp(/test/)).toBe(true)
  })

  it('should return false for non-regular expressions', () => {
    expect(isRegExp('test')).toBe(false)
    expect(isRegExp(123)).toBe(false)
  })
})

describe('isDate', () => {
  it('should return true for Date objects', () => {
    expect(isDate(new Date())).toBe(true)
  })

  it('should return false for non-Date objects', () => {
    expect(isDate('2023-01-01')).toBe(false)
    expect(isDate(123)).toBe(false)
  })
})

describe('isBrowser', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should return true in browser environment', () => {
    // 模拟浏览器环境
    vi.stubGlobal('window', {})
    vi.stubGlobal('document', {})
    expect(isBrowser()).toBe(true)
  })

  it('should return false in non-browser environment', () => {
    vi.stubGlobal('window', false)
    expect(isBrowser()).toBe(false)
  })
})

describe('isEmptyObject', () => {
  it('should return true for an empty object', () => {
    const obj = {}
    expect(isEmptyObject(obj)).toBe(true)
  })

  it('should return false for a non-empty object', () => {
    const obj = { a: 1 }
    expect(isEmptyObject(obj)).toBe(false)
  })

  it('should return false for an array', () => {
    const arr: any[] = []
    // 根据 isEmptyObject 的逻辑，数组应该返回 false，因为它不是对象
    expect(isEmptyObject(arr as any)).toBe(false) // 类型断言以避免编译错误
  })

  it('should return false for a non-object value', () => {
    const values = [null, undefined, 0, '', false]
    values.forEach((val) => {
      expect(isEmptyObject(val as any)).toBe(false) // 类型断言以避免编译错误
    })
  })

  it('should return false for a function', () => {
    const func = function () {}
    expect(isEmptyObject(func as any)).toBe(false) // 类型断言以避免编译错误
  })

  it('should correctly identify objects with prototype properties', () => {
    const objWithProto = Object.create(null)
    expect(isEmptyObject(objWithProto)).toBe(true)

    Object.defineProperty(objWithProto, 'key', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: 'value',
    })
    expect(isEmptyObject(objWithProto)).toBe(true)
  })
})
