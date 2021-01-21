const express = require('express')
const boom = require('boom')
const userRouter = require('./user')

const {
  CODE_ERROR
} = require('../utils/constant')

const router = express.Router()

router.get('/',(req,res) => {
  res.send('欢迎来到后台管理')
})

router.use('/manage/user',userRouter)

router.use((req,res,next) => {
  next(boom.notFound('接口不存在'))
})


router.use((err,req,res,next) => {
  const msg = (err && err.message) || '系统错误'
  const statusCode = (err.output && err.output.statusCode) || 500;
  const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message
  res.status(statusCode).json({
    code:CODE_ERROR,
    msg,
    error:statusCode,
    errorMsg
  })
  // new Result(null, msg, {
  //   error: statusCode,
  //   errorMsg
  // }).fail(res.status(statusCode))
})


// router.use((err, req, res, next) => {
//   if (err.name === 'UnauthorizedError') {
//     console.log(err)
//     res.json({
//       code: CODE_TOKEN_EXPIRED,
//       msg: 'token失效',
//       error: err.status,
//       errorMsg: err.name
//     })
//   } else {
//     const msg = (err && err.message) || '系统错误'
//     const statusCode = (err.output && err.output.statusCode) || 500;
//     const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message
//     res.status(statusCode).json({
//       code: CODE_ERROR,
//       msg,
//       error: statusCode,
//       errorMsg
//     })
//   }
// })

module.exports = router