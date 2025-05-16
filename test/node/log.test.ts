import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { logger } from '../../src/node/log'

describe('logger', () => {
  let consoleLogSpy: any

  beforeEach(() => {
    // 在每个测试开始前，创建一个对 console.log 的 spy
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    // 在每个测试结束后恢复 console.log 原始实现并清除所有 mock
    consoleLogSpy.mockRestore()
  })

  it('should log messages in red color', () => {
    const message = 'This is a red message'
    logger.red(message)
    expect(consoleLogSpy).toHaveBeenCalledWith('\x1B[31m%s\x1B[0m', message)
  })

  it('should log messages in green color', () => {
    const message = 'This is a green message'
    logger.green(message)
    expect(consoleLogSpy).toHaveBeenCalledWith('\x1B[32m%s\x1B[0m', message)
  })

  it('should log messages in yellow color', () => {
    const message = 'This is a yellow message'
    logger.yellow(message)
    expect(consoleLogSpy).toHaveBeenCalledWith('\x1B[33m%s\x1B[0m', message)
  })

  it('should log messages in blue color', () => {
    const message = 'This is a blue message'
    logger.blue(message)
    expect(consoleLogSpy).toHaveBeenCalledWith('\x1B[34m%s\x1B[0m', message)
  })
})
