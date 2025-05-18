[@ryanuo/utils](../../index.md) / [browser](../index.md) / downloadFile

# Function: downloadFile()

```ts
function downloadFile(
   url, 
   fileName?, 
options?): Promise<void>;
```

文件下载工具函数

## Parameters

### url

`string`

文件URL地址

### fileName?

`string`

可选的下载文件名（默认为URL中的文件名）

### options?

`RequestInit` = `{}`

可选的请求配置（同fetch API）

## Returns

`Promise`\<`void`\>

成功或失败的Promise

## Example

```ts
// 基础用法
downloadFile('https://example.com/file.pdf');

// 自定义文件名
downloadFile('https://example.com/data.csv', 'custom-data.csv');

// 带请求头的下载
downloadFile('https://api.example.com/export', 'report.xlsx', {
  headers: {
    Authorization: 'Bearer token'
  }
});
```
