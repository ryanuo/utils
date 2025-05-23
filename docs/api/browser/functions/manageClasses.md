[@ryanuo/utils](../../index.md) / [browser](../index.md) / manageClasses

# Function: manageClasses()

```ts
function manageClasses(
   el, 
   action, 
   classes): void;
```

批量操作元素类名

## Parameters

### el

`HTMLElement`

目标元素

### action

'add' | 'remove' | 'toggle'

`"add"` | `"remove"` | `"toggle"`

### classes

`string`[]

类名数组

## Returns

`void`

## Example

```ts twoslash
import { manageClasses } from '@ryanuo/utils'
const el = document.getElementById('myElement') as HTMLElement
manageClasses(el, 'add', ['class1', 'class2'])
```
