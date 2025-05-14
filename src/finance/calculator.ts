import { Decimal } from 'decimal.js'

// 初始化配置（可选）
export const decimal = Decimal
decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP })

/**
 * 精确加法
 * @category Calculator
 * @param args 多个数字或字符串
 */
export function preciseAdd(...args: (number | string)[]): Decimal {
  return args.reduce<Decimal>(
    (sum, num) => sum.plus(new Decimal(num)),
    new Decimal(0),
  )
}

/**
 * 精确减法
 * @category Calculator
 * @param a 被减数
 * @param b 减数
 * @param moreNumbers 可选的更多减数
 */
export function preciseSub(
  a: number | string,
  b: number | string,
  ...moreNumbers: (number | string)[]
): Decimal {
  let result = new Decimal(a).minus(new Decimal(b))
  for (const num of moreNumbers)
    result = result.minus(new Decimal(num))

  return result
}

/**
 * 精确乘法
 * @category Calculator
 * @param args 多个数字或字符串
 */
export function preciseMul(...args: (number | string)[]): Decimal {
  if (args.length === 0)
    return new Decimal(0)
  return args.reduce<Decimal>(
    (product, num) => product.times(new Decimal(num)),
    new Decimal(1),
  )
}

/**
 * 精确除法
 * @category Calculator
 * @param a 被除数
 * @param b 除数
 * @param moreDivisors 可选的更多除数
 */
export function preciseDiv(
  a: number | string,
  b: number | string,
  ...moreDivisors: (number | string)[]
): Decimal {
  let result = new Decimal(a).dividedBy(new Decimal(b))
  for (const num of moreDivisors)
    result = result.dividedBy(new Decimal(num))

  return result
}

/**
 * 四舍五入（银行家舍入法）
 * @category Calculator
 * @param num 数字或Decimal实例
 * @param decimalPlaces 保留小数位数
 */
export function roundTo(
  num: number | string | Decimal,
  decimalPlaces: number = 2,
): Decimal {
  if (decimalPlaces < 0)
    throw new Error('Decimal places must be a non-negative integer')
  return new Decimal(num).toDecimalPlaces(decimalPlaces)
}

/**
 * 比较数字大小
 * @category Calculator
 * @returns
 *  1  : a > b
 *  0  : a = b
 *  -1 : a < b
 */
export function compare(
  a: number | string | Decimal,
  b: number | string | Decimal,
): number {
  return new Decimal(a).comparedTo(new Decimal(b))
}

/**
 * 计算百分比
 * @category Calculator
 * @param part 部分值
 * @param total 总值
 * @param decimalPlaces 小数位数
 */
export function calculatePercentage(
  part: number | string,
  total: number | string,
  option?: {
    decimalPlaces?: number
    isSymbol?: boolean
  },
): string {
  if (Number(total) === 0)
    return 'NaN'

  const { decimalPlaces = 2, isSymbol = false } = option || {}

  if (isSymbol) {
    return `${preciseDiv(part, total)
      .times(100)
      .toFixed(decimalPlaces)}%`
  }
  else {
    return preciseDiv(part, total)
      .times(100)
      .toFixed(decimalPlaces)
  }
}

/**
 * 链式计算
 * @category Calculator
 * @param num 数字或Decimal实例
 * @returns 链式计算对象
 * @example
 * ```ts
 * import { chain } from '@ryanuo/utils'
 * chain(100)
 *   .add(10)
 *   .sub(5)
 *   .mul(2)
 *   .div(3)
 *  .round(2) // 63.33
 *```
 */
export class CalculatorChain {
  public value: Decimal

  constructor(num: number | string) {
    this.value = new Decimal(num)
  }

  /**
   * 加法
   * @param num 数字或字符串
   */
  add(num: number | string): CalculatorChain {
    this.value = this.value.plus(new Decimal(num))
    return this
  }

  /**
   * 减法
   * @param num 数字或字符串
   */
  sub(num: number | string): CalculatorChain {
    this.value = this.value.minus(new Decimal(num))
    return this
  }

  /**
   * 乘法
   * @param num 数字或字符串
   */
  mul(num: number | string): CalculatorChain {
    this.value = this.value.times(new Decimal(num))
    return this
  }

  /**
   * 除法
   * @param num 数字或字符串
   */
  div(num: number | string): CalculatorChain {
    if (Number(num) === 0)
      throw new Error('Cannot divide by zero')
    this.value = this.value.dividedBy(new Decimal(num))
    return this
  }

  /**
   * round
   * @param num 数字或字符串
   * @returns
   */
  round(decimalPlaces: number = 2): Decimal {
    return this.value.toDecimalPlaces(decimalPlaces)
  }
}
