[@ryanuo/utils](../../index.md) / [browser](../index.md) / onceEventListener

# Function: onceEventListener()

```ts
function onceEventListener(
   target, 
   event, 
   handler): void;
```

只触发一次的事件监听

## Parameters

### target

`EventTarget`

目标元素

### event

`string`

事件名

### handler

`EventListener`

处理函数

## Returns

`void`

## Example

```ts twoslash
import { once } from '@ryanuo/utils'
once(document, 'click', (e) => {
  console.log(e)
})
```
