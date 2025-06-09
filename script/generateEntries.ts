import { readdirSync } from 'node:fs'
import type { BuildEntry } from 'unbuild'

// 扫描 src 目录下的所有子模块
function scanModules(srcDir: string): string[] {
  return readdirSync(srcDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

// 生成每个模块的构建配置
function generateEntries(srcDir: string): BuildEntry[] {
  const modules = scanModules(srcDir)
  const entries: BuildEntry[] = []

  modules.forEach((module) => {
    entries.push(
      {
        builder: 'mkdist',
        input: `./src/${module}`,
        outDir: `./dist/lib/${module}`,
        format: 'esm',
      },
      {
        builder: 'mkdist',
        input: `./src/${module}`,
        outDir: `./dist/lib/${module}`,
        format: 'cjs',
        ext: 'cjs',
      },
    )
  })

  return entries
}

export default generateEntries
