[@ryanuo/utils](../../index.md) / [finance](../index.md) / CalculatorChain

# Class: CalculatorChain

链式计算

## Param

数字或Decimal实例

## Example

```ts
import { chain } from '@ryanuo/utils'
chain(100)
  .add(10)
  .sub(5)
  .mul(2)
  .div(3)
 .round(2) // 63.33
```

## Constructors

### Constructor

```ts
new CalculatorChain(num): CalculatorChain;
```

#### Parameters

##### num

`string` | `number`

#### Returns

`CalculatorChain`

## Properties

### value

```ts
value: Decimal;
```

## Methods

### add()

```ts
add(num): CalculatorChain;
```

加法

#### Parameters

##### num

数字或字符串

`string` | `number`

#### Returns

`CalculatorChain`

***

### div()

```ts
div(num): CalculatorChain;
```

除法

#### Parameters

##### num

数字或字符串

`string` | `number`

#### Returns

`CalculatorChain`

***

### mul()

```ts
mul(num): CalculatorChain;
```

乘法

#### Parameters

##### num

数字或字符串

`string` | `number`

#### Returns

`CalculatorChain`

***

### round()

```ts
round(decimalPlaces): Decimal;
```

round

#### Parameters

##### decimalPlaces

`number` = `2`

#### Returns

`Decimal`

***

### sub()

```ts
sub(num): CalculatorChain;
```

减法

#### Parameters

##### num

数字或字符串

`string` | `number`

#### Returns

`CalculatorChain`
