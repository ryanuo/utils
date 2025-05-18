import qs from 'query-string'
import { isEmptyObject } from '../common'
/**
 * Parse URL query parameters
 * @category URL
 * @example
 * ```ts twoslash
 * import { getUrlParams } from '@ryanuo/utils'
 * getUrlParams() // { a: '1', b: '2' }
 * ```
 * @param url Optional, defaults to the current page URL
 * @returns An object of parsed parameters
 */
export function getUrlParams(url: string = window.location.search): Record<string, string> {
  if (!url)
    return {}

  const safeUrl = qs.parseUrl(url)
  return safeUrl.query as Record<string, string>
}

/**
 * Convert an object to URL parameters
 * @category URL
 * @example
 * ```ts twoslash
 * import { getUrlParamsString } from '@ryanuo/utils'
 * getUrlParamsString({ a: '1', b: '2' }) // '?a=1&b=2'
 * getUrlParamsString({ a: '1', b: '2', c: '3' }) // '?a=1&b=2&c=3'
 *```
 * @param obj - The object to convert
 * @param url - The URL to which parameters will be added, defaults to the current page URL
 */
export function getUrlParamsString(obj: Record<string, string>, url?: string): string {
  return `${url || window.location.href}${!isEmptyObject(obj) ? '?' : ''}${qs.stringify(obj)}`
}
