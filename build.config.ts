import { execSync } from 'node:child_process'
import { defineBuildConfig } from 'unbuild'
import generateEntries from './script/generateEntries'
import updatePackageExports from './script/update-package-exports'
import { resolvePath, rmrf } from './src/node'

export default defineBuildConfig({
  entries: [
    './src/index',
    ...generateEntries(resolvePath('src')),
  ],
  declaration: false,
  clean: false,
  externals: [
    'dayjs',
    'decimal.js',
    'query-string',
  ],
  rollup: {
    emitCJS: true,
    esbuild: {
      minify: true,
    },
  },
  hooks: {
    'build:prepare': async () => {
      try {
        await rmrf(resolvePath('dist'))
        execSync('tsc -p tsconfig.build.json', { stdio: 'inherit' })
        console.warn('🎉 类型文件生成完成!')

        updatePackageExports(resolvePath('src'), resolvePath('package.json'))
      }
      catch (err) {
        console.error('❌ build:prepare 失败:', err)
      }
    },
  },
})
