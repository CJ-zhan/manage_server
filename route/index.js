const express = require('express')
const boom = require('boom')

const userRouter = require('./user')
const employeeRouter = require('./employee')

const jwtAuth = require('../utils/jwt')
const Result = require('../utils/Result')
//注册路由
const router = express.Router()

router.use(jwtAuth)

//主页
router.get('/',(req,res) => {
  res.send('欢迎来到后台管理')
})

//用户路由
router.use('/manage/user',userRouter)
//员工页面路由
router.use('/manage/employee',employeeRouter)

router.use((req,res,next) => {
  next(boom.notFound('接口不存在'))
})

//路由错误集中处理 
router.use((err,req,res,next) => {
  console.log({err})
  //token错误处理
  if(err.name && err.name === 'UnauthorizedError') {
    const {status = 401,message} = err
    new Result(null,'Token验证失效',{
      error:status,
      errorMsg:message
    }).jwtError(res.status(status))
  }else{//其他服务器错误处理
    const msg = (err && err.message) || '系统错误'
    const statusCode = (err.output && err.output.statusCode) || 500;
    const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message
    new Result(null,msg,{
      error:statusCode,
      errorMsg
    }).fail(res.status(statusCode))
  }
})


module.exports = router