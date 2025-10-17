import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { mkdirp, projectRoot, resolvePath, rmrf } from '../../src/node/path'

describe('path Utils', () => {
  const testDir = join(projectRoot, 'test-temp')

  // 测试前确保目录不存在
  beforeEach(async () => {
    await rmrf(testDir).catch(() => {})
  })

  // 测试后清理
  afterEach(async () => {
    await rmrf(testDir).catch(() => {})
  })

  it('should resolvePath correctly', () => {
    const path = resolvePath('foo/bar')
    expect(path).toBe(join(projectRoot, 'foo/bar'))
  })

  it('should create directory recursively', async () => {
    const nestedDir = join(testDir, 'a/b/c')
    await mkdirp(nestedDir)
    expect(existsSync(nestedDir)).toBe(true)
  })

  it('should remove directory recursively', async () => {
    const nestedDir = join(testDir, 'x/y/z')
    await mkdirp(nestedDir)
    expect(existsSync(nestedDir)).toBe(true)

    await rmrf(testDir)
    expect(existsSync(testDir)).toBe(false)
  })

  it('rmrf should not throw if path does not exist', async () => {
    await expect(rmrf(join(testDir, 'nonexistent'))).resolves.not.toThrow()
  })

  it('mkdirp should not throw if directory already exists', async () => {
    const dir = join(testDir, 'already')
    await mkdirp(dir)
    await expect(mkdirp(dir)).resolves.not.toThrow()
  })
})
