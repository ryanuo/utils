import { describe, expect, it } from 'vitest'
import { getTypeName, toString } from '../../src/common/base'

describe('getTypeName', () => {
  it('should return "object" for plain objects', () => {
    expect(getTypeName({})).toBe('object')
  })

  it('should return "array" for arrays', () => {
    expect(getTypeName([])).toBe('array')
  })

  it('should return "string" for strings', () => {
    expect(getTypeName('')).toBe('string')
  })

  it('should return "number" for numbers', () => {
    expect(getTypeName(1)).toBe('number')
  })

  it('should return "null" for null', () => {
    expect(getTypeName(null)).toBe('null')
  })

  it('should return "undefined" for undefined', () => {
    expect(getTypeName(undefined)).toBe('undefined')
  })

  it('should return "function" for functions', () => {
    expect(getTypeName(() => {})).toBe('function')
  })

  it('should return "boolean" for booleans', () => {
    expect(getTypeName(true)).toBe('boolean')
    expect(getTypeName(false)).toBe('boolean')
  })

  it('should return "date" for Date objects', () => {
    expect(getTypeName(new Date())).toBe('date')
  })

  it('should return "regexp" for RegExp objects', () => {
    expect(getTypeName(/test/)).toBe('regexp')
  })
})

describe('toString', () => {
  it('should return "[object Object]" for plain objects', () => {
    expect(toString({})).toBe('[object Object]')
  })

  it('should return "[object Array]" for arrays', () => {
    expect(toString([])).toBe('[object Array]')
  })

  it('should return "[object String]" for strings', () => {
    expect(toString('')).toBe('[object String]')
  })

  it('should return "[object Number]" for numbers', () => {
    expect(toString(1)).toBe('[object Number]')
  })

  it('should return "[object Null]" for null', () => {
    expect(toString(null)).toBe('[object Null]')
  })

  it('should return "[object Undefined]" for undefined', () => {
    expect(toString(undefined)).toBe('[object Undefined]')
  })

  it('should return "[object Function]" for functions', () => {
    expect(toString(() => {})).toBe('[object Function]')
  })

  it('should return "[object Boolean]" for booleans', () => {
    expect(toString(true)).toBe('[object Boolean]')
    expect(toString(false)).toBe('[object Boolean]')
  })

  it('should return "[object Date]" for Date objects', () => {
    expect(toString(new Date())).toBe('[object Date]')
  })

  it('should return "[object RegExp]" for RegExp objects', () => {
    expect(toString(/test/)).toBe('[object RegExp]')
  })
})
