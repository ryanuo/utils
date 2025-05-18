/**
 * @vitest-environment happy-dom
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { downloadFile } from '../../src/browser/download'

// Mocking fetch and necessary DOM APIs
vi.mock('node-fetch', async () => {
  return {
    default: vi.fn(),
  }
})

describe('downloadFile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should successfully download a file with default filename', async () => {
    const mockResponse = new Response(new Blob(['content']), {
      headers: { 'Content-Disposition': 'attachment; filename="example.pdf"' },
      status: 200,
      statusText: 'OK',
    })
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockResponse)

    try {
      await downloadFile('https://example.com/file.pdf')
    }
    catch (error) {
      expect(error).toBeUndefined()
    }

    expect(fetch).toHaveBeenCalledWith('https://example.com/file.pdf', {})
  })

  it('should download a file with custom filename', async () => {
    const mockResponse = new Response(new Blob(['content']))
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockResponse)

    try {
      await downloadFile('https://example.com/data.csv', 'custom-data.csv')
    }
    catch (error) {
      expect(error).toBeUndefined()
    }

    expect(fetch).toHaveBeenCalledWith('https://example.com/data.csv', {})
  })

  it('should handle errors when the response is not ok', async () => {
    const mockResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    })
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockResponse)

    await expect(downloadFile('https://example.com/notfound')).rejects.toThrow(
      '下载失败: HTTP状态码 404 Not Found',
    )
  })

  it('should throw an error if fetching fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'))

    await expect(downloadFile('https://example.com/error')).rejects.toThrow(
      '文件下载失败: Network error',
    )
  })
})
