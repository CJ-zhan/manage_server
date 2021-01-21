const express = require('express')
const router = express.Router()
const Reslut = require('../models/Result')
const { User } = require('../models/connect')

router.get('/info',(req,res,next) => {
  res.json('user info....')
})


router.post('/register',async(req,res,next) => {
  console.log(req.body)
  // const { user, password } = req.body
  
  let user = await User.findOne({user:req.body.user})
  if(user) {
    new Reslut('注册失败','用户已注册，注册失败!').fail(res)
    
  }else{
    await User.create({
      user:req.body.user,
      password:req.body.password
    })
    new Reslut('注册成功','注册成功,请登录!').success(res)
  }
  
  // res.json({
  //   code: 0,
  //   msg:'登陆成功'
  // })
})

router.post('/login',(req,res,next) => {
  console.log(req.body)
  const {user, password} = req.body
  let data = {
    token:'shdakasydbjadfg'
  }
  if (user ==='admin'&& password ==='admin') {
    new Reslut(data,'登录成功').success(res)
  }else{
    new Reslut(data,'登录失败').fail(res)
  }

  
  // res.json({
  //   code: 0,
  //   msg:'登陆成功'
  // })
})
router.post('/logout',(req,res,next) => {
  new Reslut('退出成功').success(res)
  console.log(new Reslut('退出成功').success(res))
})
module.exports = router