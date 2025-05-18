/**
 * 文件下载工具函数
 * @category Download
 * @param url - 文件URL地址
 * @param fileName - 可选的下载文件名（默认为URL中的文件名）
 * @param options - 可选的请求配置（同fetch API）
 * @returns 成功或失败的Promise
 *
 * @example
 * ```ts twoslash
 * import { downloadFile } from '@ryanuo/utils';
 * // 基础用法
 * downloadFile('https://example.com/file.pdf');
 *
 * // 自定义文件名
 * downloadFile('https://example.com/data.csv', 'custom-data.csv');
 *
 * // 带请求头的下载
 * downloadFile('https://api.example.com/export', 'report.xlsx', {
 *   headers: {
 *     Authorization: 'Bearer token'
 *   }
 * });
 * ```
 */
export async function downloadFile(
  url: string,
  fileName?: string,
  options: RequestInit = {},
): Promise<void> {
  try {
    // 发起HTTP请求获取文件
    const response = await fetch(url, options)

    // 检查HTTP状态码
    if (!response.ok)
      throw new Error(`下载失败: HTTP状态码 ${response.status} ${response.statusText}`)

    // 从响应头中提取文件名（如果未提供）
    if (!fileName) {
      const contentDisposition = response.headers.get('content-disposition')
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
        if (fileNameMatch && fileNameMatch[1])
          fileName = fileNameMatch[1].replace(/['"]/g, '')
      }

      // 如果仍未获取到文件名，则从URL中提取
      if (!fileName)
        fileName = url.split('/').pop() || 'downloaded-file'
    }

    // 读取响应内容为Blob
    const blob = await response.blob()

    // 创建下载链接
    const downloadUrl = URL.createObjectURL(blob)

    // 创建并点击下载链接
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = fileName

    // 为了兼容Firefox
    document.body.appendChild(link)

    // 模拟点击下载
    link.click()

    // 清理工作
    setTimeout(() => {
      document.body.removeChild(link)
      URL.revokeObjectURL(downloadUrl)
    }, 100)
  }
  catch (error) {
    // 错误处理
    console.error('文件下载失败:', error)

    // 可以根据需要添加自定义错误处理逻辑
    if (error instanceof Error)
      throw new Error(`文件下载失败: ${error.message}`)
    else
      throw new Error('文件下载失败: 发生未知错误')
  }
}
