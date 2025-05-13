[@ryanuo/utils](../../index.md) / [common](../index.md) / isNull

# Function: isNull()

```ts
function isNull(val): val is null;
```

Checks if the value is an null

## Parameters

### val

`any`

The value to check

## Returns

`val is null`

Whether the value is an null

## Example

```ts
import { isNull } from '@ryanuo/utils'
isNull(null) // true
isNull(undefined) // false
```
