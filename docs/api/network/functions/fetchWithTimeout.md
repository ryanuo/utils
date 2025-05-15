[@ryanuo/utils](../../index.md) / [network](../index.md) / fetchWithTimeout

# Function: fetchWithTimeout()

```ts
function fetchWithTimeout(
   url, 
   options, 
timeout): Promise<Response>;
```

带超时的 fetch 请求

## Parameters

### url

`string`

请求地址

### options

`RequestInit` = `{}`

请求配置

### timeout

`number` = `5000`

超时时间（默认 5s）

## Returns

`Promise`\<`Response`\>
