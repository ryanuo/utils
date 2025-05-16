<p align="center">
<img src="https://raw.githubusercontent.com/ryanuo/utils/main/docs/public/utils.svg" style="width:100px;" />
</p>

<h1 align="center">@ryanuo/utils</h1>

<div align="center">
  <a href="https://npmjs.com/package/@ryanuo/utils" style="text-decoration: none;">
    <img src="https://img.shields.io/npm/v/@ryanuo/utils?style=flat&colorA=080f12&colorB=1fa669" alt="npm version">
  </a>
  <a href="https://npmjs.com/package/@ryanuo/utils" style="text-decoration: none;">
    <img src="https://img.shields.io/npm/dm/@ryanuo/utils?style=flat&colorA=080f12&colorB=1fa669" alt="npm downloads">
  </a>
  <a href="https://bundlephobia.com/result?p=@ryanuo/utils" style="text-decoration: none;">
    <img src="https://img.shields.io/bundlephobia/minzip/@ryanuo/utils?style=flat&colorA=080f12&colorB=1fa669&label=minzip" alt="bundle size">
  </a>
  <a href="https://www.jsdocs.io/package/@ryanuo/utils" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669" alt="JSDocs">
  </a>
  <a href="https://github.com/ryanuo/utils/blob/main/LICENSE" style="text-decoration: none;">
    <img src="https://img.shields.io/github/license/ryanuo/utils.svg?style=flat&colorA=080f12&colorB=1fa669" alt="License">
  </a>
</div>

## Overview

`@ryanuo/utils` is a powerful utility library that provides a variety of practical helper functions across multiple domains such as algorithms, browser operations, network requests, and more, aiming to boost development efficiency.
- **AI Module**: Provides utility functions related to artificial intelligence to aid AI development.
- **Algorithm Module**: Contains implementations of commonly used algorithms for quick integration.
- **Browser Module**: Offers utility functions for browser environments to simplify DOM manipulation and event handling.
- **Node.js Module**: Specifically designed utility functions for Node.js environment to enhance productivity.
- **Finance Module**: Includes utility functions relevant to financial calculations suitable for finance-related scenarios.
- **Graphics Module**: Provides utility functions related to graphics processing ideal for image and graphic development.
- **Network Module**: Contains utility functions for network requests and data processing to streamline network operations.
- **Common Module**: Provides general-purpose foundational utility functions applicable in various scenarios.

## Installation

Install using npm:

```bash
npm install @ryanuo/utils
```

Install using pnpm:

```bash
pnpm add @ryanuo/utils
```

Install using yarn:

```bash
yarn add @ryanuo/utils
```

## Usage

```ts
// Module to be used in both browser and Node environments
import { /* shared utility functions */ } from '@ryanuo/utils'

// Module to be used only in Node environment
// Note: This module includes functionalities specifically designed for Node, such as file operations, network requests, etc.
import { /* Node-specific utility functions */ } from '@ryanuo/utils/node'
```

## Available Utilities

