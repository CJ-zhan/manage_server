const expressjwt = require('express-jwt')
const { SELRET_KEY } = require('./constant')

const jwtAuth = expressjwt({
  secret:SELRET_KEY,
  algorithms:['HS256'],
  credentialsRequired: true
}).unless({
  path:[
    '/',
    '/manage/user/login',
    '/manage/user/register'
  ]
})

module.exports = jwtAuth
