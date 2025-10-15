[@ryanuo/utils](../../index.md) / [common](../index.md) / xor

# Function: xor()

```ts
function xor(str, key): string;
```

Performs XOR encryption or decryption on a string using a given key.

## Parameters

### str

`string`

The string to process.

### key

`string` = `'ryanuo'`

The encryption key, defaults to `'ryanuo'`.

## Returns

`string`

The XOR-transformed string.

## Example

```ts twoslash
import { xor } from '@ryanuo/utils'
xor('abc', 'key') // Encrypt
xor(xor('abc', 'key'), 'key') // Decrypt (reversible)
```
