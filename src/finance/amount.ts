/**
 * amount formatter
 * @category Amount
 * @param amount
 * @param currency
 * @param locale
 * @returns formatted amount
 */
export function formatCurrency(
  amount: number,
  currency: string = 'CNY',
  locale: string = 'zh-CN',
): string {
  if (Number.isNaN(amount))
    throw new Error('Invalid amount')

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}
