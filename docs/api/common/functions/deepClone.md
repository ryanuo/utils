[@ryanuo/utils](../../index.md) / [common](../index.md) / deepClone

# Function: deepClone()

```ts
function deepClone<T>(obj): T;
```

安全的深拷贝（处理循环引用）

## Type Parameters

### T

`T`

## Parameters

### obj

`T`

源对象

## Returns

`T`

## Example

```ts
import { deepClone } from '@ryanuo/utils'
const obj = { a: 1, b: { c: 2 } }
const cloneObj = deepClone(obj)
console.log(cloneObj) // { a: 1, b: { c: 2 } }
```
