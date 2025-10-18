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
 * 封装 GET/POST 请求（自动处理 JSON）
 * @category Http
 */
async function request<T = any>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: object,
  headers: Record<string, string> = {},
  timeout: number = 5000,
): Promise<T> {
  const config: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
  }

  if (data && method !== 'GET')
    config.body = JSON.stringify(data)

  const response = await fetchWithTimeout(url, config, timeout)
  if (!response.ok)
    throw new Error(`HTTP错误 ${response.status}`)

  return response.json() as Promise<T>
}

/**
 * 控制并发数的请求队列
 * @category Http
 * @param requests 请求函数数组
 * @param concurrency 最大并发数（默认 5）
 */
async function parallelRequests<T>(
  requests: (() => Promise<T>)[],
  concurrency: number = 5,
): Promise<T[]> {
  const results: T[] = Array.from({ length: requests.length })
  const executing = new Set<Promise<any>>()

  for (let i = 0; i < requests.length; i++) {
    const req = requests[i]
    const p = req().then((res) => {
      results[i] = res // 按输入顺序写入
      executing.delete(p)
    })
    executing.add(p)

    if (executing.size >= concurrency)
      await Promise.race(executing)
  }

  await Promise.all(executing)
  return results
}

/**
 * 获取客户端的 IP 地址
 * @category Http
 */
async function getClientIP(): Promise<string> {
  try {
    const response = await request<{ ip: string }>(
      'GET',
      'https://api.ipify.org?format=json',
    )
    return response.ip
  }
  catch {
    return 'unknown'
  }
}

/**
 * 检测网络连接状态
 * @category Http
 */
function checkNetworkStatus(): Promise<boolean> {
  return new Promise((resolve) => {
    if (navigator.onLine !== undefined) {
      resolve(navigator.onLine)
    }
    else {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = `https://www.google.com/favicon.ico?${Date.now()}`
    }
  })
}

export {
  checkNetworkStatus,
  getClientIP,
  parallelRequests,
  fetchWithTimeout,
  request,
}
