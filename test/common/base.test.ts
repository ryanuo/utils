import { describe, expect, it } from 'vitest'
import { deepClone, getTypeName, numberToFixed, toString } from '~/common/base'

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

describe('numberToFixed', () => {
  // 默认保留4位小数
  it('should round to 4 decimal places by default', () => {
    expect(numberToFixed(1.23456)).toBe(1.2346)
  })

  // 指定保留2位小数
  it('should round to specified decimal places', () => {
    expect(numberToFixed(1.23456, 2)).toBe(1.23)
  })

  // 指定保留3位小数并测试四舍五入
  it('should correctly round up with 3 decimal places', () => {
    expect(numberToFixed(1.23456, 3)).toBe(1.235)
  })

  // 输入为0时返回0
  it('should return 0 when input is 0', () => {
    expect(numberToFixed(0, 2)).toBe(0)
  })

  // 输入为NaN时返回0
  it('should return 0 when input is NaN', () => {
    expect(numberToFixed(Number.NaN, 2)).toBe(0)
  })

  // 测试进位到整数
  it('should round up to integer when necessary', () => {
    expect(numberToFixed(9.99999, 4)).toBe(10)
  })

  // 去除多余的小数0
  it('should remove trailing zeros after decimal', () => {
    expect(numberToFixed(1.00000, 4)).toBe(1)
  })

  // 支持负数
  it('should handle negative numbers correctly', () => {
    expect(numberToFixed(-1.23456, 3)).toBe(-1.235)
  })
})

describe('deepClone', () => {
  it('should clone a simple object', () => {
    const obj = { a: 1, b: { c: 2 } }
    const clonedObj = deepClone(obj)
    expect(clonedObj).toEqual(obj)
    expect(clonedObj).not.toBe(obj) // 确保不是同一个引用
  })

  it('should clone arrays', () => {
    const arr = [1, [2, 3], 4]
    const clonedArr = deepClone(arr)
    expect(clonedArr).toEqual(arr)
    expect(clonedArr[1]).not.toBe(arr[1]) // 检查嵌套数组是否也被克隆
  })

  it('should handle special types like Date and RegExp', () => {
    const date = new Date()
    const regExp = /test/g
    const obj = { date, regExp }

    const clonedObj = deepClone(obj)
    expect(clonedObj.date.getTime()).toBe(date.getTime())
    expect(clonedObj.regExp.source).toBe(regExp.source)
    expect(clonedObj.regExp.flags).toBe(regExp.flags)
  })

  it('should not affect functions or undefined values', () => {
    // eslint-disable-next-line no-console
    const func = () => console.log('test')
    const undef = undefined
    const obj = { func, undef }

    const clonedObj = deepClone(obj)
    expect(clonedObj.func).toBe(func) // 函数应该是浅拷贝
    expect(clonedObj.undef).toBe(undef) // undefined 应保持不变
  })
})
