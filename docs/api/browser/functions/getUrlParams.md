[@ryanuo/utils](../../index.md) / [browser](../index.md) / getUrlParams

# Function: getUrlParams()

```ts
function getUrlParams(url): Record<string, string>;
```

Parse URL query parameters

## Parameters

### url

`string` = `window.location.search`

Optional, defaults to the current page URL

## Returns

`Record`\<`string`, `string`\>

An object of parsed parameters

## Example

```ts twoslash
import { getUrlParams } from '@ryanuo/utils'
getUrlParams() // { a: '1', b: '2' }
```
