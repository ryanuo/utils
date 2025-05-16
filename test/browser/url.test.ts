import { describe, expect, it } from 'vitest'
import { getUrlParams, getUrlParamsString } from '../../src/browser/url'

describe('getUrlParams', () => {
  describe('normal usage', () => {
    it('should parse parameters from the current page URL', () => {
      // 假设当前页面URL是 "http://example.com/?a=1&b=2"
      // 注意：为了使此测试独立于环境，请考虑使用mock或直接传递一个URL字符串
      const params = getUrlParams('?a=1&b=2')
      expect(params).toEqual({ a: '1', b: '2' })
    })
  })

  describe('edge cases', () => {
    it('should handle an empty query string', () => {
      const params = getUrlParams('')
      expect(params).toEqual({})
    })

    it('should handle a URL with no query parameters', () => {
      const url = 'http://example.com/'
      const params = getUrlParams(url)
      expect(params).toEqual({})
    })
  })

  describe('error handling', () => {
    it('should return an empty object for invalid URLs', () => {
      const params = getUrlParams('invalid-url')
      expect(params).toEqual({})
    })
  })
})

describe('getUrlParamsString', () => {
  const defaultUrl = 'http://example.com'

  describe('normal usage', () => {
    it('should convert an object to a URL with parameters using the current page URL', () => {
      const obj = { a: '1', b: '2' }
      const expectedResult = `${defaultUrl}?a=1&b=2`
      const result = getUrlParamsString(obj, defaultUrl)
      expect(result).toBe(expectedResult)
    })

    it('should append parameters to a given URL', () => {
      const url = 'https://www.example.com'
      const obj = { a: '1', b: '2' }
      const expectedResult = `${url}?a=1&b=2`
      const result = getUrlParamsString(obj, url)
      expect(result).toBe(expectedResult)
    })
  })

  describe('edge cases', () => {
    it('should handle an empty object and return the base URL', () => {
      const obj = {}
      const expectedResult = defaultUrl
      const result = getUrlParamsString(obj, defaultUrl)
      expect(result).toBe(expectedResult)
    })

    it('should handle an object with special characters', () => {
      const obj = { name: 'ryan uo', age: '30' }
      const expectedResult = `${defaultUrl}?age=30&name=ryan%20uo`
      const result = getUrlParamsString(obj, defaultUrl)
      expect(result).toBe(expectedResult)
    })
  })
})
