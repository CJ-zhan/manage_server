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
  nickname: { type: String },
  email: { type: String },
  bio:{ type: String },
  useremail:{ type:String },
  mtime:{ type:String }
})


//头像存储表信息关联  规则
PhotoSchema = new mongoose.Schema({
  // pic:{type:Buffer},
  pic:{type:String},
  pic_user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  mtime:{ type:String}
})

const User = mongoose.model('User',UserSchema)
const Photo = mongoose.model('Photo',PhotoSchema)


module.exports= {
  User,
  Photo
}