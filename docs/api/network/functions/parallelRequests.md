[@ryanuo/utils](../../index.md) / [network](../index.md) / parallelRequests

# Function: parallelRequests()

```ts
function parallelRequests<T>(requests, concurrency): Promise<T[]>;
```

控制并发数的请求队列

## Type Parameters

### T

`T`

## Parameters

### requests

() => `Promise`\<`T`\>[]

请求函数数组

### concurrency

`number` = `5`

最大并发数（默认 5）

## Returns

`Promise`\<`T`[]\>
