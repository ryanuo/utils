/**
 * Performs XOR encryption or decryption on a string using a given key.
 * @category crypto
 * @example
 * ```ts twoslash
 * import { xor } from '@ryanuo/utils'
 * xor('abc', 'key') // Encrypt
 * xor(xor('abc', 'key'), 'key') // Decrypt (reversible)
 * ```
 * @param str - The string to process.
 * @param key - The encryption key, defaults to `'ryanuo'`.
 * @returns The XOR-transformed string.
 */
function xor(str: string, key = 'ryanuo') {
  return Array.from(str)
    .map((c, i) =>
      String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length)),
    )
    .join('')
}

/**
 * Encrypts a string using XOR, Base64, and URI encoding for safe transmission.
 * @category crypto
 * @example
 * ```ts twoslash
 * import { encrypt } from '@ryanuo/utils'
 * encrypt('hello world', 'key') // => '%4D%0A...'
 * ```
 * @param str - The plain text to encrypt.
 * @param key - Optional encryption key, defaults to `'ryanuo'`.
 * @returns The encrypted, URI-safe string.
 */
function encrypt(str: string, key?: string): string {
  return encodeURIComponent(btoa(xor(str, key)))
}

/**
 * Compresses a UTF-8 string into a Base64 URI-safe format.
 * @category compress
 * @example
 * ```ts twoslash
 * import { compress } from '@ryanuo/utils'
 * compress('hello world') // => 'aGVsbG8lMjB3b3JsZA%3D%3D'
 * ```
 * @param str - The string to compress.
 * @returns The compressed, Base64-encoded string.
 */
function compress(str: string): string {
  const bytes = new TextEncoder().encode(str)
  const base64 = btoa(String.fromCharCode(...bytes))
  return encodeURIComponent(base64)
}

/**
 * Decompresses a string produced by {@link compress}.
 * @category compress
 * @example
 * ```ts twoslash
 * import { decompress } from '@ryanuo/utils'
 * decompress(compress('hello world')) // => 'hello world'
 * ```
 * @param str - The compressed Base64 string.
 * @returns The original decompressed string.
 */
function decompress(str: string): string {
  try {
    const decodedBase64 = decodeURIComponent(str)
    const binary = atob(decodedBase64)
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0))
    return new TextDecoder().decode(bytes)
  }
  catch (err) {
    console.error('Decompress error:', err)
    return ''
  }
}

/**
 * Decrypts a string previously encrypted with {@link encrypt}.
 * Applies URI decoding, Base64 decoding, and XOR decryption.
 * @category crypto
 * @example
 * ```ts twoslash
 * import { encrypt, decrypt } from '@ryanuo/utils'
 * const enc = encrypt('hello world', 'key')
 * decrypt(enc, 'key') // => 'hello world'
 * ```
 * @param str - The encrypted string.
 * @param key - Optional decryption key (must match the encryption key).
 * @returns The decrypted plain text string.
 */
function decrypt(str: string, key?: string): string {
  try {
    const decoded = atob(decodeURIComponent(str))
    return xor(decoded, key)
  }
  catch (err) {
    console.error('Decrypt error:', err)
    return ''
  }
}

export {
  xor,
  encrypt,
  decrypt,
  compress,
  decompress,
}
