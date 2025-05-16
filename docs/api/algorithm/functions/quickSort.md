[@ryanuo/utils](../../index.md) / [algorithm](../index.md) / quickSort

# Function: quickSort()

```ts
function quickSort(arr): number[];
```

快速排序（Quick Sort）

## Parameters

### arr

`number`[]

数组

## Returns

`number`[]

排序后的数组

## Example

```ts
import { quickSort } from '@ryanuo/utils'
const sorted = quickSort([5, 3, 8, 4, 2])
console.log(sorted)  // [2, 3, 4, 5, 8]
```
