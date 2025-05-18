[@ryanuo/utils](../../index.md) / [browser](../index.md) / safeStorage

# Variable: safeStorage

```ts
const safeStorage: SafeStorage;
```

A simple storage wrapper that uses localStorage and sessionStorage.

## Example

```ts twoslash
import { safeStorage } from '@ryanuo/utils'
// Basic usage (localStorage)
safeStorage.set('user', { name: 'John' })
const user = safeStorage.get<{ name: string }>('user')
// With sessionStorag
safeStorage.set('token', 'abc123', { storage: 'session' })
const token = safeStorage.get<string>('token', { storage: 'session' })
// With expiration (1 hour)
safeStorage.set('tempData', { foo: 'bar' }, { expires: 3600000 })
// Remove from sessionStorag
safeStorage.remove('token', { storage: 'session' })
// Clear sessionStorag
safeStorage.clear({ storage: 'session' })
```
