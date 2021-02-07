const mongoose = require('mongoose');


EmployeeSchema = new mongoose.Schema({
  p_name:{ type:String },
  p_sex:{ type:Number },
  p_birth:{ type:String},
  p_pid:{ type:String},
  p_minzu:{ type:String},
  p_nation:{ type:String },
  p_fromwhere:{ type:String },
  p_marriage:{ type:Number },
  p_address:{ type:String},
  p_xueli:{ type:String},
  p_school:{ type:String },
  p_profession:{ type:String },
  p_id:{ type:String },
  p_department:{ type:String },
  p_position:{ type:String },
  p_phone:{ type:String },
  p_email:{ type:String},
  p_rtime:{ type:String},
  p_ztime:{ type:String},
})
const Employee = mongoose.model('Employee',EmployeeSchema)

module.exports= {
  Employee
}