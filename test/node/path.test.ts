import { access, mkdir, readdir, rm, stat } from 'node:fs/promises' // 根据实际情况调整导入
import { dirname, join } from 'node:path'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdirp, rmrf } from '~/node/path'

// 模拟 fs/promises 和 path 模块
vi.mock('fs/promises', async () => {
  const actual = await vi.importActual('fs/promises')
  return {
    ...actual,
    access: vi.fn(),
    mkdir: vi.fn(),
    stat: vi.fn(),
    readdir: vi.fn(),
    rm: vi.fn(),
  }
})

// 修改:合并所有对 path 模块的模拟，避免重复定义
vi.mock('path', () => ({
  dirname: vi.fn(),
  join: vi.fn(),
  normalize: vi.fn(),
}))

describe('mkdirp', () => {
  let accessMock: any
  let mkdirMock: any
  let dirnameMock: any

  beforeEach(() => {
    accessMock = vi.mocked(access)
    mkdirMock = vi.mocked(mkdir)
    dirnameMock = vi.mocked(dirname)
  })

  it('should not create directory if it already exists', async () => {
    accessMock.mockResolvedValueOnce()

    await mkdirp('/mock/path')

    expect(accessMock).toHaveBeenCalledWith('/mock/path')
    expect(mkdirMock).not.toHaveBeenCalled()
  })

  it('should recursively create directories', async () => {
    accessMock.mockRejectedValueOnce(new Error('ENOENT')) // 第一次访问失败
    accessMock.mockResolvedValueOnce() // 父目录存在
    dirnameMock.mockReturnValueOnce('/mock') // 第一次 dirname 调用

    await mkdirp('/mock/path')

    expect(accessMock).toHaveBeenNthCalledWith(1, '/mock/path')
    expect(dirnameMock).toHaveBeenCalledWith('/mock/path')
    expect(mkdirMock).toHaveBeenCalledWith('/mock/path')
  })
})

describe('rmrf', () => {
  let statMock: any
  let readdirMock: any
  let rmMock: any
  let joinMock: any

  beforeEach(() => {
    statMock = vi.mocked(stat)
    readdirMock = vi.mocked(readdir)
    rmMock = vi.mocked(rm)
    joinMock = vi.mocked(join)
  })

  beforeEach(() => {
    statMock.mockClear()
    readdirMock.mockClear()
    rmMock.mockClear()
    joinMock.mockClear()
  })

  it('should delete a file', async () => {
    statMock.mockResolvedValueOnce({ isDirectory: () => false })

    await rmrf('/mock/path/to/file')

    expect(statMock).toHaveBeenCalledWith('/mock/path/to/file')
    expect(rmMock).toHaveBeenCalledWith('/mock/path/to/file')
    expect(joinMock).not.toHaveBeenCalled()
    expect(readdirMock).not.toHaveBeenCalled()
  })

  it('should handle errors gracefully', async () => {
    const testError = new Error('Test error')
    statMock.mockRejectedValue(testError)

    try {
      await rmrf('/mock/path/to/error')
    }
    catch (error) {
      expect(error).toBe(testError)
    }

    expect(statMock).toHaveBeenCalledWith('/mock/path/to/error')
    expect(readdirMock).not.toHaveBeenCalled()
    expect(rmMock).not.toHaveBeenCalled()
  })
})
