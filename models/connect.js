// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost/manage', {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true })
	.then(() => console.log('数据库连接成功'))
  .catch(() => console.log('数据库连接失败'))

// UserSchema = new mongoose.Schema({
//   user:{ type:String, unique:true },
//   password:{
//     type:String,
//     set(val){
//       // 加密处理
//       return require('bcrypt').hashSync(val,10)
//     }
//   }
// })
// const User = mongoose.model('User',UserSchema)

// module.exports= {
//   User
// }