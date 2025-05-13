[@ryanuo/utils](../../index.md) / [common](../index.md) / isDate

# Function: isDate()

```ts
function isDate(val): val is Date;
```

Checks if the value is an date

## Parameters

### val

`any`

The value to check

## Returns

`val is Date`

Whether the value is an date

## Example

```ts
import { isDate } from '@ryanuo/utils'
isDate(new Date()) // true
isDate('2023-01-01') // false
isDate(123) // false
```
