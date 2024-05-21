# checkTypes

Originally created in 24 - 01 - 2021

**checkTypes** is a fast and simple utility for developers to check for types quickly.

# Usage 🗺️

You can now finally check for types as quck as possible, no more need for `typeof "x" === "string"`

- Just a side note before doing anything, I'm using [@samislam/log \[ log() \]](/tmp/.mount_JoplinvV1jiS/resources/app.asar/%5Bfrom%5D%28https:/github.com/samislam/log%29 "%5Bfrom%5D(https://github.com/samislam/log)") which is a very cool utility for logging into the console, it allows for a cool and nice output to the console colored with your favorie color. [check it right now on npm, it's free!](https://www.npmjs.com/package/@samislam/log)

## `checkTypes.isSOMETHING(arg1, arg2, arg3 ...etc)`

This function is going to check each argument you pass into it, and on the first argument it faces that doesn't match the type that it should, it's going to `return false` immediatly.

```js
// functions
log(checkTypes.isFunction(() => {})) // true
log(checkTypes.isAsyncFunction(async () => {})) // true (this one is cool)
log(checkTypes.isAsycOrSyncFunc(() => {})) // true
// Strings
log(checkTypes.isString('Islam')) // true
// Numbers
log(checkTypes.isNumber(100)) // true
// Objects
log(checkTypes.isObject({ name: 'Saleem' })) // true
// Null
log(checkTypes.isNull(null)) // true
// Undefined
log(checkTypes.isUndefined(undefined)) // true
// Symbol
log(checkTypes.isSymbol(Symbol())) // true
// Maps
log(checkTypes.isMap(new Map())) // true
// Dates
log(checkTypes.isDate(new Date())) // true
// Arrays
log(checkTypes.isArray([10, 11])) // true
```

- All of the methods above have the same syntax and return type (boolean).

Some more examples:

```js
log( checkTypes.isArray(123456) ) // false
log( checkTypes.isString("yes") ) // true
let x;
log( checkTypes.isUndefined(x) ) // true
log( checkTypes.isUndefined(1, 2, 3, x, 4) ) // false
log( checkTypes.isNumber(1, "2") ) // false
```

- in up coming versions, there might be more validations, such as `isFloatNumber`, or maybe I'll be calling it `isNumber().isFloat()`.
- maybe I'll be adding checking for valid string numbers later, such as "123", since "123" is a string but it's a valid number, it contains valid numeric characters.
    ~ *going back to the guide:*

* * *

## `checkTypes.typeOf(x)`

`checkTypes.typeof()` provides a united protocol for all of its' return values, all you have to know is to remember that any string that this method is going to return (it's going to return a string by the way) is going to be in a lower case format.

```js
log(checkTypes.typeOf([])) // array
log(checkTypes.typeOf({})) // object
log(checkTypes.typeOf(1)) // number
log(checkTypes.typeOf(0)) // number
log(checkTypes.typeOf(5)) // number
log(checkTypes.typeOf('hi')) // string
log(checkTypes.typeOf(Symbol())) // symbol
log(checkTypes.typeOf(new Map())) // map
log(checkTypes.typeOf(() => {})) // function
log(checkTypes.typeOf(async () => {})) // asyncfunction
log(checkTypes.typeOf(true)) // boolean
log(checkTypes.typeOf(false)) // boolean
log(checkTypes.typeOf(null)) // null
log(checkTypes.typeOf(undefined)) // undefined
log(checkTypes.typeOf(new Date())) // date
```

* * *

## `checkTypes.throwErr([obj])`

### as fast as possible 🔥️:

```js
checkTypes.isNumber(throwErr(), "hello").
// # output: Error: "hello" is not a number type, typeof given: string
```

- remember, it's `throwErr` and not `throwError`.

### More details:

What most of the other modules on github and npm are doing is that they automatically force your code to throw an error because they're hard-coded to do that, that's not how `checkTypes` works, `checkTypes` will only throw an error when you want it to throw an error.

To describe how `checkTypes.throwErr()` works behind the scenes, calling `checkTypes.throwErr()` is going to return an object, if you tried to `log()` it to the console, you'll see it's an object that holds a Symbol (*btw: **Symbol** is an ES6 JS Type*):

```js
log( checkTypes.throwErr() )
// # output: { _identifier: Symbol() }
```

