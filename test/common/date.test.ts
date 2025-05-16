import { describe, expect, it } from 'vitest'
import { dateFormat } from '~/common/date'

describe('dateFormat', () => {
  const date = new Date(2022, 1, 5, 16, 44, 11, 123) // 注意：月份是从0开始计算的，所以1代表二月

  it('should format the date with default format', () => {
    const result = dateFormat(date)
    expect(result).toBe('2022-02-05')
  })

  it('should format the date with custom format', () => {
    const result = dateFormat(date, 'YYYY-MM-dd hh:mm:ss')
    expect(result).toBe('2022-02-05 04:44:11')
  })

  it('should handle two-digit year format', () => {
    const result = dateFormat(date, 'yy-MM-dd')
    expect(result).toBe('22-02-05')
  })

  it('should throw TypeError for non-date input', () => {
    expect(() => dateFormat(null as any)).toThrow('Parameter must be a valid Date.')
  })

  it('should correctly pad single digit values', () => {
    const singleDigitDate = new Date(2022, 0, 5, 9, 3, 7, 8) // 单位数的月、日、小时、分钟、秒和毫秒
    const result = dateFormat(singleDigitDate, 'YYYY-M-d H:m:s.SSS')
    expect(result).toBe('2022-01-05 09:03:07.008')
  })

  it('should handle 12-hour clock format', () => {
    const pmDate = new Date(2022, 1, 5, 16, 44, 11, 123) // 下午4点44分
    const amDate = new Date(2022, 1, 5, 4, 44, 11, 123) // 上午4点44分
    expect(dateFormat(pmDate, 'YYYY-MM-dd hh:mm:ss')).toBe('2022-02-05 04:44:11')
    expect(dateFormat(amDate, 'YYYY-MM-dd hh:mm:ss')).toBe('2022-02-05 04:44:11')
  })
})
