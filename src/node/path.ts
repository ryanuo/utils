import { mkdir, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'

/**
 * 项目根路径工具,运行时获取项目根路径
 * @category Path
 * @example
 * ```ts
 * // 运行时获取项目根路径 process.cwd()
 * // 每个模块计算出来的 __dirname 都是 当前模块的目录。
 * const __dirname = dirname(fileURLToPath(import.meta.url))
 * const resolvePath = (p: string) => resolve(__dirname, p)
 * ```
 */
export const projectRoot = process.cwd()

/**
 * 将相对路径解析为基于当前模块的绝对路径
 * @category Path
 * @param p 相对路径
 */
export const resolvePath = (p: string) => resolve(projectRoot, p)

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
