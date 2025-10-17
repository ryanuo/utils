[@ryanuo/utils](../../index.md) / [node](../index.md) / rmrf

# Function: rmrf()

```ts
function rmrf(path): Promise<void>;
```

递归删除目录或文件
这个函数会删除指定路径下的文件或目录及其所有子内容。
如果路径不存在，也不会报错。

## Parameters

### path

`string`

要删除的目标路径

## Returns

`Promise`\<`void`\>

## Example

```ts
await rmrf('/tmp/a/b/c')
```
