const express = require('express')
const router = express.Router()
const Reslut = require('../utils/Result')
//导入Salary规则模块
const { Salary } = require('../models/employee')

//获取员工薪资信息
router.get('/info', async(req,res,next) => {
  console.log('获取薪资')
  const params = {
    ...req.query
  }
  if (params.s_name || params.s_name !== undefined) {//获取搜索员工薪资信息
    const info = await Salary.find({s_name:params.s_name}).populate('s_name')
    new Reslut(info,'查询成功').success(res)
    return
  }
  const allinfo = await Salary.find({}).populate('s_name')
  new Reslut(allinfo,'更新成功').success(res)
})

//编辑员工薪资信息
router.post('/updateinfo', async(req,res,next) => {
  const mtime = new Date()
  const params = {
    ...req.body,
    mtime:(mtime.getTime()/1000)
  }
  await Salary.updateOne({_id:req.body._id},params)
  new Reslut({},'编辑成功').success(res)
  console.log(params)
})

//删除员工薪资信息
router.post('/deleteinfo', async(req,res,next) => {
  const params = {
    ...req.body
  }
  const salaryinfo = await Salary.findOne({s_name:params.s_name})
  await Salary.findByIdAndDelete({_id:salaryinfo._id})
  new Reslut({},'员工薪资信息一并删除成功').success(res)
  console.log(params)
})

module.exports = router