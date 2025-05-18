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
import { safeParseJSON } from '@ryanuo/utils'
const json = '{"name": "John", "age": 30}'
const obj = safeParseJSON(json)
console.log(obj) // { name: 'John', age: 30 }
```
