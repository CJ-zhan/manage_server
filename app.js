const express = require('express')
const router = require('./route/index')
const fs = require('fs')
const bodyPraser = require('body-parser')
const app = express()
// const cors = require('cors')  //后端引入cors模块
//连接数据库
require('./models/connect')
app.use(bodyPraser.urlencoded({extended: true}))
app.use(bodyPraser.json())


// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By",' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

// app.use(cors())//实现跨域请求

//路由模块
app.use('/',router)

app.listen(3000,() => {
  console.log('http://localhost:3000')
})