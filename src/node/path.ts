import { mkdir, rm } from 'node:fs/promises'

/**
 * 递归创建目录（如果不存在）
 * 确保指定路径及其所有父目录存在。如果目录已经存在，不会报错。
 *
 * @category Path
 * @param dirPath - 要创建的目标目录路径
 * @example
 * await mkdirp('/tmp/a/b/c')
 */
export async function mkdirp(dirPath: string): Promise<void> {
  await mkdir(dirPath, { recursive: true })
}

/**
 * 递归删除目录或文件
 * 这个函数会删除指定路径下的文件或目录及其所有子内容。
 * 如果路径不存在，也不会报错。
 *
 * @category Path
 * @param path - 要删除的目标路径
 * @example
 * await rmrf('/tmp/a/b/c')
 */
export async function rmrf(path: string): Promise<void> {
  await rm(path, { recursive: true, force: true })
}
