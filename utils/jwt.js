const expressjwt = require('express-jwt')
const { SELRET_KEY } = require('./constant')

// jwt  token认证
const jwtAuth = expressjwt({
  secret:SELRET_KEY,
  algorithms:['HS256'],
  credentialsRequired: true
}).unless({
  //这里的无需token认证
  path:[
    '/',
    '/manage/user/login',
    '/manage/user/register'
  ]
})

module.exports = jwtAuth
