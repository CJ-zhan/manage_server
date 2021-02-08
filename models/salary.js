const mongoose = require('mongoose');


SalarySchema = new mongoose.Schema({
  d_name: { type:String },
  d_describe: { type:String }
})
const Salary = mongoose.model('Salary',SalarySchema)

module.exports= {
  Salary
}