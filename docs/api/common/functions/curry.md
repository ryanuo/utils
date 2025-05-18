[@ryanuo/utils](../../index.md) / [common](../index.md) / curry

# Function: curry()

```ts
function curry<F>(fn): Curry<F>;
```

Converts a function into a curried function.
The feature of a curried function is that it can receive one or more arguments,
and returns a new function until all required arguments are received, then executes the original function.

## Type Parameters

### F

`F` *extends* (...`args`) => `any`

## Parameters

### fn

`F`

The function to be converted; can be any type of function.

## Returns

`Curry`\<`F`\>

Returns a curried function capable of gradually receiving arguments until the original function's requirements are satisfied.

## Example

```ts twoslash
import { curry } from '@ryanuo/utils'
const add = (a: number, b: number) => a + b
const curriedAdd = curry(add)
console.log(curriedAdd(1)(2)) // 3
console.log(curriedAdd(1, 2)) // 3
```
