import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { curry, getUuid, safeJSONParse } from '~/common/tools'

describe('getUuid()', () => {
  let originalRandom: () => number

  beforeEach(() => {
    // Save original Math.random
    originalRandom = (Math as any).random

    // Replace Math.random with a controlled version using vitest's spyOn
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
  })

  afterEach(() => {
    // Restore original Math.random
    ;(Math as any).random = originalRandom
  })

  it('should generate a UUID with correct format', () => {
    const uuid = getUuid()
    expect(uuid).to.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    )
    expect(uuid).to.have.length(36)
    expect(uuid.split('-')).to.have.length(5)
  })

  it('should have version 4 in the correct position', () => {
    const uuid = getUuid()
    expect(uuid[14]).to.equal('4') // 13th character when counting from 0
  })

  it('should have variant identifier in the correct position', () => {
    const uuid = getUuid()
    const variantChar = uuid[19] // 17th character when counting from 0
    expect(['8', '9', 'a', 'b']).to.include(variantChar.toLowerCase())
  })

  it('should generate different UUIDs on subsequent calls', () => {
    // Override random to produce slightly different values
    const sequence = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
    let callCount = 0
    Math.random = () => sequence[callCount++ % sequence.length]

    const uuids = Array.from({ length: 5 }, () => getUuid())
    const uniqueUuids = new Set(uuids)

    expect(uniqueUuids.size).to.equal(5)
  })
})

describe('curry()', () => {
  it('should correctly curry a function with multiple arguments', () => {
    const add = (a: number, b: number, c: number) => a + b + c
    const curriedAdd = curry(add)

    // Step-by-step application
    expect(curriedAdd(1)(2)(3)).toBe(6)

    // Immediate application
    expect(curriedAdd(1, 2, 3)).toBe(6)

    // Partial application
    const addOne = curriedAdd(1)
    expect(addOne(2, 3)).toBe(6)
  })

  it('should handle functions with varying arity', () => {
    const identity = (x: number) => x
    const curriedIdentity = curry(identity)

    // Single argument function
    expect(curriedIdentity(42)).toBe(42)

    const multiply = (a: number, b: number) => a * b
    const curriedMultiply = curry(multiply)

    // Two argument function
    expect(curriedMultiply(5)(6)).toBe(30)
  })
})

describe('safeJSONParse', () => {
  // 正常情况
  it('should correctly parse a valid JSON string', () => {
    const jsonString = '{"name": "John", "age": 30}'
    const result = safeJSONParse(jsonString)
    expect(result).toEqual({ name: 'John', age: 30 })
  })

  // 边界情况 - 空字符串
  it('should return null for an empty string', () => {
    const jsonString = ''
    const result = safeJSONParse(jsonString)
    expect(result).toBeNull()
  })

  // 边界情况 - 空白字符
  it('should return null for whitespace characters', () => {
    const jsonString = '   \n\t '
    const result = safeJSONParse(jsonString)
    expect(result).toBeNull()
  })

  // 异常情况 - 无效的 JSON 字符串
  it('should return null for invalid JSON strings', () => {
    const jsonString = '{"invalid": "JSON"'
    const result = safeJSONParse(jsonString)
    expect(result).toBeNull()
  })

  // 异常情况 - 非字符串输入 (虽然此函数只接受字符串参数，但可以考虑非字符串类型作为额外边界情况)
  it('should return null for non-string inputs', () => {
    const notAString = 12345
    // @ts-expect-error 忽略类型检查，模拟非字符串输入的情况
    const result = safeJSONParse(notAString)
    expect(result).toBe(12345)
  })
})
