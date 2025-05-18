[@ryanuo/utils](../../index.md) / [common](../index.md) / numberToFixed

# Function: numberToFixed()

```ts
function numberToFixed(num, fixed): number;
```

Convert a number to a fixed value with specified decimal places.

## Parameters

### num

`number`

The number to be converted.

### fixed

`number` = `4`

The number of decimal places, defaults to 4.

## Returns

`number`

The converted number with the specified number of decimal places.

## Example

```ts twoslash
import { numberToFixed } from '@ryanuo/utils'
numberToFixed(1.23456) // 1.2346
numberToFixed(1.23456, 2) // 1.23
numberToFixed(1.23456, 3) // 1.235
```
