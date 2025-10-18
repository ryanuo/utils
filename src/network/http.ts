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
 * 获取 IndexedDB 缓存
 * @example
 * ```ts twoslash
 * import { getIndexedDBCache } from '@ryanuo/utils';
 * // 使用示例
 * const cache = await getIndexedDBCache('api-cache', 'responses');
 * await cache.set('users', [{ id: 1, name: 'Alice' }]);
 * const users = await cache.get('users');
 * ```
 * @category Http
 * @param dbName indexedDB 数据库名称
 * @param storeName 缓存对象名称
 * @returns IndexedDB 缓存对象
 */
async function getIndexedDBCache(dbName: string, storeName: string) {
  const openDB = (): Promise<IDBDatabase> =>
    new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1)
      request.onupgradeneeded = () => request.result.createObjectStore(storeName)
      request.onsuccess = () => resolve(request.result)
      request.onerror = reject
    })

  const db = await openDB()

  return {
    async get<T>(key: string): Promise<T | undefined> {
      return new Promise((resolve) => {
        const tx = db.transaction(storeName, 'readonly')
        const store = tx.objectStore(storeName)
        const request = store.get(key)
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => resolve(undefined)
      })
    },
    async set(key: string, value: any): Promise<void> {
      return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite')
        const store = tx.objectStore(storeName)
        const request = store.put(value, key)
        request.onsuccess = () => resolve()
        request.onerror = reject
      })
    },
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
  getIndexedDBCache,
  getClientIP,
  parallelRequests,
  fetchWithTimeout,
  request,
}
