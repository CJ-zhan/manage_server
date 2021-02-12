const mongoose = require('mongoose');


//员工信息表 规则
EmployeeSchema = new mongoose.Schema({
  p_name:{ type:String },
  p_sex:{ type:Number },
  p_birth:{ type:String},
  p_pid:{ type:String,unique:true},
  p_minzu:{ type:String},
  p_nation:{ type:String },
  p_fromwhere:{ type:String },
  p_marriage:{ type:Number },
  p_address:{ type:String},
  p_xueli:{ type:String},
  p_school:{ type:String },
  p_profession:{ type:String },
  p_id:{ type:String,unique:true },
  p_department:{ type:String },
  p_position:{ type:String },
  p_phone:{ type:String },
  p_email:{ type:String},
  p_rtime:{ type:String},
  p_ztime:{ type:String},
  mtime:{ type:String}
})

//员工薪资表信息关联  规则
SalarySchema = new mongoose.Schema({
  s_salary: { type:Number },
  s_insurance: { type:Number },
  s_fund: { type:Number },
  s_addsalary: { type:Number },
  s_allowance: { type:Number },
  s_realsalary: { type:Number },
  s_name:{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee'},
  mtime:{ type:String}
})
const Employee = mongoose.model('Employee',EmployeeSchema)
const Salary = mongoose.model('Salary',SalarySchema)

module.exports= {
  Employee,
  Salary
}