You don't want to miss with this, this is just a private implementation that `checkTypes` is going to see so it can understand that it should throw an error at that particular mis-match or not.
This object folks that you can see in the output is a unique object that is used to communicate with `checkTypes`, it tells it to do things.

The key thing that allows `checkTypes.isSOMETHING()` to know that the given argument `checkTypes.throwErr` is not something to check the *typeof* is the `_identifier` thing.

**All you have to know here** is that whenever you want the `checkTypes.isSOMETHING()` method to throw an error once validation is failed, you'll pass the `checkTypes.throwErr()` as one of the arguments in your `checkTypes.isSOMETHING()` function (at the position you want it to throw an error). for example:

```js
checkTypes.isString(checkTypes.throwErr(), 123)
// # output: Error: 123 is not a string type, typeof given: number
// ... the stack of the error here
```

***"at the position you want it to throw an error"*** means you can write `checkTypes.throwErr()` anywhere in between the function arguments, as the first, second, third or any argument position you want, you're not required to write `checkTypes.throwError()` as the first argument in `checkTypes.isSOMETHING()`, but.. here is the difference:

`checkTypes` will only throw an error for `checkTypes.throwErr()` at the time you want it to throw an error, so if you passed `checkTypes.throwErr()` as the second argument in `checkTypes.isSOMETHING()`, then only for the rest of the arguments **after** the position where `checkTypes.throwErr()` is registered within the argument list `checkTypes.throwErr()` **is** going to throw an error, while for all of the arguments **before** the position where `throwErr` is registered, `checkTypes` is not going to see that you want to throw an error, so no error is thrown for these.

For example:

```js
checkTypes.isNull(123, checkTypes.throwErr(error), "incorrect one") 
// returns false for the 123 but doesn't throw an error, that's because it has already returned
```

another example:

```js
checkTypes.isNull(null, checkTypes.throwErr(error), 123)
// throws an error because of 123
```

- if you understand this part, then you already understand by now how `checkTypes.isSOMETHING()` is going to treat the `checkTypes.generateErr()` too (`checkTypes.generateErr()` will be mentioned later down).
    
- if `checkTypes.throwErr()` was the last argument within the list, `checkTypes` is **Not** going to throw any error because of what described above.
    
- if you used `checkType.isUndefined(checkTypes.throwErr())` then everything is going to work as you expect, no error will be thrown, since the "nothing given" in JavaScript is called "undefined".
    
- extra example `checkTypes.isUndefined()`, this is going to return `true`.
    

### The `obj` argument:

`checkTypes.throwError([obj])` takes a one optional argument, this argument must be an object.

The object you pass here will be used to display an error message, therefore, inside this object you can write anything you want, but remember, there are certain special properties that are already built into the JavaScript `Error` instances (btw: the error shown to the user is an object that inherits from The JavaScript [Error class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)). therefore you can for example modify the `message` property to show a custom message to the user, you may also change the `stack` as an example, but you're not limited to only these, you can add your own properties to that object, and they'll be on the user's screen.

- most of the things you read here are the same concipts and logic behind `checkTypes.generateErr()` which you'll read about down in just few seconds.

For example:

```js
const error = { message: "that's not valid" }
checkTypes.isNull(checkTypes.throwErr(error), 'hi')
// Error: that's not valid
// ... the stack of the error
```

another example:

```js
const userInput = "water";
const error = { message: "wow, you was about to make a mistake!"}
checkTypes.isUndefined(checkTypes.throwErr(error), userInput)
// do other things ...
// nothing will happen, because validation succeed
```

Don't stop reading here, if you're deciding to stop reading from here, take a look at the special interpretted characters inside the `message` property that you'll provide `["{!}", "{$}", "{#}"]`, they're mentioned down.

* * *

## `checkTypes.generateError(obj)`

`checkTypes.generateError` will receive an object from you, and will inject a property called `_identifier` inside of it, and then return your object.

- everything here is the same as `checkTypes.throwErr()`, so you should read it first, then come back to here to read more.

The only difference between `generateErr()` and `throwErr()` in how they're treated by `checkTypes.isSOMETHING()` is the following:

- `throwErr()`, `checkType.isSOMETHING()` is going to throw the error.
- `generateErr()`, is going to return the error object so you can save it in a variable and do some other stuff with it.

For Example:

```js
const userInput = []
const theError = checkTypes.generateErr({ message: "the given argument is not an array!"})
const state = checkTypes.isArray(theError, userInput)
log(state) // true
```

