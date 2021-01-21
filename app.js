const express = require('express')
const router = require('./route/index')
const fs = require('fs')
const bodyPraser = require('body-parser')
const app = express()

app.use(bodyPraser.urlencoded({extended: true}))
app.use(bodyPraser.json())

app.use('/',router)

app.listen(3000,() => {
  console.log('http://localhost:3000')
})