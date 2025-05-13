/**
 * @vitest-environment happy-dom
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { manageClasses, onceEventListener } from '../../src/browser/element'

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
