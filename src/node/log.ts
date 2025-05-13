/* eslint-disable no-console */
/**
 * 彩色控制台输出
 */
export const logger = {
  red: (msg: string) => console.log('\x1B[31m%s\x1B[0m', msg),
  green: (msg: string) => console.log('\x1B[32m%s\x1B[0m', msg),
  yellow: (msg: string) => console.log('\x1B[33m%s\x1B[0m', msg),
  blue: (msg: string) => console.log('\x1B[34m%s\x1B[0m', msg),
}