Below are the module categories available in the utility library:
<!-- auto utils start -->
| Type | Function List |
|------|----------------|
| [Ai](https://utils.ryanuo.cc/api/ai/) | [linearRegression()](https://utils.ryanuo.cc/api/ai/functions/linearRegression.html)；[normalizeData()](https://utils.ryanuo.cc/api/ai/functions/normalizeData.html)；[normalizeMinMax()](https://utils.ryanuo.cc/api/ai/functions/normalizeMinMax.html) |
| [Algorithm](https://utils.ryanuo.cc/api/algorithm/) | [binarySearch()](https://utils.ryanuo.cc/api/algorithm/functions/binarySearch.html)；[bubbleSort()](https://utils.ryanuo.cc/api/algorithm/functions/bubbleSort.html)；[fibonacciDP()](https://utils.ryanuo.cc/api/algorithm/functions/fibonacciDP.html)；[fibonacciRecursive()](https://utils.ryanuo.cc/api/algorithm/functions/fibonacciRecursive.html)；[isPrime()](https://utils.ryanuo.cc/api/algorithm/functions/isPrime.html)；[quickSort()](https://utils.ryanuo.cc/api/algorithm/functions/quickSort.html) |
| [Browser](https://utils.ryanuo.cc/api/browser/) | [copyToClipboard()](https://utils.ryanuo.cc/api/browser/functions/copyToClipboard.html)；[enterFullScreen()](https://utils.ryanuo.cc/api/browser/functions/enterFullScreen.html)；[isMobile()](https://utils.ryanuo.cc/api/browser/functions/isMobile.html)；[manageClasses()](https://utils.ryanuo.cc/api/browser/functions/manageClasses.html)；[onceEventListener()](https://utils.ryanuo.cc/api/browser/functions/onceEventListener.html)；[safeStorage()](https://utils.ryanuo.cc/api/browser/variables/safeStorage.html)；[getUrlParams()](https://utils.ryanuo.cc/api/browser/functions/getUrlParams.html)；[getUrlParamsString()](https://utils.ryanuo.cc/api/browser/functions/getUrlParamsString.html) |
| [Common](https://utils.ryanuo.cc/api/common/) | [curry()](https://utils.ryanuo.cc/api/common/functions/curry.html)；[debounce()](https://utils.ryanuo.cc/api/common/functions/debounce.html)；[getUuid()](https://utils.ryanuo.cc/api/common/functions/getUuid.html)；[safeJSONParse()](https://utils.ryanuo.cc/api/common/functions/safeJSONParse.html)；[throttle()](https://utils.ryanuo.cc/api/common/functions/throttle.html)；[isBoolean()](https://utils.ryanuo.cc/api/common/functions/isBoolean.html)；[isBrowser()](https://utils.ryanuo.cc/api/common/functions/isBrowser.html)；[isDate()](https://utils.ryanuo.cc/api/common/functions/isDate.html)；[isEmptyObject()](https://utils.ryanuo.cc/api/common/functions/isEmptyObject.html)；[isFunction()](https://utils.ryanuo.cc/api/common/functions/isFunction.html)；[isNull()](https://utils.ryanuo.cc/api/common/functions/isNull.html)；[isNumber()](https://utils.ryanuo.cc/api/common/functions/isNumber.html)；[isObject()](https://utils.ryanuo.cc/api/common/functions/isObject.html)；[isRegExp()](https://utils.ryanuo.cc/api/common/functions/isRegExp.html)；[isString()](https://utils.ryanuo.cc/api/common/functions/isString.html)；[isUndefined()](https://utils.ryanuo.cc/api/common/functions/isUndefined.html)；[deepClone()](https://utils.ryanuo.cc/api/common/functions/deepClone.html)；[getTypeName()](https://utils.ryanuo.cc/api/common/functions/getTypeName.html)；[numberToFixed()](https://utils.ryanuo.cc/api/common/functions/numberToFixed.html)；[toString()](https://utils.ryanuo.cc/api/common/functions/toString.html) |
| [Finance](https://utils.ryanuo.cc/api/finance/) | [formatCurrency()](https://utils.ryanuo.cc/api/finance/functions/formatCurrency.html)；[calculatePercentage()](https://utils.ryanuo.cc/api/finance/functions/calculatePercentage.html)；[compare()](https://utils.ryanuo.cc/api/finance/functions/compare.html)；[preciseAdd()](https://utils.ryanuo.cc/api/finance/functions/preciseAdd.html)；[preciseDiv()](https://utils.ryanuo.cc/api/finance/functions/preciseDiv.html)；[preciseMul()](https://utils.ryanuo.cc/api/finance/functions/preciseMul.html)；[preciseSub()](https://utils.ryanuo.cc/api/finance/functions/preciseSub.html)；[roundTo()](https://utils.ryanuo.cc/api/finance/functions/roundTo.html)；[decimal()](https://utils.ryanuo.cc/api/finance/variables/decimal.html) |
| [Graphics](https://utils.ryanuo.cc/api/graphics/) | [hexToRgba()](https://utils.ryanuo.cc/api/graphics/functions/hexToRgba.html)；[lerpColor()](https://utils.ryanuo.cc/api/graphics/functions/lerpColor.html)；[rgbaToHex()](https://utils.ryanuo.cc/api/graphics/functions/rgbaToHex.html) |
| [Network](https://utils.ryanuo.cc/api/network/) | [checkNetworkStatus()](https://utils.ryanuo.cc/api/network/functions/checkNetworkStatus.html)；[fetchWithTimeout()](https://utils.ryanuo.cc/api/network/functions/fetchWithTimeout.html)；[getClientIP()](https://utils.ryanuo.cc/api/network/functions/getClientIP.html)；[getIndexedDBCache()](https://utils.ryanuo.cc/api/network/functions/getIndexedDBCache.html)；[parallelRequests()](https://utils.ryanuo.cc/api/network/functions/parallelRequests.html)；[request()](https://utils.ryanuo.cc/api/network/functions/request.html) |
| [Node](https://utils.ryanuo.cc/api/node/) | [logger()](https://utils.ryanuo.cc/api/node/variables/logger.html)；[mkdirp()](https://utils.ryanuo.cc/api/node/functions/mkdirp.html)；[rmrf()](https://utils.ryanuo.cc/api/node/functions/rmrf.html) |
<!-- auto utils end -->

## License

[MIT](https://github.com/ryanuo/utils/blob/main/LICENSE) License © 2023-PRESENT [ryanuo](https://github.com/ryanuo)
