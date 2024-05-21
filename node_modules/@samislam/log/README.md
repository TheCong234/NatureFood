# logJS

Origiinally Created in 19 - 01 - 2021


log is a simple utility that helps in logging colorful outputs to the console.
This module depends on the popular, [colors](https://www.npmjs.com/package/colors) module.

# Setup:

In your work directory:

```js
npm i @samislam/log
```

In your NodeJS app:

```js
const log = require("@samislam/log");
```

# Usage

log is very simple and stright forward, it's not a new learning curve that you have to master.
let's start with the first function which is `log()`

* * *

## `log([arg1, arg2, arg3...])`

rather than writing `console.log()` all the time, you can now write `log()` only, for example:

```js
log(1, 2, 3)
log("hi")
log("Hello", "Everyone")
log({ name: "mr.X" })
```


![screenshot_1.png](https://raw.githubusercontent.com/samislam/log/main/screenshots/screenshot_1.png)

## `log.SOMETHING()`

logJS have a pre-defined themes for you, however you can create your own themes, we'll see how you can do that later in this guide.
The following are all of the pre-defined themes for you by logJS.

```js
log.error("Testing the log module")
log.err("Testing the log module")
log.e("Testing the log module")
log.f("Testing the log module")
log.fail("Testing the log module")
log.faild("Testing the log module")
log.danger("Testing the log module")
log.success("Testing the log module")
log.ok("Testing the log module")
log.s("Testing the log module")
log.w("Testing the log module")
log.warn("Testing the log module")
log.warning("Testing the log module")
log.note("Testing the log module")
log.i("Testing the log module")
log.info("Testing the log module")
log.information("Testing the log module")
log.done("Testing the log module")
```

![screenshot_2.png](https://raw.githubusercontent.com/samislam/log/main/screenshots/screenshot_2.png)


* * *

## `log.label`

along with the pre-defined themes, logJS have pre-defined labels for you.
There are some kind of things that are simpler to see in order to understand, see the following example:

```js
log.error(log.label, "Testing the log module");
log.err(log.label, "Testing the log module");
log.e(log.label, "Testing the log module");
log.f(log.label, "Testing the log module");
log.fail(log.label, "Testing the log module");
log.faild(log.label, "Testing the log module");
log.danger(log.label, "Testing the log module");
log.success(log.label, "Testing the log module");
log.ok(log.label, "Testing the log module");
log.s(log.label, "Testing the log module");
log.w(log.label, "Testing the log module");
log.warn(log.label, "Testing the log module");
log.warning(log.label, "Testing the log module");
log.note(log.label, "Testing the log module");
log.i(log.label, "Testing the log module");
log.info(log.label, "Testing the log module");
log.information(log.label, "Testing the log module");
log.done(log.label, "Testing the log module");
```
![screenshot_3.png](https://raw.githubusercontent.com/samislam/log/main/screenshots/screenshot_3.png)

- You can only use `log.label` as the first argument in a `log.SOMETHING()` function.
- You can't use `log.label` on `log()`, you can only use it on `log.SOMETHING()`.
- "Not valid" doesn't mean it's going to throw an error, it just means that doing it this wrong way doesn't have sence.

~ The following examples are not valid:

```js
log(log.label, "Hello world!"); // Symbol() "Hello world!"
log.error("Test", log.label) // Test Symbol()
```

* * *

## Custom Theming

logJS is shipped to your project with pre-defined themes such as the "error", "success" and so on, however, you're not limited to use these, you can create your own themes and use them accross multiple files, thanks to logJS singleton pattern design.

### How?

Pass two arguments and an optional last one to the `log.set` function,

## `log.set(name, theme [, label])`

```js
log.set(name, theme [, label]);
```

| Parameter | Description |
| --- | --- |
| name | The name of the method that you want to call, for example, setting this to "hello" will make your method looks like log.hello() |
| theme | For example, you can write "red" or "bold" or "yellow" |
| label | Setting this is optional, for example, you can set this to "Hello: ", therefore, when you use your log function with `log.label` passed to it as the first argument, (ex: log.yourCustomName(log.label, "Application is launched"))  then the output on the shell will be `Hello: Application is launched.` <br><br>\- If you didn't set the label argument, it will be the `name` of your method capitalized by default. |

### For Example:
Let's say we have the following code:
```js
const log = require("log");
log.set("merhaba", "blue", "Hello: ");
log.merhaba("The application is now launched")
log.merhaba(log.label, "The application is now launched")
```


![screenshot_4.png](https://raw.githubusercontent.com/samislam/log/main/screenshots/screenshot_4.png)


# FAQ:
**Q1: From where I can know the list of accepted 
colors?**

**A:** Remember, this module is depending on the popular [colors](https://github.com/Marak/colors.js) module, you can pickup **one** of the styles from there, and here are some additional ones for you "underline", "brightRed", "bgRed".

- Please Note, You can't mix styles all together, for example you can't do something like this:
```js
const colors = require('colors/safe') // say for example you decided to install the colors module and generate a new style to apply it on logJS
const myTheme = colors.red().bold();
log.set("wrongOne", myTheme, "Don't try me again"); 
log.wrongOne(log.label, "Testing the log module") // TypeError: colors[theme[style]] is not a function (this is an internal module error)
````
**Q2: It seems like logJS is unable to memorize my themes from one module to another?**

**A:** Please make sure that your module that have the themes defined inside of it is being loaded an invoked by your code before the the other modules, this is very logical, you have to call `log.set()` first, and then you can use your `log.myCustomTheme()` afterwards.
