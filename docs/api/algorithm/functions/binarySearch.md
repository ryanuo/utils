[@ryanuo/utils](../../index.md) / [algorithm](../index.md) / binarySearch

# Function: binarySearch()

```ts
function binarySearch(arr, target): number;
```

二分查找（Binary Search）

## Parameters

### arr

`number`[]

已排序的数组

### target

`number`

查找目标

## Returns

`number`

如果找到返回索引，否则返回 -1

## Example

```ts
import { binarySearch } from '@ryanuo/utils'
const index = binarySearch([1, 2, 3, 4, 5], 3)
console.log(index)  // 2
```
