const {
  CODE_ERROR,
  CODE_SUCCESS,
  CODE_TOKENERROR
} = require('./constant')

class Result {
  constructor(data, msg = '操作成功', options) {
    this.data = data
    this.msg = msg
    if(data) {
      this.count = data.length || 0
    }
    if (options) {
      this.options = options
    }
  }

  createResult() {
    if (!this.code) {
      this.code = CODE_SUCCESS
    }
    let base = {
      code: this.code,
      data: this.data,
      msg: this.msg,
      count:this.data.length
    }
    if (this.options) {
      base = { ...base, ...this.options }
    }
    return base
  }

  json(res) {
    res.json(this.createResult())
  }

  success(res) {
    this.code = CODE_SUCCESS
    this.json(res)
  }

  fail(res) {
    this.code = CODE_ERROR
    this.json(res)
  }
  jwtError(res) {
    this.code = CODE_TOKENERROR,
    this.json(res)
  }
}

module.exports = Result
