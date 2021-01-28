const express = require('express')
const router = express.Router()
const Reslut = require('../utils/Result')
const { User } = require('../models/connect')
const jwt = require('jsonwebtoken')
const { SELRET_KEY } = require('../utils/constant')
//密钥
// const SELRET = 'sakshkKHKHsdfsdfsd'
//注册接口
router.post('/register',async(req,res,next) => {
  console.log(req.body)
  // const { user, password } = req.body
  
  let user = await User.findOne({user:req.body.user})
  if(user) {
    new Reslut(null,'用户名已存在，请重新注册!').fail(res.status(422))
  }else{
    await User.create({
      user:req.body.user,
      password:req.body.password
    })
    new Reslut(null,'注册成功,请登录!').success(res)
  }
})

//登录接口
router.post('/login',async(req,res,next) => {
  console.log(req.body)
  const {user, password} = req.body
  // 使用传过来的用户名查询用户是否存在  并存下来
  const username = await User.findOne({
    user:user
  })
  if (!username) {
    new Reslut(null,'用户不存在或密码错误').fail(res.status(422))
  }
  // 确认请求密码和数据库的密码是否正确
  const isPasswordValid = require('bcrypt').compareSync(password,username.password )
  if (isPasswordValid){
    const token = jwt.sign({
      id: String(username._id),
    },SELRET_KEY)
    let data = {
      token
    }
    new Reslut(data,'登录成功').success(res)
  }else{
    new Reslut(null,'用户不存在或密码错误').fail(res)
  }
})

//获取用户信息接口
router.get('/info', async(req,res) => {
  const raw = String(req.headers.authorization).split(' ').pop()
  const tokenData = jwt.verify(raw,SELRET_KEY)
  const {id} = tokenData
  console.log(tokenData)
  res.send('ok')
})

module.exports = router