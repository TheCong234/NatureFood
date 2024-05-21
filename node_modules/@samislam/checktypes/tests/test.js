const log = require('@samislam/log')
const checkTypes = require('./../index')

// log(checkTypes.typeOf([])) // array
// log(checkTypes.typeOf({})) // object
// log(checkTypes.typeOf(1)) // number
// log(checkTypes.typeOf(0)) // number
// log(checkTypes.typeOf(5)) // number
// log(checkTypes.typeOf('hi')) // string
// log(checkTypes.typeOf(Symbol())) // symbol
// log(checkTypes.typeOf(new Map())) // map
// log(checkTypes.typeOf(() => {})) // function
// log(checkTypes.typeOf(async () => {})) // asyncfunction
// log(checkTypes.typeOf(true)) // boolean
// log(checkTypes.typeOf(false)) // boolean
// log(checkTypes.typeOf(null)) // null
// log(checkTypes.typeOf(undefined)) // undefined
// log(checkTypes.typeOf(new Date())) // date

// functions
// log("isFunction?", checkTypes.isFunction(() => {})) // OK
// log("isAsyncFunction", checkTypes.isAsyncFunction(async () => {})) // OK
// log("isAsyncOrSyncFunc", checkTypes.isAsycOrSyncFunc(() => {})) // OK

// log("isFunction?", checkTypes.isFunction(checkTypes.throwErr(), () => {})) // OK
// log("isAsyncFunction", checkTypes.isAsyncFunction(checkTypes.throwErr(), async () => {})) // OK
// log("isAsyncOrSyncFunc", checkTypes.isAsycOrSyncFunc(checkTypes.throwErr(), () => {})) // OK

// log("isFunction?", checkTypes.isFunction(checkTypes.throwErr(), "string")) // OK
// log("isAsyncFunction", checkTypes.isAsyncFunction(checkTypes.throwErr(), "string")) // OK
// log("isAsyncOrSyncFunc", checkTypes.isAsycOrSyncFunc(checkTypes.throwErr(), "string")) // OK

// log("isFunction?", checkTypes.isFunction(123, checkTypes.throwErr(), "string")) // OK
// log("isAsyncFunction", checkTypes.isAsyncFunction(123, checkTypes.throwErr(), "string")) // OK
// log("isAsyncOrSyncFunc", checkTypes.isAsycOrSyncFunc(123, checkTypes.throwErr(), "string")) // OK

// log("isFunction?", checkTypes.isFunction(checkTypes.throwErr())) // OK
// log("isAsyncFunction", checkTypes.isAsyncFunction(checkTypes.throwErr())) // OK
// log("isAsyncOrSyncFunc", checkTypes.isAsycOrSyncFunc(checkTypes.throwErr())) // OK

// Strings
// log(checkTypes.isString('Islam')) // OK
// Numbers
// log(checkTypes.isNumber(100)) // OK
// Objects
// log(checkTypes.isObject({ name: 'Saleem' })) // OK
// Null
// log(checkTypes.isNull(null)) // OK
// Undefined
// log(checkTypes.isUndefined(undefined)) // OK
// Symbol
// log(checkTypes.isSymbol(Symbol())) // OK
// Maps
// log(checkTypes.isMap(new Map())) // OK
// Dates
// log(checkTypes.isDate(new Date())) // OK
// Arrays
// log(checkTypes.isArray([10, 11])) // OK

// Strings
// log(checkTypes.isString()) // OK
// Numbers
// log(checkTypes.isNumber()) // OK
// Objects
// log(checkTypes.isObject()) // OK
// Null
// log(checkTypes.isNull()) // OK
// Undefined
// log(checkTypes.isUndefined()) // OK
// Symbol
// log(checkTypes.isSymbol()) // OK
// Maps
// log(checkTypes.isMap()) // OK
// Dates
// log(checkTypes.isDate()) // OK
// Arrays
// log(checkTypes.isArray()) // OK

// Strings
// log(checkTypes.isString(checkTypes.throwErr(), 123)) // OK
// Numbers
// log(checkTypes.isNumber(checkTypes.throwErr(), "123")) // OK
// Objects
// log(checkTypes.isObject(checkTypes.throwErr(), 123)) // OK
// Null
// log(checkTypes.isNull(checkTypes.throwErr(), 123)) // OK
// Undefined
// log(checkTypes.isUndefined(checkTypes.throwErr(), 123)) // OK
// Symbol
// log(checkTypes.isSymbol(checkTypes.throwErr(), 123)) // OK
// Maps
// log(checkTypes.isMap(checkTypes.throwErr(), 123)) // OK
// Dates
// log(checkTypes.isDate(checkTypes.throwErr(), 123)) // OK
// Arrays
// log(checkTypes.isArray(checkTypes.throwErr(), 123)) // OK

