[@ryanuo/utils](../../index.md) / [common](../index.md) / isNumber

# Function: isNumber()

```ts
function isNumber(value): value is number;
```

Checks if the value is a number

## Parameters

### value

`unknown`

The value to check

## Returns

`value is number`

Whether the value is a number

## Example

```ts
import { isNumber } from '@ryanuo/utils'
isNumber(123) // true
isNumber('123') // false
```
