[@ryanuo/utils](../../index.md) / [common](../index.md) / toString

# Function: toString()

```ts
function toString(v): string;
```

to string type of value [Object.prototype.toString]

## Parameters

### v

`any`

The value to check

## Returns

`string`

The string representation of the value

## Example

```ts
import { toString } from '@ryanuo/utils'
toString({}) // '[object Object]'
```
