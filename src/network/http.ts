/**
 * 带超时的 fetch 请求
 * @category Http
 * @param url 请求地址
 * @param options 请求配置
 * @param timeout 超时时间（默认 5s）
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = 5000,
): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timer)
    return response
  }
  catch (err: any) {
    clearTimeout(timer)
    throw new Error(`请求超时或失败: ${err.message}`)
  }
}

/**
 * @category Http
 * 封装 GET/POST 请求（自动处理 JSON）
 */
async function request<T = any>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: object,
  headers: Record<string, string> = {},
): Promise<T> {
  const config: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
  }

  if (data)
    config.body = JSON.stringify(data)

  const response = await fetchWithTimeout(url, config)
  if (!response.ok)
    throw new Error(`HTTP错误 ${response.status}`)

  return response.json() as Promise<T>
}

export {
  fetchWithTimeout,
  request,
}
