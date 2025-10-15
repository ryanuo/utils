[@ryanuo/utils](../../index.md) / [common](../index.md) / decompress

# Function: decompress()

```ts
function decompress(str): string;
```

Decompresses a string produced by [compress](compress.md).

## Parameters

### str

`string`

The compressed Base64 string.

## Returns

`string`

The original decompressed string.

## Example

```ts twoslash
import { decompress } from '@ryanuo/utils'
decompress('aGVsbG8lMjB3b3JsZA%3D%3D') // => 'hello world'
```
