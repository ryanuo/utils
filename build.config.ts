import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    // default
    './src/index',
    {
      builder: 'mkdist',
      input: './src/node',
      outDir: './dist/node',
      format: 'esm',
    },
    {
      builder: 'mkdist',
      input: './src/node',
      outDir: './dist/node',
      format: 'cjs',
      ext: 'cjs',
    },
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})
