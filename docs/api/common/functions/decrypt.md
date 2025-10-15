[@ryanuo/utils](../../index.md) / [common](../index.md) / decrypt

# Function: decrypt()

```ts
function decrypt(str, key?): string;
```

Decrypts a string previously encrypted with [encrypt](encrypt.md).
Applies URI decoding, Base64 decoding, and XOR decryption.

## Parameters

### str

`string`

The encrypted string.

### key?

`string`

Optional decryption key (must match the encryption key).

## Returns

`string`

The decrypted plain text string.

## Example

```ts twoslash
import { encrypt, decrypt } from '@ryanuo/utils'
const enc = encrypt('hello world', 'key')
decrypt(enc, 'key') // => 'hello world'
```
