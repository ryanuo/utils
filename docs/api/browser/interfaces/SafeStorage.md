[@ryanuo/utils](../../index.md) / [browser](../index.md) / SafeStorage

# Interface: SafeStorage

## Properties

### clear

```ts
clear: () => void & (options) => void;
```

Clear all items from storage

***

### get

```ts
get: <T>(key) => null | T & <T>(key, options) => null | T;
```

Get stored value by key

#### Param

Storage key

#### Returns

Stored value or null if not found/expired

***

### remove

```ts
remove: (key) => void & (key, options) => void;
```

Remove item from storage

#### Param

Storage key

***

### set

```ts
set: (key, value) => boolean & (key, value, options) => boolean;
```

Set value in storage

#### Param

Storage key

#### Param

Value to store

#### Returns

true if successful, false otherwise
