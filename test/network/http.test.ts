import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchWithTimeout, parallelRequests } from '../../src/network/http'

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

/**
 * Mocks a promise-returning function that resolves after a delay.
 * @param value The value to resolve the promise with.
 * @param delay The time in milliseconds before the promise resolves.
 */
function createDelayedPromise<T>(value: T, delay: number = 0): () => Promise<T> {
  return () => new Promise(resolve => setTimeout(() => resolve(value), delay))
}

describe('parallelRequests', () => {
  it('should execute requests sequentially when concurrency is 1', async () => {
    const mockRequests = [
      createDelayedPromise('first', 100),
      createDelayedPromise('second', 50),
      createDelayedPromise('third', 200),
    ]

    const results = await parallelRequests(mockRequests, 1)

    expect(results).toEqual(['first', 'second', 'third'])
  })

  it('should execute requests concurrently up to the specified limit', async () => {
    // Arrange mocks where the first request takes the longest,
    // demonstrating concurrent execution.
    const mockRequests = [
      createDelayedPromise('last', 300),
      createDelayedPromise('first', 100),
      createDelayedPromise('second', 200),
    ]

    const startTime = Date.now()
    const results = await parallelRequests(mockRequests, 2)
    const duration = Date.now() - startTime

    // Ensure that it took less than if they were run sequentially
    expect(duration).toBeLessThan(600) // Total sequential time would be 600ms
    expect(results).toEqual(['first', 'last', 'second'])
  })
})
