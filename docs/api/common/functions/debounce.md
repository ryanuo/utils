[@ryanuo/utils](../../index.md) / [common](../index.md) / debounce

# Function: debounce()

```ts
function debounce<T>(
   fn, 
   delay, 
   immediate): (...args) => void;
```

Function debouncing
A debouncing function is used to limit the frequency of executing a function within a specified time frame, preventing it from being called too frequently.
If the function is called again within the specified interval, the previous call will be canceled and the timer will reset.

## Type Parameters

### T

`T` *extends* (...`args`) => `any`

## Parameters

### fn

`T`

The function to be debounced.

### delay

`number`

The delay in milliseconds within which repeated calls to the function will reset the timer.

### immediate

`boolean` = `false`

A boolean indicating whether the function should execute immediately on the first call. If set to true, the function executes at the start of the wait period; if false, it executes after the wait time following the last call.

## Returns

Returns a new debounced function.

```ts
(...args): void;
```

### Parameters

#### args

...`Parameters`\<`T`\>

### Returns

`void`

## Example

```ts twoslash
import { debounce } from '@ryanuo/utils'
const debouncedFn = debounce(() => {
  console.log('Debounced function executed')
})
debouncedFn()
```
