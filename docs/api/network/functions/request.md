[@ryanuo/utils](../../index.md) / [network](../index.md) / request

# Function: request()

```ts
function request<T>(
   method, 
   url, 
   data?, 
headers?): Promise<T>;
```

封装 GET/POST 请求（自动处理 JSON）

## Type Parameters

### T

`T` = `any`

## Parameters

### method

`"GET"` | `"POST"` | `"PUT"` | `"DELETE"`

### url

`string`

### data?

`object`

### headers?

`Record`\<`string`, `string`\> = `{}`

## Returns

`Promise`\<`T`\>
