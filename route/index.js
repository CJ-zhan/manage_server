const express = require('express')
const boom = require('boom')

//各路由模块
const userRouter = require('./user')
const employeeRouter = require('./employee')
const departmentRouter = require('./department')
const salaryRouter = require('./salary')

const jwtAuth = require('../utils/jwt')
const Result = require('../utils/Result')
//注册路由
const router = express.Router()

//所有路由 jwt  token认证
router.use(jwtAuth)

//主页
router.get('/',(req,res) => {
  res.send('欢迎来到后台管理')
})

//用户路由
router.use('/manage/user',userRouter)
//员工页面路由
router.use('/manage/employee',employeeRouter)
//部门页面路由
router.use('/manage/department',departmentRouter)
//薪资管理页面路由
router.use('/manage/salary',salaryRouter)

//利用boom所有路由错误集中处理
router.use((req,res,next) => {
  next(boom.notFound('接口不存在'))
})

//路由错误集中处理 
router.use((err,req,res,next) => {
  console.log({err})
  console.log(err.name)
  //token错误处理
  if(err.name && err.name === 'UnauthorizedError') {
    const {status = 401,message} = err
    new Result({},'Token验证失效',{
      error:status,
      errorMsg:message
    }).jwtError(res.status(status))
  }else if(err.name && err.name === 'MongoError'){
    const {status = 500,message} = err
    new Result({},'员工ID错误，数据插入失败',{
      error:status,
      errorMsg:message
    }).fail(res.status(status))
  }else{//其他服务器错误处理
    const msg = (err && err.message) || '系统错误'
    const statusCode = (err.output && err.output.statusCode) || 500;
    const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message
    new Result({},msg,{
      error:statusCode,
      errorMsg
    }).fail(res.status(statusCode))
  }
})


module.exports = router