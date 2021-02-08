const express = require('express')
const router = express.Router()
const Reslut = require('../utils/Result')
//导入Salary规则模块
const { Salary } = require('../models/salary')


module.exports = router