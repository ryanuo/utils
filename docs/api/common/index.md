[@ryanuo/utils](../index.md) / common

# common

Common utilities and types for the project

## Date

| Function | Description |
| ------ | ------ |
| [dateFormat](functions/dateFormat.md) | 日期格式化 |

## Other

| Function | Description |
| ------ | ------ |
| [curry](functions/curry.md) | Converts a function into a curried function. The feature of a curried function is that it can receive one or more arguments, and returns a new function until all required arguments are received, then executes the original function. |
| [debounce](functions/debounce.md) | Function debouncing A debouncing function is used to limit the frequency of executing a function within a specified time frame, preventing it from being called too frequently. If the function is called again within the specified interval, the previous call will be canceled and the timer will reset. |
| [getUuid](functions/getUuid.md) | Generate a unique UUID UUID (Universally Unique Identifier) is a standard used in distributed systems to uniquely identify information This function implements a simple UUID generation algorithm, primarily used to generate unique identifiers for use in applications |
| [safeJSONParse](functions/safeJSONParse.md) | Safely parses a JSON string |
| [throttle](functions/throttle.md) | Creates a throttled function that only executes the original function at most once per `delay` milliseconds. If `immediate` is true, the original function will be executed immediately upon the first call within the `delay` period. |

## is

| Function | Description |
| ------ | ------ |
| [isBoolean](functions/isBoolean.md) | Checks if the value is a boolean |
| [isBrowser](functions/isBrowser.md) | Checks if the current environment is a browser |
| [isDate](functions/isDate.md) | Checks if the value is an date |
| [isEmptyObject](functions/isEmptyObject.md) | Check if an object is empty. |
| [isFunction](functions/isFunction.md) | Checks if the value is a function |
| [isNull](functions/isNull.md) | Checks if the value is an null |
| [isNumber](functions/isNumber.md) | Checks if the value is a number |
| [isObject](functions/isObject.md) | Checks if the value is an object |
| [isRegExp](functions/isRegExp.md) | Checks if the value is an regexp |
| [isString](functions/isString.md) | Checks if the value is an string |
| [isUndefined](functions/isUndefined.md) | Checks if the value is an undefined |

## type

| Function | Description |
| ------ | ------ |
| [deepClone](functions/deepClone.md) | 安全的深拷贝（处理循环引用） |
| [getTypeName](functions/getTypeName.md) | Get the type name of the value |
| [numberToFixed](functions/numberToFixed.md) | Convert a number to a fixed value with specified decimal places. |
| [toString](functions/toString.md) | to string type of value [Object.prototype.toString] |
