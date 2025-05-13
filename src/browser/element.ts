/**
 * 批量操作元素类名
 * @example
 * ```ts
 * import { manageClasses } from '@ryanuo/utils'
 * const el = document.getElementById('myElement')
 * manageClasses(el, 'add', ['class1', 'class2'])
 * manageClasses(el, 'remove', ['class1', 'class2'])
 * manageClasses(el, 'toggle', ['class1', 'class2'])
 * ```
 * @param el 目标元素
 * @param action 'add' | 'remove' | 'toggle'
 * @param classes 类名数组
 */
export function manageClasses(
  el: HTMLElement,
  action: 'add' | 'remove' | 'toggle',
  classes: string[],
): void {
  classes.forEach(cls => el.classList[action](cls))
}
