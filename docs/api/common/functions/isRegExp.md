[@ryanuo/utils](../../index.md) / [common](../index.md) / isRegExp

# Function: isRegExp()

```ts
function isRegExp(val): val is RegExp;
```

Checks if the value is an regexp

## Parameters

### val

`any`

The value to check

## Returns

`val is RegExp`

Whether the value is an regexp

## Example

```ts twoslash
import { isRegExp } from '@ryanuo/utils'
isRegExp(/test/) // true
isRegExp('test') // false
```
