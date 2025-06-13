import { execSync } from 'node:child_process'
import { rm } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineBuildConfig } from 'unbuild'
import generateEntries from './script/generateEntries'
import updatePackageExports from './script/update-package-exports'

const __dirname = dirname(fileURLToPath(import.meta.url))
const resolvePath = (p: string) => resolve(__dirname, p)

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
    'ofetch',
  ],
  rollup: {
    emitCJS: true,
    esbuild: {
      minify: true,
    },
  },
  hooks: {
    'build:prepare': () => {
      rm(resolvePath('dist'), () => {
        execSync('tsc -p tsconfig.build.json', {
          stdio: 'inherit',
        })
        console.warn('🎉 类型文件生成完成!')

        updatePackageExports(resolvePath('src'), resolvePath('package.json'))
      })
    },
  },
})
