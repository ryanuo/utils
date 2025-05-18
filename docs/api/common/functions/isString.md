[@ryanuo/utils](../../index.md) / [common](../index.md) / isString

# Function: isString()

```ts
function isString(val): val is string;
```

Checks if the value is an string

## Parameters

### val

`unknown`

The value to check

## Returns

`val is string`

Whether the value is an string

## Example

```ts twoslash
import { isString } from '@ryanuo/utils'
isString('123') // true
isString(123) // false
```
