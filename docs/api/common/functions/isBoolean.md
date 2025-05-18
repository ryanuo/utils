[@ryanuo/utils](../../index.md) / [common](../index.md) / isBoolean

# Function: isBoolean()

```ts
function isBoolean(value): value is boolean;
```

Checks if the value is a boolean

## Parameters

### value

`unknown`

The value to check

## Returns

`value is boolean`

Whether the value is a boolean

## Example

```ts twoslash
import { isBoolean } from '@ryanuo/utils'
isBoolean(true) // true
isBoolean(false) // true
isBoolean(1) // false
```
