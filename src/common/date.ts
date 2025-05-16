import { isDate, isFunction } from './is'

/**
 * 日期格式化
 * @category Date
 * @param date {Date} 日期
 * @param fmt {string} 格式，默认格式：YYYY-MM-dd
 * <p>格式说明：</p>
 * <p>y或者Y：年份，yy表示两位数字年份，yyyy表示四位数字年份</p>
 * <p>M：表示月份 (0 ~ 11)</p>
 * <p>d：表示月份中的天数(1 ~ 31)</p>
 * <p>H：表示一天中的小时数 (24小时制，0 ~ 23)</p>
 * <p>h：表示一天中的小时数 (12小时制，0 ~ 12)</p>
 * <p>m：表示分钟数 (0 ~ 59)</p>
 * <p>s: 表示秒数 (0 ~ 59)</p>
 * <p>S: 表示毫秒数</p>
 * @return 日期格式化后的string字符串
 */
export function dateFormat(date: Date, fmt = 'YYYY-MM-dd'): string {
  if (!isDate(date))
    throw new TypeError('Parameter must be a valid Date.')

  const year = date.getFullYear().toString()

  // 定义每个占位符的默认填充长度
  const padLengths: { [key: string]: number } = {
    Y: 4,
    y: 2,
    M: 2,
    d: 2,
    H: 2,
    h: 2,
    m: 2,
    s: 2,
    S: 3,
    q: 1,
  }

  const opt: {
    [key: string]: string | ((matched: string) => string)
  } = {
    'Y+': () => year,
    'y+': matched => year.slice(-matched.length),
    'M+': (date.getMonth() + 1).toString(),
    'd+': date.getDate().toString(),
    'H+': date.getHours().toString(),
    'h+': () => {
      const hour = date.getHours()
      return (hour % 12 || 12).toString()
    },
    'm+': date.getMinutes().toString(),
    's+': date.getSeconds().toString(),
    'q+': Math.floor((date.getMonth() + 3) / 3).toString(),
    'S+': date.getMilliseconds().toString(),
  }

  let matchRes
  for (const k in opt) {
    matchRes = fmt.match(new RegExp(k, 'g'))
    matchRes?.forEach((matchedItem) => {
      const placeholder = k.charAt(0) // 获取占位符字符 (Y/M/d等)
      const padLength = padLengths[placeholder] || matchedItem.length

      const value: any = opt[k]
      const replacement = isFunction(opt[k])
        ? value(matchedItem)
        : value

      fmt = fmt.replace(
        matchedItem,
        replacement.toString().padStart(
          Math.max(matchedItem.length, padLength),
          '0',
        ),
      )
    })
  }

  return fmt
}
