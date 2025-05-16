/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it, vi } from 'vitest'
import { debounce, throttle } from '../../src/common/tools'

describe('debounce', () => {
  // Use fake timers to control setTimeout and clearTimeout
  vi.useFakeTimers()

  it('should execute the function after the delay when called once', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn()

    // Fast-forward until all timers have been executed
    vi.runAllTimers()

    // Expect the mock function to have been called once
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should reset the timer when called multiple times within the delay', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn()
    debouncedFn()
    debouncedFn()

    // Fast-forward until all timers have been executed
    vi.runAllTimers()

    // Expect the mock function to have been called once, at the end of all calls
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should not execute the function immediately if immediate is false', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100, false)

    debouncedFn()

    // No need to fast-forward time here, we just check that the function hasn't been called yet
    expect(mockFn).not.toHaveBeenCalled()
  })

  it('should execute the function immediately if immediate is true and then wait for the next call', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100, true)

    debouncedFn()

    // Check that the function has been called immediately
    expect(mockFn).toHaveBeenCalled()

    // Reset the mock function for the next checks
    mockFn.mockReset()

    // Call the debounced function again before the delay ends
    debouncedFn()

    // Fast-forward until all timers have been executed
    vi.runAllTimers()

    // Expect the mock function not to have been called again (only immediate execution)
    expect(mockFn).not.toHaveBeenCalled()
  })

  it('should clear the timeout if the debounced function is called again before the delay expires', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn()
    vi.advanceTimersByTime(50) // Advance time by half the delay
    debouncedFn() // This should clear the previous timeout and set a new one
    vi.advanceTimersByTime(50) // Another half delay

    // The function should not have been called yet, as the second call reset the timer
    expect(mockFn).not.toHaveBeenCalled()

    // Fast-forward the remaining time
    vi.runAllTimers()

    // Now the function should be called
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})

describe('throttle', () => {
  // Use fake timers to control setTimeout and Date.now()
  vi.useFakeTimers()

  it('should execute the function immediately if immediate is true and delay has passed', () => {
    const mockFn = vi.fn()
    const throttledFn = throttle(mockFn, 100)

    // Move time forward by more than the delay period
    vi.setSystemTime(Date.now() + 150)

    throttledFn()

    // Expect the function to have been called once
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should not execute the function again within the delay period when immediate is true', () => {
    const mockFn = vi.fn()
    const throttledFn = throttle(mockFn, 100, true)

    // First call
    throttledFn()
    expect(mockFn).toHaveBeenCalledTimes(1)

    throttledFn()
    vi.runAllTimers()

    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  it('should execute the function at the end of the delay period if immediate is false', () => {
    const mockFn = vi.fn()
    const throttledFn = throttle(mockFn, 100, false)

    // First call - should not execute immediately
    throttledFn()
    expect(mockFn).not.toHaveBeenCalled()

    // Fast-forward time by the delay period
    vi.advanceTimersByTime(100)

    // The function should now have been called
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
