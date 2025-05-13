import { access, mkdir, readdir, rm, stat } from 'node:fs/promises'
import { dirname, join } from 'node:path'

/**
 * 递归创建目录（如果不存在）
 * @category Path
 * @param dirPath 目标路径
 */
export async function mkdirp(dirPath: string): Promise<void> {
  try {
    await access(dirPath)
  }
  catch {
    await mkdirp(dirname(dirPath))
    await mkdir(dirPath)
  }
}

/**
 * 递归删除目录或文件
 * @category Path
 * @param path 目标路径
 */
export async function rmrf(path: string): Promise<void> {
  const stats = await stat(path)
  if (stats.isDirectory()) {
    const files = await readdir(path)
    await Promise.all(files.map(file => rmrf(join(path, file))))
    await rm(path, { recursive: true })
  }
  else {
    await rm(path)
  }
}
