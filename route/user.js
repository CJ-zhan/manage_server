const express = require('express')
const router = express.Router()
const Reslut = require('../utils/Result')
//导入User规则模块
const { User,Photo } = require('../models/user')
//jwt获取生成token
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
    new Reslut({},'用户名已存在，请重新注册!').fail(res.status(422))
  }else{
    await User.create({
      user:req.body.user,
      password:req.body.password,
      role:'generaladmin',
      status: 1,
      nickname:'普通管理员',
      mtime: (new Date().getTime())/1000,
      email:req.body.email || 'www.123@gmail.com',
      bio:'海纳百川，人生乃大',
    })
    new Reslut({},'注册成功,请登录!').success(res)
  }
})

//登录接口
router.post('/login',async(req,res,next) => {
  console.log(req.body)
  const {user, password} = req.body
  // 使用传过来的用户名查询用户是否存在  并存下来
  const  username= await User.findOne({
    user:user
  })
  if (!username) {
    new Reslut({},'用户不存在').fail(res.status(422))
  }
  // 确认请求密码和数据库的密码是否正确
  const isPasswordValid = require('bcrypt').compareSync(password,username.password )
  if (isPasswordValid){
    if(username.status === 1){
      //jwt获取生成token
      const token = jwt.sign({
        id: String(username._id),
      },SELRET_KEY,{expiresIn: 60 * 60})
      let data = {
        token
      }
      new Reslut(data,'登录成功').success(res)
    }else{
      new Reslut({},'您的权限已被禁用，请联系管理员开启权限登录').fail(res)
    }
  
  }else{
    new Reslut({},'密码错误').fail(res.status(403))
  }
})

//用户密码更改接口
router.post('/resetpwd',async(req,res,next) => {
  console.log(req.body)
  const raw = String(req.headers.authorization).split(' ').pop()
  const tokenData = jwt.verify(raw,SELRET_KEY)
  const {id} = tokenData
  const info = await User.findOne({
    _id:id
  })
  const { oldpassword,newpassword} = req.body
  const isPasswordValid = require('bcrypt').compareSync(oldpassword,info.password )
  if (isPasswordValid) {
    if(oldpassword === newpassword ){
      new Reslut({repeat:true},'旧密码与新密码不能相同哦~').success(res)
    }
    await User.updateOne({_id:info._id},{password: newpassword})
    new Reslut({errCode:10200},'密码修改成功,请重新登录!').success(res)
  }else{
    new Reslut({},'验证错误，修改密码失败！').fail(res.status(403))
  }
})


//用户头像获取

// 上传用户头像
router.post('/changephoto',async(req,res) => {
  console.log(req.body)
  const raw = String(req.headers.authorization).split(' ').pop()
  const tokenData = jwt.verify(raw,SELRET_KEY)
  const {id} = tokenData
  const info = await User.findOne({
    _id:id
  })
  if(info) {
    const isfirst = await Photo.findOne({
      pic_user:info._id
    })
    if(!isfirst) {
      await Photo.create({
        pic:req.body.pic,
        pic_user:info._id,
        mtime: (new Date().getTime())/1000,
      })
      new Reslut({},'头像修改成功~').success(res)
    }else{
      const params = req.body
      await Photo.updateOne({_id:isfirst._id},params)
      new Reslut({},'头像更新成功~').success(res)
    }
    
  }else{
    new Reslut({},'你没有权限修改').fail(res)
  }
})
//修改管理员信息
router.post('/changeinfo',async(req,res) => {
  const params = req.body
  console.log(params)
  const raw = String(req.headers.authorization).split(' ').pop()
  const tokenData = jwt.verify(raw,SELRET_KEY)
  const {id} = tokenData
  const info = await User.findOne({
    _id:id
  })
  if(info) {
    await User.updateOne({_id:info._id},params)
  new Reslut({},'保存修改成功~').success(res)
  }else{
    new Reslut({},'你没有权限修改').fail(res)
  }
})


//获取所有管理员信息接口
router.get('/info', async(req,res) => {
  console.log('获取管理员信息')
  const raw = String(req.headers.authorization).split(' ').pop()
  const tokenData = jwt.verify(raw,SELRET_KEY)
  const {id} = tokenData
  const info = await User.findOne({
    _id:id
  })
  if (info){
    const allinfo = await User.find()
    console.log(allinfo)
    new Reslut(allinfo,'查找成功').success(res)
  }else {
    new Reslut({},'您没有权限').fail(res.status(401))
  }
})

//获取登录管理员信息接口
router.get('/powerinfo', async(req,res) => {
  const raw = String(req.headers.authorization).split(' ').pop()
  const tokenData = jwt.verify(raw,SELRET_KEY)
  const {id} = tokenData
  const info = await User.findOne({
    _id:id
  })
  if (info){
    let photo = ''
    const pic = await Photo.findOne({pic_user:id})
    if (pic) {
      photo = pic.pic
    }else{
      photo = undefined
    }
    // console.log(photo)
    const {_id,user,nickname,role, status,email,bio} = await User.findOne({_id:id})
    const powerinfo = {
      _id,
      user,
      nickname,
      role,
      status,
      photo,
      email,
      bio,
      photo
    }
    new Reslut(powerinfo,'获取权限信息成功').success(res)
  }else {
    new Reslut({},'获取权限信息失败').fail(res.status(401))
  }
})

//启用管理员状态
router.post('/openpower',async(req,res,next) => {
  const mtime = new Date()
  await User.updateOne({_id:req.body._id},{status: 1,mtime: (mtime.getTime()/1000)})
  new Reslut({},'启用成功').success(res)
})
//禁用管理员状态
router.post('/closepower',async(req,res,next) => {
  const mtime = new Date()
  await User.updateOne({_id:req.body._id},{status: 0,mtime: (mtime.getTime()/1000)})
  new Reslut({},'禁用成功').success(res)
})
//删除管理员
router.post('/deleteuser',async(req,res,next) => {
  await User.findByIdAndDelete({_id:req.body._id})
  new Reslut({},'删除成功').success(res)
})

module.exports = router