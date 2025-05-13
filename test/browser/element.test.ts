/**
 * @vitest-environment happy-dom
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { copyToClipboard, isMobile, manageClasses, onceEventListener } from '../../src/browser/element'

describe('manageClasses()', () => {
  let el: HTMLElement

  beforeEach(() => {
    // 创建一个虚拟的 DOM 元素用于测试
    el = document.createElement('div')
  })

  it('should add multiple classes to an element', () => {
    manageClasses(el, 'add', ['class1', 'class2'])
    expect(el.classList.contains('class1')).toBe(true)
    expect(el.classList.contains('class2')).toBe(true)
  })

  it('should remove multiple classes from an element', () => {
    el.classList.add('class1', 'class2')
    manageClasses(el, 'remove', ['class1', 'class2'])
    expect(el.classList.contains('class1')).toBe(false)
    expect(el.classList.contains('class2')).toBe(false)
  })

  it('should toggle multiple classes on an element', () => {
    manageClasses(el, 'toggle', ['class1', 'class2'])
    expect(el.classList.contains('class1')).toBe(true)
    expect(el.classList.contains('class2')).toBe(true)

    manageClasses(el, 'toggle', ['class1', 'class2'])
    expect(el.classList.contains('class1')).toBe(false)
    expect(el.classList.contains('class2')).toBe(false)
  })

  it('should handle empty class array', () => {
    manageClasses(el, 'add', [])
    expect(el.classList.length).toBe(0)

    el.classList.add('class1', 'class2')
    manageClasses(el, 'remove', [])
    expect(el.classList.length).toBe(2)

    manageClasses(el, 'toggle', [])
    expect(el.classList.length).toBe(2)
  })
})

describe('onceEventListener', () => {
  let target: EventTarget
  let handler: ReturnType<typeof vi.fn>

  beforeEach(() => {
    // 使用真实的 DOM 元素作为 target
    target = document.createElement('div')
    handler = vi.fn()
  })

  it('should call handler once and remove listener after first trigger', () => {
    const addSpy = vi.spyOn(target, 'addEventListener')
    const removeSpy = vi.spyOn(target, 'removeEventListener')

    onceEventListener(target, 'click', handler)

    // 直接触发事件
    target.dispatchEvent(new Event('click'))

    expect(handler).toHaveBeenCalledTimes(1)
    expect(addSpy).toHaveBeenCalledWith('click', expect.any(Function)) // 添加此行以使用 addSpy
    expect(removeSpy).toHaveBeenCalledWith('click', expect.any(Function))
  })
})

describe('isMobile', () => {
  it('should return true for Android devices', () => {
    Object.defineProperty(navigator, 'userAgent', {
      get: () => 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Mobile Safari/537.36',
      configurable: true,
    })
    expect(isMobile()).toBe(true)
  })

  it('should return true for iPhone devices', () => {
    Object.defineProperty(navigator, 'userAgent', {
      get: () => 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
      configurable: true,
    })
    expect(isMobile()).toBe(true)
  })

  it('should return true for iPad devices', () => {
    Object.defineProperty(navigator, 'userAgent', {
      get: () => 'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
      configurable: true,
    })
    expect(isMobile()).toBe(true)
  })

  it('should return false for desktop browsers', () => {
    Object.defineProperty(navigator, 'userAgent', {
      get: () => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      configurable: true,
    })
    expect(isMobile()).toBe(false)
  })

  it('should return false for non-mobile user agents', () => {
    Object.defineProperty(navigator, 'userAgent', {
      get: () => 'Googlebot/2.1 (+http://www.google.com/bot.html)',
      configurable: true,
    })
    expect(isMobile()).toBe(false)
  })
})

describe('copyToClipboard', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    document.body.innerHTML = ''
  })

  it('should successfully copy text using clipboard API when available', async () => {
    const mockWriteText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText,
      },
      writable: true,
      configurable: true,
    })

    const result = await copyToClipboard('Hello, world!')
    expect(mockWriteText).toHaveBeenCalledWith('Hello, world!')
    expect(result).toBe(true)
  })

  it('should return false if navigator.clipboard is not available', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
      configurable: true,
    })

    const result = await copyToClipboard('Test text')
    expect(result).toBe(false)
  })
})
