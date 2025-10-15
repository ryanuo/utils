[@ryanuo/utils](../../index.md) / [common](../index.md) / compress

# Function: compress()

```ts
function compress(str): string;
```

Compresses a UTF-8 string into a Base64 URI-safe format.

## Parameters

### str

`string`

The string to compress.

## Returns

`string`

The compressed, Base64-encoded string.

## Example

```ts twoslash
import { compress } from '@ryanuo/utils'
compress('hello world') // => 'aGVsbG8lMjB3b3JsZA%3D%3D'
```
