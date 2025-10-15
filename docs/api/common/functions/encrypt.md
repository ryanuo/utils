[@ryanuo/utils](../../index.md) / [common](../index.md) / encrypt

# Function: encrypt()

```ts
function encrypt(str, key?): string;
```

Encrypts a string using XOR, Base64, and URI encoding for safe transmission.

## Parameters

### str

`string`

The plain text to encrypt.

### key?

`string`

Optional encryption key, defaults to `'ryanuo'`.

## Returns

`string`

The encrypted, URI-safe string.

## Example

```ts twoslash
import { encrypt } from '@ryanuo/utils'
encrypt('hello world', 'key') // => '%4D%0A...'
```
