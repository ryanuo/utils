[@ryanuo/utils](../../index.md) / [common](../index.md) / isFunction

# Function: isFunction()

```ts
function isFunction<T>(val): val is T
```

Checks if the value is a function

## Type Parameters

### T

`T` *extends* `Function`

## Parameters

### val

`any`

The value to check

## Returns

`val is T`

Whether the value is a function

## Example

```ts
import { isFunction } from '@ryanuo/utils'
isFunction(() => {}) // true
isFunction(123) // false
isFunction('123') // false
```
