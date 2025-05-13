/**
 * @vitest-environment happy-dom
 */
import { beforeEach, describe, expect, it } from 'vitest'
import { manageClasses } from '../../src/browser/element'

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
