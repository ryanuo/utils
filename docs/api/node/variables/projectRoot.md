[@ryanuo/utils](../../index.md) / [node](../index.md) / projectRoot

# Variable: projectRoot

```ts
const projectRoot: string;
```

项目根路径工具,运行时获取项目根路径

## Example

```ts
// 运行时获取项目根路径 process.cwd()
// 每个模块计算出来的 __dirname 都是 当前模块的目录。
const __dirname = dirname(fileURLToPath(import.meta.url))
const resolvePath = (p: string) => resolve(__dirname, p)
```
