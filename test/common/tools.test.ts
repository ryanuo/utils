import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getUuid } from '../../src'

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
