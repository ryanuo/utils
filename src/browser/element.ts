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

/**
 * 只触发一次的事件监听
 * @example
 * ```ts
 * import { once } from '@ryanuo/utils'
 * once(document, 'click', (e) => {
 *   console.log(e)
 * })
 * ```
 * @param target 目标元素
 * @param event 事件名
 * @param handler 处理函数
 */
export function onceEventListener(
  target: EventTarget,
  event: string,
  handler: EventListener,
): void {
  const wrapper = (e: Event) => {
    handler(e)
    target.removeEventListener(event, wrapper)
  }
  target.addEventListener(event, wrapper)
}

/**
 * Check if the user is visiting via a mobile device.
 * @example
 * ```ts
 * import { isMobile } from '@ryanuo/utils'
 * if (isMobile()) {
 *   console.log('This is a mobile device.')
 * }
 * ```
 * This function determines the device type by detecting the User Agent. It uses regular expressions to search for typical identifiers of mobile devices.
 * If the User Agent contains keywords such as Android, webOS, iPhone, iPad, iPod, BlackBerry, IEMobile, or Opera Mini,
 * it identifies the device as mobile. This information is crucial for providing responsive design and optimizing user experience.
 *
 * @returns {boolean} Returns true if the user appears to be using a mobile device; otherwise returns false.
 */
export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
}
