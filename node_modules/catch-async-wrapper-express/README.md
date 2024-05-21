# catch-async-wrapper-express

a simple middleware for handling exceptions inside of async express routes and passing them to your express or custom error handlers.

# Installation

```
npm i catch-async-wrapper-express
```

```js
const catchAsync = require('catch-async-wrapper-express')
```

# Requirements:

- [expressjs](https://www.npmjs.com/package/express).
- [Nodejs](https://nodejs.org/).

# Examples:

catch any async or sync error and handle it to the `next()` function.
having the second argument as `undefined`, catchAsync will default to the express `next` function.

```js
// if failed, next will be called with the error
app.get(
  '/users',
  catchAsync(async (req, res, next) => {
    const data = await UserModel.find({})
    res.status(200).json({
      status: 'success',
      data,
    })
  })
)
```

You can also have a custom error handler as well by passing it as the second parameter:

```js
// if failed, localErrorHandler will be called with the error

const localErrorHandler = (error, req, res, next) => {
  console.log(error)
  res.status(500).json({
    status: 'fail',
    message: 'Unable to create user, please try again',
  })
}

app.post(
  '/users',
  catchAsync(async (req, res, next) => {
    const data = await UserModel.create(req.body) // ex: using mongoose
    res.status(200).json({
      status: 'success',
      data,
    })
  }, localErrorHandler)
)
```

a **local error handler** can also be an asyncronous function as well, and calling next inside of the custom error handler will move the error to [your express global error handler](https://expressjs.com/en/guide/error-handling.html) middleware to process.

```js
// if failed, localErrorHandler will be called with the error

const localErrorHandler = async (error, req, res, next) => {
  console.log('returning the money back...')
  const invoice = await Invoices.findById(req.invoiceId)
  await transferMoney(invoice.to, invoice.from)
  res.status(500).json({
    status: 'fail',
    message:
      "You can't buy the item because it doesn't exist in the merchant stock, please try  again",
  })
}

app.post(
  '/purchase-item',
  // verify & deduct/feed balances
  catchAsync(async (req, res, next) => {
    const from = 'john.doe@example.com'
    const to = 'kinder@example.com'
    const invoiceId = await transferMoney(from, to)
    req.invoiceId = invoiceId
    next()
  }),
  // verify & remove from stock
  catchAsync(async (req, res, next) => {
    await Stock.pick(req.body.itemToPurchase)
    res.status(200).json({
      status: 'success',
      data,
    })
  }, localErrorHandler)
)
```

If a local error handler throw an error, the error will be handled inside [your express global error handler](https://expressjs.com/en/guide/error-handling.html) middleware to process it.

```js
const localErrorHandler = (error, req, res, next) => {
  throw error
}

app.post(
  '/users',
  catchAsync(async (req, res, next) => {
    const data = await UserModel.create(req.body)
    res.status(200).json({
      status: 'success',
      data,
    })
  }, localErrorHandler)
)
```

calling next with no arguemnts inside the local error handler will get the request back on the track of the middleware stack again. This means that you handled your error, and the request is ready to continue its journy:

```js
const localErrorHandler = async (error, req, res, next) => {
  console.log('handling the error...')
  await ErrorModel.create(error) // save the error to database
  next()
}

app.post(
  '/users',
  catchAsync(async (req, res, next) => {
    throw new Error('Hello from the error!') // an error
  }, localErrorHandler),
  (req, res, next) => {
    res.status(200).json({
      status: 'success',
      message: 'the operation was completed successfuly with (1) errors',
    })
  }
)
```
