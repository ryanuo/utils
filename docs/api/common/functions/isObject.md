[@ryanuo/utils](../../index.md) / [common](../index.md) / isObject

# Function: isObject()

```ts
function isObject(val): val is object
```

Checks if the value is an object

## Parameters

### val

`any`

The value to check

## Returns

`val is object`

Whether the value is an object

## Example

```ts
import { isObject } from '@ryanuo/utils'
isObject({}) // true
isObject([]) // false
```
