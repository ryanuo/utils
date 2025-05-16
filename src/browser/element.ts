/**
 * 批量操作元素类名
 * @category DOM
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
 * @category DOM
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
 * @category DOM
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

/**
 * Copy text to clipboard
 * @category DOM
 * @param text The text to be copied.
 * @returns A boolean indicating success or failure of the operation.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  }
  catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    if (!document?.execCommand)
      return false

    // Mdn: https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
    const result = document?.execCommand('copy')
    document.body.removeChild(textarea)
    return result
  }
}

/**
 * Implement fullscreen effect upon clicking any element.
 * @category DOM
 * @param selector Selector to target elements
 * @param event Event to trigger fullscreen, default is 'click'
 */
export function enterFullScreen(selector: string, event: string = 'click') {
  const elements = document.querySelectorAll(selector)

  if (elements.length === 0) {
    console.error(`No elements found for selector ${selector}`)
    return
  }

  // Use fullscreenEnabled property to check if fullscreen is supported
  if (!document.fullscreenEnabled) {
    console.error('Your browser does not support fullscreen mode')
    return
  }

  elements.forEach((element) => {
    element.addEventListener(event, async () => {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen()
        }
        else if ('webkitRequestFullscreen' in document.documentElement) {
          // Safari Browser
          ;(document.documentElement as any).webkitRequestFullscreen()
        }
        else if ('msRequestFullscreen' in document.documentElement) {
          // Old versions of IE/Edge
          ;(document.documentElement as any).msRequestFullscreen()
        }
      }
      catch (err) {
        console.error('Failed to enter fullscreen:', err)
      }
    })
  })
}
