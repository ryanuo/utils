[@ryanuo/utils](../../index.md) / [network](../index.md) / getIndexedDBCache

# Function: getIndexedDBCache()

```ts
function getIndexedDBCache(dbName, storeName): Promise<{
  get: Promise<undefined | T>;
  set: Promise<void>;
}>;
```

获取 IndexedDB 缓存

## Parameters

### dbName

`string`

indexedDB 数据库名称

### storeName

`string`

缓存对象名称

## Returns

`Promise`\<\{
  `get`: `Promise`\<`undefined` \| `T`\>;
  `set`: `Promise`\<`void`\>;
\}\>

IndexedDB 缓存对象

## Example

```ts twoslash
// 使用示例
const cache = await getIndexedDBCache('api-cache', 'responses');
await cache.set('users', [{ id: 1, name: 'Alice' }]);
const users = await cache.get('users');
```
