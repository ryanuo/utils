[@ryanuo/utils](../../index.md) / [common](../index.md) / isUndefined

# Function: isUndefined()

```ts
function isUndefined(val): val is undefined
```

Checks if the value is an undefined

## Parameters

### val

`any`

The value to check

## Returns

`val is undefined`

Whether the value is an undefined

## Example

```ts
import { isUndefined } from '@ryanuo/utils'
isUndefined(undefined) // true
isUndefined(null) // false
```
