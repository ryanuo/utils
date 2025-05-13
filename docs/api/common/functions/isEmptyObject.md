[@ryanuo/utils](../../index.md) / [common](../index.md) / isEmptyObject

# Function: isEmptyObject()

```ts
function isEmptyObject(val): val is object;
```

Check if an object is empty.

## Parameters

### val

`any`

## Returns

`val is object`

## Example

```ts
import { isEmptyObject } from '@ryanuo/utils'
isEmptyObject({}) // true
isEmptyObject([]) // true
isEmptyObject({ a: 1 }) // false
```
