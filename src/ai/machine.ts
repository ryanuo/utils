/**
 * 标准化：减去均值，除以标准差
 * @category MachineLearning
 * @param data [number]
 * @param mean 均值
 * @param stdDev 标准差
 * @returns [number]
 */
function normalizeData(data: number[], mean: number, stdDev: number): number[] {
  if (stdDev === 0)
    throw new Error('division by zero')

  return data.map(value => (value - mean) / stdDev)
}

/**
 * 归一化：映射到[0, 1]区间
 * @category MachineLearning
 * @param data [number]
 * @returns [number]
 */
function normalizeMinMax(data: number[]): number[] {
  const min = Math.min(...data)
  const max = Math.max(...data)

  // 当所有元素相同时，max - min 为零
  if (min === max)
    return data.map(() => 0) // 所有值相同的情况下，直接返回一个 0 的数组

  return data.map(value => (value - min) / (max - min)) // 归一化公式
}

/**
 * 线性回归, 预测下一个值
 * @category MachineLearning
 * @param data [number]
 * @returns number
 */
function linearRegression(data: number[]): number {
  if (data.length === 1) {
    // 如果数组只有一个元素，直接返回该元素作为预测值
    return data[0]
  }

  const n = data.length

  // 创建一个索引数组
  const x = Array.from({ length: n }, (_, i) => i) // x = [0, 1, 2, 3]
  const y = data

  // 计算 x 和 y 的均值
  const xMean = x.reduce((sum, val) => sum + val, 0) / n
  const yMean = y.reduce((sum, val) => sum + val, 0) / n

  // 计算斜率 m
  const numerator = x.reduce((sum, xi, idx) => sum + (xi - xMean) * (y[idx] - yMean), 0)
  const denominator = x.reduce((sum, xi) => sum + (xi - xMean) ** 2, 0)
  const m = numerator / denominator

  // 计算截距 b
  const b = yMean - m * xMean

  // 使用模型预测下一个值
  const nextX = n // 下一个点的索引
  return m * nextX + b
}

export {
  linearRegression,
  normalizeData,
  normalizeMinMax,
}
