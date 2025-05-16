[@ryanuo/utils](../../index.md) / [common](../index.md) / dateFormat

# Function: dateFormat()

```ts
function dateFormat(date, fmt): string;
```

日期格式化

## Parameters

### date

`Date`

{Date} 日期

### fmt

`string` = `'YYYY-MM-dd'`

{string} 格式，默认格式：YYYY-MM-dd
<p>格式说明：</p>
<p>y或者Y：年份，yy表示两位数字年份，yyyy表示四位数字年份</p>
<p>M：表示月份 (0 ~ 11)</p>
<p>d：表示月份中的天数(1 ~ 31)</p>
<p>H：表示一天中的小时数 (24小时制，0 ~ 23)</p>
<p>h：表示一天中的小时数 (12小时制，0 ~ 12)</p>
<p>m：表示分钟数 (0 ~ 59)</p>
<p>s: 表示秒数 (0 ~ 59)</p>
<p>S: 表示毫秒数</p>

## Returns

`string`

日期格式化后的string字符串
