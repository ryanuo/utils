[@ryanuo/utils](../../index.md) / [node](../index.md) / mkdirp

# Function: mkdirp()

```ts
function mkdirp(dirPath): Promise<void>;
```

递归创建目录（如果不存在）
确保指定路径及其所有父目录存在。如果目录已经存在，不会报错。

## Parameters

### dirPath

`string`

要创建的目标目录路径

## Returns

`Promise`\<`void`\>

## Example

```ts
await mkdirp('/tmp/a/b/c')
```
