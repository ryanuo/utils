import { describe, expect, it } from 'vitest'
import { compress, decompress, decrypt, encrypt, xor } from '../../src/common/secret'

describe('crypto & Compress Utils', () => {
  const plainText = 'Hello World! 123'
  const key = 'mysecret'

  it('xor should be reversible', () => {
    const encrypted = xor(plainText, key)
    const decrypted = xor(encrypted, key)
    expect(decrypted).toBe(plainText)
  })

  it('encrypt and decrypt should be reversible', () => {
    const enc = encrypt(plainText, key)
    const dec = decrypt(enc, key)
    expect(dec).toBe(plainText)
  })

  it('encrypt produces URI-safe string', () => {
    const enc = encrypt(plainText, key)
    expect(enc).not.toContain(' ')
    expect(enc).not.toContain('+')
    expect(enc).not.toContain('=')
  })

  it('compress and decompress should be reversible', () => {
    const compressed = compress(plainText)
    const decompressed = decompress(compressed)
    expect(decompressed).toBe(plainText)
  })

  it('decompress should return empty string on invalid input', () => {
  // 非合法 URI
    expect(decompress('%%%')).toBe('')
    // 空字符串
    expect(decompress('')).toBe('')
  // undefined 需要先断言类型
  })

  it('decrypt should return empty string on invalid input', () => {
    const result = decrypt('invalid%%%')
    expect(result).toBe('')
  })

  it('xor with default key works', () => {
    const encrypted = xor(plainText)
    const decrypted = xor(encrypted)
    expect(decrypted).toBe(plainText)
  })

  it('encrypt and decrypt with default key works', () => {
    const enc = encrypt(plainText)
    const dec = decrypt(enc)
    expect(dec).toBe(plainText)
  })
})
