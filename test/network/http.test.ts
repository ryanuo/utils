// tests/network.http.test.ts
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  checkNetworkStatus,
  fetchWithTimeout,
  getClientIP,
  parallelRequests,
  request,
} from '../../src/network/http'

// ====== fetchWithTimeout 测试 ======
describe('fetchWithTimeout', () => {
  beforeEach(() => vi.restoreAllMocks())

  it('successfully fetches data', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    }))
    const response = await fetchWithTimeout('http://example.com', {}, 3000)
    expect(response.ok).toBe(true)
    const data = await response.json()
    expect(data).toEqual({ success: true })
  })

  it('throws error when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('fail')))
    await expect(fetchWithTimeout('http://example.com', {}, 1000))
      .rejects
      .toThrow('请求超时或失败: fail')
  })
})

// ====== request 测试 ======
describe('request', () => {
  beforeEach(() => vi.restoreAllMocks())

  it('gET request returns parsed JSON', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'ok' }),
    }))
    const data = await request('GET', 'http://example.com')
    expect(data).toEqual({ message: 'ok' })
  })

  it('pOST request sends JSON body', async () => {
    const spy = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) })
    vi.stubGlobal('fetch', spy)
    await request('POST', 'http://example.com', { foo: 'bar' })
    expect(spy).toHaveBeenCalledWith(
      'http://example.com',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ foo: 'bar' }),
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
        signal: expect.any(AbortSignal),
      }),
    )
  })
})

// ====== parallelRequests 测试 ======
describe('parallelRequests', () => {
  function createDelayedPromise<T>(value: T, delay: number = 0) {
    return () => new Promise<T>(resolve => setTimeout(() => resolve(value), delay))
  }

  it('executes sequentially when concurrency = 1', async () => {
    const mockRequests = [
      createDelayedPromise('first', 100),
      createDelayedPromise('second', 50),
      createDelayedPromise('third', 200),
    ]
    const results = await parallelRequests(mockRequests, 1)
    expect(results).toEqual(['first', 'second', 'third'])
  })

  it('executes concurrently up to concurrency limit', async () => {
    const mockRequests = [
      createDelayedPromise('first', 200),
      createDelayedPromise('second', 100),
      createDelayedPromise('third', 150),
    ]
    const start = Date.now()
    const results = await parallelRequests(mockRequests, 2)
    const duration = Date.now() - start
    expect(duration).toBeLessThan(350)
    expect(results).toEqual(['first', 'second', 'third'])
  })
})

// ====== getClientIP 测试 ======
describe('getClientIP', () => {
  beforeEach(() => vi.restoreAllMocks())

  it('returns IP from successful request', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ip: '127.0.0.1' }),
    }))
    const ip = await getClientIP()
    expect(ip).toBe('127.0.0.1')
  })

  it('returns "unknown" if request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('fail')))
    const ip = await getClientIP()
    expect(ip).toBe('unknown')
  })
})

// ====== checkNetworkStatus 测试 ======
describe('checkNetworkStatus', () => {
  it('returns navigator.onLine if available', async () => {
    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true })
    const status = await checkNetworkStatus()
    expect(status).toBe(true)
  })

  it('falls back to image load if navigator.onLine undefined', async () => {
    Object.defineProperty(navigator, 'onLine', { value: undefined, configurable: true })
    vi.stubGlobal('Image', class {
      onload: () => void = () => { }
      onerror: () => void = () => { }
      // eslint-disable-next-line accessor-pairs
      set src(_val: string) { this.onload() }
    } as any)
    const status = await checkNetworkStatus()
    expect(status).toBe(true)
  })
})
