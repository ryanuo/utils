[@ryanuo/utils](../../index.md) / [algorithm](../index.md) / fibonacciRecursive

# Function: fibonacciRecursive()

```ts
function fibonacciRecursive(n): number;
```

斐波那契数列（递归版）

## Parameters

### n

`number`

数列的索引

## Returns

`number`

斐波那契数列的第 n 项，若 n 为负数则返回 0

## Example

```ts twoslash
import { fibonacciRecursive } from '@ryanuo/utils'
console.log(fibonacciRecursive(10))  // 55
```
