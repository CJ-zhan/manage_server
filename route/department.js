const express = require('express')
const router = express.Router()
const Reslut = require('../utils/Result')
//导入Department规则模块
const { Department } = require('../models/department')
const { Employee } = require('../models/employee')


//获取部门信息
router.get('/info', async(req,res,next) => {
  console.log('获取部门信息')
  let params = {
    ...req.query
  }
  delete params.page
  delete params.pagesize
  if (params.d_name) {
    //按需查询员工信息
      const info = await Department.find({d_name:new RegExp(params.d_name)})
      new Reslut(info,'查询成功').success(res)
  }else {
    //查询所有信息
    const allinfo = await Department.find({})
    new Reslut(allinfo,'更新成功').success(res)
  }
})

//新增部门信息
router.post('/adddepart',async(req,res,next) => {
  console.log(req.body)
  await Department.create({
    d_name:req.body.d_name,
    d_describe:req.body.d_describe,
    mtime:(new Date().getTime())/1000
  })
  new Reslut({},'添加成功').success(res)
})

//更新部门信息
router.post('/updatedepart',async(req,res,next) => {
  const mtime = new Date()
  const params = {
    ...req.body,
    mtime:(mtime.getTime()/1000)
  }
  await Department.updateOne({_id:req.body._id},params)
  new Reslut({},'编辑成功').success(res)
})

//删除部门信息
router.post('/deletedepart',async(req,res,next) => {
  const departname = await Department.findById({_id:req.body._id})
  //查出是否还有该部门信息的员工信息
  const departemployee = await Employee.find({p_department:departname.d_name})
  // await Department.findByIdAndDelete({_id:req.body._id})
  if (departemployee.length !== 0) {
    new Reslut({},'请将为员工安排其他部门，方可删除！').fail(res)
  }else {
    await Department.findByIdAndDelete({_id:req.body._id})
    new Reslut({},'删除成功').success(res)
  }
})
module.exports = router