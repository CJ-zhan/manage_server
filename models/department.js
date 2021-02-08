const mongoose = require('mongoose');


DepartmentSchema = new mongoose.Schema({
  d_name: { type:String },
  d_describe: { type:String }
})
const Department = mongoose.model('Department',DepartmentSchema)

module.exports= {
  Department
}