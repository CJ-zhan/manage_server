const express = require('express')
const router = express.Router()
const Reslut = require('../models/Result')
const { User } = require('../models/connect')
const jwt = require('jsonwebtoken')
//密钥
const SELRET = 'sakshkKHKHsdfsdfsd'
//注册接口
router.post('/register',async(req,res,next) => {
  console.log(req.body)
  // const { user, password } = req.body
  
  let user = await User.findOne({user:req.body.user})
  if(user) {
    new Reslut('注册失败','用户名已存在，请重新注册!').fail(res)
  }else{
    await User.create({
      user:req.body.user,
      password:req.body.password
    })
    new Reslut('注册成功','注册成功,请登录!').success(res)
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
        // res.status(422)
    new Reslut({},'用户不存在').fail(res)
  }
  // 确认请求密码和数据库的密码是否正确
  const isPasswordValid = require('bcrypt').compareSync(password,username.password )
  if (isPasswordValid){
    const token = jwt.sign({
      id: String(username._id),
    },SELRET)
    let data = {
      token
    }
    new Reslut(data,'登录成功').success(res)
  }else{
    new Reslut({},'密码错误').fail(res)
  }

})

//退出接口
router.post('/logout',(req,res,next) => {
  new Reslut('退出成功').success(res)
  console.log(new Reslut('退出成功').success(res))
  // res.json({
  //   code: 0,
  //   msg:'登陆成功'
  // })
})
module.exports = router