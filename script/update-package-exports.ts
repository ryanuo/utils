// scripts/update-package-exports.ts
import fs from 'node:fs'

// 定义导出配置项的类型
interface ExportEntry {
  types: string
  import: string
  require: string
}

// 扫描指定目录下的所有子模块
function scanModules(srcDir: string): string[] {
  return fs.readdirSync(srcDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

// 生成模块的导出配置
function generateExportConfig(moduleName: string): ExportEntry {
  return {
    types: `./dist/types/${moduleName}/index.d.ts`,
    import: `./dist/lib/${moduleName}/index.mjs`,
    require: `./dist/lib/${moduleName}/index.cjs`,
  }
}

// 更新 package.json 的 exports 字段
function updatePackageExports(srcDir: string, packageJsonPath: string): void {
  // 读取并解析 package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

  // 初始化 exports 对象
  const exportsConfig: Record<string, ExportEntry> = {
    '.': {
      types: './dist/types/index.d.ts',
      import: './dist/index.mjs',
      require: './dist/index.cjs',
    },
  }

  // 为每个模块生成导出配置
  const modules = scanModules(srcDir)
  modules.forEach((module) => {
    exportsConfig[`./${module}`] = generateExportConfig(module)
  })

  // 更新 package.json
  packageJson.exports = exportsConfig

  // 写回文件，保持格式一致
  fs.writeFileSync(
    packageJsonPath,
    `${JSON.stringify(packageJson, null, 2)}\n`,
  )

  console.warn('✅ package.json 的 exports 字段已更新')
}

export default updatePackageExports
