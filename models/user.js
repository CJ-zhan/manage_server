const mongoose = require('mongoose');


UserSchema = new mongoose.Schema({
  user:{ type:String, unique:true },
  password:{
    type:String,
    set(val){
      // 加密处理
      return require('bcrypt').hashSync(val,10)
    }
  },
  role:{ type:String },
  status:{ type:Number },
  nickname: { type: String }
})
const User = mongoose.model('User',UserSchema)

module.exports= {
  User
}