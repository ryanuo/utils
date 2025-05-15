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

### storeName

`string`

## Returns

`Promise`\<\{
  `get`: `Promise`\<`undefined` \| `T`\>;
  `set`: `Promise`\<`void`\>;
\}\>

Promise<{ get: (key: string) => Promise<any>, set: (key: string, value: any) => Promise<void> }>

## Example

```ts
// 使用示例
const cache = await getIndexedDBCache('api-cache', 'responses');
await cache.set('users', [{ id: 1, name: 'Alice' }]);
const users = await cache.get('users');
```
