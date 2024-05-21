const express = require('express')
const log = require('@samislam/log')
const catchAsync = require('../src/catchAsync.js')

const app = express()
app.use(express.json())

// if failed, next will be called with the error
// app.get(
//   '/users',
//   catchAsync(async (req, res, next) => {
//     const data = await UserModel.find({})
//     res.status(200).json({
//       status: 'success',
//       data,
//     })
//   })
// )

// const localErrorHandler = (error, req, res, next) => {
//   log.error('caught an error inside the local error handler!')
//   res.status(500).json({
//     status: 'fail',
//     message: 'Unable to create user, please try again',
//   })
// }

// app.post(
//   '/users',
//   catchAsync(async (req, res, next) => {
//     next()
//   }, localErrorHandler),
//   (req, res, next) => {
//     res.send('done')
//   }
// )

// const localErrorHandler = async (error, req, res, next) => {
//   log.error('inside the local error handler')
//   next(Error('mew 🐈'))
// }

// app.post(
//   '/purchase-item',
//   // verify & deduct/feed balances
//   catchAsync(async (req, res, next) => {
//     const from = 'john.doe@example.com'
//     const to = 'kinder@example.com'
//     next(new Error('middleware error'))
//   }, localErrorHandler),
//   (req, res, next) => {
//     res.status(200).json({
//       status: 'success',
//       message: 'Hello',
//     })
//   }
// )

app.use((err, req, res, next) => {
  log.error('caught an error inside the global error handling middleware')
  console.log(err)
  res.status(500).json({
    status: 'fail',
    message: 'internal server error, check the logs',
  })
})

console.clear()
console.clear()
console.clear()

app.listen(3000, () => log.info(log.label, 'listening on port 3000...'))
