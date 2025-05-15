import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchWithTimeout } from '../../src/network/http'

// Mocking global.fetch
vi.mock('node-fetch', () => ({
  fetch: vi.fn(),
}))

describe('fetchWithTimeout', () => {
  let originalFetch: any

  beforeEach(() => {
    originalFetch = globalThis.fetch
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('should successfully fetch data within the timeout period', async () => {
    const mockResponse = new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-type': 'application/json',
      },
    })
    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse)

    const response = await fetchWithTimeout('http://example.com', {}, 3000)
    expect(response.status).toBe(200)
  })

  it('should throw an error when the request times out', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Request timed out'))

    try {
      await fetchWithTimeout('http://example.com', {}, 1000)
    }
    catch (err: any) {
      expect(err.message).toContain('请求超时或失败')
    }
  })

  it('should use default timeout if not provided', async () => {
    globalThis.fetch = vi.fn().mockImplementationOnce(() => {
      // Check if signal is set in options and simulate a successful response
      return Promise.resolve(new Response(JSON.stringify({}), { status: 200 }))
    })

    await fetchWithTimeout('http://example.com')
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'http://example.com',
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      }),
    )
  })
})
