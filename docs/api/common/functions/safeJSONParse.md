[@ryanuo/utils](../../index.md) / [common](../index.md) / safeJSONParse

# Function: safeJSONParse()

```ts
function safeJSONParse(json): any;
```

Safely parses a JSON string

## Parameters

### json

`string`

The JSON string to be parsed

## Returns

`any`

A successfully parsed JSON object, or null if parsing fails

## Example

```ts twoslash
import { safeJSONParse } from '@ryanuo/utils'
const json = '{"name": "John", "age": 30}'
const obj = safeJSONParse(json)
console.log(obj) // { name: 'John', age: 30 }
```
