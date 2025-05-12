[@ryanuo/utils](../../index.md) / [common](../index.md) / isBoolean

# Function: isBoolean()

```ts
function isBoolean(value): value is boolean
```

## Parameters

### value

`unknown`

The value to check
Checks if the value is a boolean

## Returns

`value is boolean`

## Example

```ts
import { isBoolean } from '@ryanuo/utils'
isBoolean(true) // true
isBoolean(false) // true
isBoolean(1) // false
isBoolean('true') // false
isBoolean(null) // false
isBoolean(undefined) // false
isBoolean({}) // false
isBoolean([]) // false
```
