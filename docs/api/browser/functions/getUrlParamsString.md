[@ryanuo/utils](../../index.md) / [browser](../index.md) / getUrlParamsString

# Function: getUrlParamsString()

```ts
function getUrlParamsString(obj, url?): string;
```

Convert an object to URL parameters

## Parameters

### obj

`Record`\<`string`, `string`\>

The object to convert

### url?

`string`

The URL to which parameters will be added, defaults to the current page URL

## Returns

`string`

## Example

```ts
import { getUrlParamsString } from '@ryanuo/utils'
getUrlParamsString({ a: 1, b: 2 }) // '?a=1&b=2'
getUrlParamsString({ a: 1, b: 2 }, 'https://www.example.com')
```
