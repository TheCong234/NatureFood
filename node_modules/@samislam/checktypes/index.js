const _private = require('./_private.js')

// * #  public to the developer *

// type checking ================

exports.typeOf           = (x) => _private.checkType(x)
exports.isFunction       = (...x) => _private.checkOneByOne(x, 'function')
exports.isAsyncFunction  = (...x) => _private.checkOneByOne(x, 'asyncfunction')
exports.isAsycOrSyncFunc = (...x) => _private.checkOneByOne(x, ['asyncfunction', 'function'], 'AsyncOrSyncFunction')
exports.isString         = (...x) => _private.checkOneByOne(x, 'string')
exports.isNumber         = (...x) => _private.checkOneByOne(x, 'number')
exports.isObject         = (...x) => _private.checkOneByOne(x, 'object')
exports.isNull           = (...x) => _private.checkOneByOne(x, 'null')
exports.isUndefined      = (...x) => _private.checkOneByOne(x, 'undefined')
exports.isSymbol         = (...x) => _private.checkOneByOne(x, 'symbol')
exports.isMap            = (...x) => _private.checkOneByOne(x, 'map')
exports.isDate           = (...x) => _private.checkOneByOne(x, 'date')
exports.isArray          = (...x) => _private.checkOneByOne(x, 'array')

// special inputs (hash injected inputs) ================
exports.generateErr = (obj) =>
   _private.injectHash(_private.generateErr.id, obj)

exports.throwErr = (obj) => _private.injectHash(_private.throwErr.id, obj)

// configurations ================
exports.config = _private.config // singleton

/* 
author : sam Islam.
Date   : 24 - 01 - 2021
version: 1.0.1
*/