- if the validation succeed, the returned value will be true.
- if the validation failed, the returned value will be an object that holds all your properties of the object you gave to `checkTypes.generateErr()`. this object inherits from the JavaScript [Error class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error).
    another example:

```js
const userInput = "mera naam islam hai, BTW: I'm not Indian :D"
const theError = checkTypes.generateErr({ message: "the given argument is not an array!"})
const state = checkTypes.isArray(theError, userInput)
log(state) 
// Error: then given argument is not an array!
// ...the stack of the error
log("As you can see, the error is not thrown, the code will continue..")
// As you can see, the error is not thrown, the code will continue..
```

* * *

## customizations

as I mentioned above in the throwErr and the generateErr sections, is that you can write an optional message to diplay for the user, `checkTypes` provides three special strings that are interpritted by checkTypes to human readable strings.

| Special character | Description |
| --- | --- |
| {#} | translated to the pre-defined template, for example, by default, if a the user input was `1234`, and the required type is an array, the `{#}` is going to be translated to `"1234" is not an array, typeof given: string".`<br>\- you can configure the default template, see the next section for how. |
| {!} | translated to the given type by the user, for example, if the user entered `1234`, the `{!}` is going to be `number` |
| {$} | translated to the given user input, for example, if the user entered `1234`, the {$} is going to be translated to `1234` |

Examples:
```js
const userInput = "مرحباً بك"
const error = checkTypes.generateErr( { message: "{$} is not allowed, the only allowed type is an array, the type you gave me is {!}"} )
const status = checkTypes.isArray(error, userInput)
if(status != true) log.error(status.message)
// "مرحباً بك" is not allowed, the only allowed type is an array, the type you gave me is string
```

another example:
```js
const userInput = "bilgisayarım yavaş"
const error = checkTypes.throwErr( { message: "{$} is not allowed, the only allowed type is an array, the type you gave me is {!}"} )
checkTypes.isArray(error, userInput)
// Error: "bilgisayarım yavaş" is not allowed, the only allowed type is an array, the type you gave me is string
// the stack of the error ...
```

- these special symbols are treated as mentioned above in both `throwErr()` and `generateErr()`.

* * *
# Configurations and templates
Using `checkTypes`, You can change the default template used for the error messages.
all configurations you apply will also apply to any other file you import `checkTypes` to, thanks to its' singleton design.

This means that you can change the template from file A, and use that template from module B, C and D without reconfiguring `checkTypes` on each new import.

## The `checkTypes.config` object

as for the current version, the only configurations you can make to checkTypes is to change how the default templates looks like.

`checkTypes.config` is not a function, it's an object that holds properties, for this version, there is only one thing to configure which is the errorMessages object.

```js
log.s(checkTypes.config)
// you can use console.log
/*
{
  errorMessages: {
    function: '{$} is not a function, typeof given: {!}',
    asyncfunction: '{$} is not an async function, typeof given: {!}',
    string: '{$} is not a string, typeof given: {!}',
    number: '{$} is not a number, typeof given: {!}',
    object: '{$} is not an object, typeof given: {!}',
    null: '{$} is not a null type, typeof given: {!}',
    undefined: '{$} is not an undefined, typeof given: {!}',
    symbol: '{$} is not a symbol, typeof given: {!}',
    map: '{$} is not a map type, typeof given: {!}',
    date: '{$} is not a date, typeof given: {!}',
    array: '{$} is not an array, typeof given: {!}',
    AsyncOrSyncFunction: '{$} is not an Async nor Sync Function , typeof given: {!}',
    defaultTemplate: '{$} is not a valid type , typeof given: {!}'
  }
}
*/
```
you can modify these defaults by writing your own:
```js
checkTypes.config.errorMessages.function = "Ihre Eingabe "{$}" ist keine Funktion!"
```
- you can use the special interpretted characters the same way you can use them on `throwErr({message})` and `generateErr({message})`. `[{!}, {$}, {#}]`.
- configuring this object will configure all your other modules that depends on `checkTypes`, so no need to call `checkTypes.config` multiple times.


# FAQ
**Q: It seems like checkTypes is unable to memorize my default customized configurations from one module to another?**
**A:** Please make sure that your module that have the configurations defined inside of it is being loaded an invoked by your code before the the other modules, this is very logical, you have to set `checkTypes.config.errorMessages.string = "some template"` first, and then you can use your custom template `checkTypes.generateErr(message)` afterwards.