[@ryanuo/utils](../../index.md) / [common](../index.md) / getUuid

# Function: getUuid()

```ts
function getUuid(): string
```

Generate a unique UUID
UUID (Universally Unique Identifier) is a standard used in distributed systems to uniquely identify information
This function implements a simple UUID generation algorithm, primarily used to generate unique identifiers for use in applications

## Returns

`string`

The generated UUID string in the format 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'

## Example

```ts
import { getUuid } from '@ryanuo/utils'
console.log(getUuid()) // xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
```
