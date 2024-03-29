const express = require('express')
const router = express.Router()
const Reslut = require('../utils/Result')
//导入Employee规则模块
const { Employee, Salary } = require('../models/employee')

//获取员工信息
router.get('/info', async(req,res,next) => {
    console.log('获取员工信息')
    let params = {
      ...req.query
    }
    delete params.page
    delete params.pagesize
    if (params.type && params.type !== undefined) {//查询接口
      //按需查询员工信息
      if (params.type === '1') {
        const info = await Employee.find({p_name:new RegExp(params.p_name)})
        new Reslut(info,'查询成功').success(res)
      }else if (params.type === '2') {
        const info = await Employee.find({p_id:new RegExp(params.p_id)})
        new Reslut(info,'查询成功').success(res)
      }else if (params.type === '3') {
        const info = await Employee.find({p_pid:new RegExp(params.p_pid)})
        new Reslut(info,'查询成功').success(res)
      }else if (params.type === '4') {
        const info = await Employee.find({p_school:new RegExp(params.p_school)})
        new Reslut(info,'查询成功').success(res)
      }else {
        const info = await Employee.find({p_sex:params.p_sex})
        new Reslut(info,'查询成功').success(res)
      }
    }else if(params.p_department && params.p_department !== undefined){ //按部门管理查询员工信息
      if (params.searchdeparttype && params.searchdeparttype !== undefined) {
        if (params.searchdeparttype === '1') {
          const info = await Employee.find({$and:[{p_department:params.p_department},{p_name:new RegExp(params.p_name)}]})
          new Reslut(info,'查询成功').success(res)
          return
        }else if (params.searchdeparttype === '2') {
          const info = await Employee.find({$and:[{p_department:params.p_department},{p_position:new RegExp(params.p_position)}]})
          new Reslut(info,'查询成功').success(res)
          return
        }else{
          const info = await Employee.find({$and:[{p_department:params.p_department},{p_id:new RegExp(params.p_id)}]})
          new Reslut(info,'查询成功').success(res)
          return
        }
      }
      const info = await Employee.find({p_department:params.p_department})
      new Reslut(info,'查询成功').success(res)
    } else {
      //查询所有信息
      const allinfo = await Employee.find({})
      new Reslut(allinfo,'更新成功').success(res)
    }
})

//添加员工信息
router.post('/addinfo',async(req,res,next) => {
  // console.log(req.body)
    await Employee.create({
      p_name:req.body.p_name,
      p_sex:req.body.p_sex,
      p_birth:req.body.p_birth,
      p_pid:req.body.p_pid,
      p_minzu:req.body.p_minzu,
      p_nation:req.body.p_nation,
      p_fromwhere:req.body.p_fromwhere,
      p_marriage:req.body.p_marriage,
      p_address:req.body.p_address,
      p_xueli:req.body.p_xueli,
      p_school:req.body.p_school,
      p_profession:req.body.p_profession,
      p_id:req.body.p_id,
      p_department:req.body.p_department,
      p_position:req.body.p_position,
      p_phone:req.body.p_phone,
      p_email:req.body.p_email,
      p_role:req.body.p_role,
      p_rtime:req.body.p_rtime,
      p_ztime:req.body.p_ztime,
      mtime:(new Date().getTime())/1000
    })
    const employeeid = await Employee.findOne({p_id:req.body.p_id})
    console.log(employeeid)
    await Salary.create({
      s_salary: req.body.s_salary || 4000,
      s_insurance: req.body.s_insurance || 0,
      s_fund: req.body.s_fund || 0,
      s_addsalary: req.body.s_addsalary || 0,
      s_allowance: req.body.s_allowance || 0,
      s_changesalary:req.body.s_changesalary || 0,
      s_realsalary: req.body.s_realsalary || 4000,
      s_name: employeeid._id,
      mtime:(new Date().getTime())/1000
    })
    new Reslut({},'添加成功').success(res)
})

//批量添加员工信息
router.post('/addmany',(req,res,next) => {
  const params = [
    ...req.body.data_json
  ]
  console.log(params)
  const data = {
    total:params.length,
    success: 0
  }
   params.map(async (item,index) => {  
    await Employee.create({
      p_name:item.p_name,
      p_sex:item.p_sex,
      p_birth:item.p_birth,
      p_pid:item.p_pid,
      p_minzu:item.p_minzu,
      p_nation:item.p_nation,
      p_fromwhere:item.p_fromwhere,
      p_marriage:item.p_marriage,
      p_address:item.p_address,
      p_xueli:item.p_xueli,
      p_school:item.p_school,
      p_profession:item.p_profession,
      p_id:item.p_id,
      p_department:item.p_department,
      p_position:item.p_position,
      p_role:item.p_role,
      p_phone:item.p_phone,
      p_email:item.p_email,
      p_rtime:item.p_rtime,
      p_ztime:item.p_ztime,
      mtime:(new Date().getTime())/1000
    })
    const employeeid = await Employee.findOne({p_id:item.p_id})
    console.log(employeeid)
    await Salary.create({
      s_salary: item.s_salary || 4000,
      s_insurance: item.s_insurance || 0,
      s_fund:item.s_fund || 0,
      s_addsalary: item.s_addsalary || 0,
      s_allowance: item.s_allowance || 0,
      s_changesalary:req.body.s_changesalary || 0,
      s_realsalary: item.s_realsalary || 4000,
      s_name: employeeid._id,
      mtime:(new Date().getTime())/1000
    })
    data.success = data.success + 1
    if(data.success == data.total) {
      new Reslut(data,'新增成功').success(res)
    }
  })
})
//编辑员工信息
router.post('/editinfo',async(req,res,next) => {
  const mtime = new Date()
  const params = {
    ...req.body,
    mtime:(mtime.getTime()/1000)
  }
  await Employee.updateOne({_id:req.body._id},params)
  new Reslut({},'编辑成功').success(res)
})
//删除员工信息
router.post('/deleteinfo',async(req,res,next) => {
  const params = {
    ...req.body
  }
  await Employee.findByIdAndDelete({_id:params._id})
  new Reslut({},'删除成功').success(res)
})

module.exports = router