// Strings
// log(checkTypes.isString(checkTypes.throwErr())) // OK
// Objects
// log(checkTypes.isObject(checkTypes.throwErr())) // OK
// Undefined
// log(checkTypes.isUndefined(checkTypes.throwErr(), null)) // OK

// log(checkTypes.throwErr())
// checkTypes.isNull(checkTypes.throwErr({message: "{!} {$}"}), 'hi')
// log(checkTypes.isNull(error, 'hi'))

// const error = {message: "test"}
// log(checkTypes.isAsycOrSyncFunc(checkTypes.generateErr(error), {}))
// log(checkTypes.isAsycOrSyncFunc(checkTypes.generateErr(error),async()=>{}))
// log(checkTypes.isAsycOrSyncFunc(123))

// log.error(log.label, checkTypes.isAsycOrSyncFunc(()=>{}, checkTypes.throwErr(), "wonderful"))

// these are working, tested and guarnteeed.
// log('isUndefined?:', checkTypes.isUndefined('string', checkTypes.throwErr())) // OK
// log("-----")
// log('isUndefined?:', checkTypes.isUndefined('string')) // OK
// log("-----")
// log('isUndefined?:', checkTypes.isUndefined(checkTypes.throwErr())) // OK
// log("-----")
// log('isUndefined?:', checkTypes.isUndefined(checkTypes.throwErr(), 'string')) // OK
// log("-----")
/*
the argument list is [ 'string', { _identifier: Symbol() } ]
**iterataion**
you'll only see me if the argument list length is not zero, current checking value: string
you have made a mistake
the status is: true
isUndefined?: false
-----
the argument list is [ 'string' ]
**iterataion**
you'll only see me if the argument list length is not zero, current checking value: string
you have made a mistake
the status is: true
isUndefined?: false
-----
the argument list is [ { _identifier: Symbol() } ]
**iterataion**
you'll only see me if the argument list length is not zero, current checking value: { _identifier: Symbol() }
the current item is an object, and it's a hash injected object
the status is: false
isUndefined?: true
-----
the argument list is [ { _identifier: Symbol() }, 'string' ]
**iterataion**
you'll only see me if the argument list length is not zero, current checking value: { _identifier: Symbol() }
the current item is an object, and it's a hash injected object
**iterataion**
you'll only see me if the argument list length is not zero, current checking value: string
you have made a mistake
the status is: true
throws an error
*/

// ===============================

// these are working, tested and guarnteeed.
// log('isUndefined?:', checkTypes.isUndefined({}, checkTypes.throwErr())) // OK
// log("-----")
// log('isUndefined?:', checkTypes.isUndefined({})) // OK
// log("-----")
// log('isUndefined?:', checkTypes.isUndefined(checkTypes.throwErr())) // OK
// log("-----")
// log('isUndefined?:', checkTypes.isUndefined(checkTypes.throwErr(), {})) // OK
// log("-----")
/*
the argument list is [ {}, { _identifier: Symbol() } ]
**iterataion**
you'll only see me if the argument list length is not zero, current checking value: {}
you have made a mistake
the status is: true
isUndefined?: false
-----
the argument list is [ {} ]
**iterataion**
you'll only see me if the argument list length is not zero, current checking value: {}
you have made a mistake
the status is: true
isUndefined?: false
-----
the argument list is [ { _identifier: Symbol() } ]
**iterataion**
you'll only see me if the argument list length is not zero, current checking value: { _identifier: Symbol() }
the current item is an object, and it's a hash injected object
the status is: false
isUndefined?: true
-----
the argument list is [ { _identifier: Symbol() }, {} ]
**iterataion**
you'll only see me if the argument list length is not zero, current checking value: { _identifier: Symbol() }
the current item is an object, and it's a hash injected object
**iterataion**
you'll only see me if the argument list length is not zero, current checking value: {}
you have made a mistake
the status is: true

*/

// ===============================

// log('isObject?:', checkTypes.isObject({}, checkTypes.throwErr())) // OK
// log("-----")
// log('isObject?:', checkTypes.isObject({})) // OK
// log("-----")
// log('isObject?:', checkTypes.isObject(checkTypes.throwErr())) // OK
// log("-----")
// log('isObject?:', checkTypes.isObject(checkTypes.throwErr(), {})) // OK
// log("-----")
console.log(checkTypes.config)
// const userInput = "مرحباً بك"
// const error = checkTypes.generateErr( { message: "{$} is not allowed, the only allowed type is an array, the type you gave me is {!}"} )
// const status = checkTypes.isArray(error, userInput)
// if(status != true) log.error(status.message)
// "مرحباً بك" is not allowed, the only allowed type is an array, the type you gave me is string