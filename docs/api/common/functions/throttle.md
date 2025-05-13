[@ryanuo/utils](../../index.md) / [common](../index.md) / throttle

# Function: throttle()

```ts
function throttle<T>(
   fn, 
   delay, 
   immediate): (...args) => void;
```

Creates a throttled function that only executes the original function at most once per `delay` milliseconds.
If `immediate` is true, the original function will be executed immediately upon the first call within the `delay` period.

## Type Parameters

### T

`T` *extends* (...`args`) => `any`

## Parameters

### fn

`T`

The original function to be throttled.

### delay

`number`

The minimum interval in milliseconds between executions of the original function.

### immediate

`boolean` = `true`

Whether to execute the original function immediately upon the first call within the `delay` period. Defaults to true.

## Returns

Returns a new throttled function.

```ts
(...args): void;
```

### Parameters

#### args

...`Parameters`\<`T`\>

### Returns

`void`
