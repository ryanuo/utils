[@ryanuo/utils](../../index.md) / [common](../index.md) / getTypeName

# Function: getTypeName()

```ts
function getTypeName(v): string;
```

Get the type name of the value

## Parameters

### v

`any`

get type name

## Returns

`string`

The type name of the value

## Example

```ts twoslash
import { getTypeName } from '@ryanuo/utils'
getTypeName({}) // 'object'
getTypeName([]) // 'array'
getTypeName('') // 'string'
getTypeName(1) // 'number'
```
