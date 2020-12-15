const HTTP_STATUS_CODE = require('../config/http-status-code')

class BaseModel {
  constructor (data, message) {
    if (typeof data === 'string') {
      this.message = data
      data = null
      message = null
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

class SuccessModel extends BaseModel {
  constructor (data, message) {
    super(data, message)
    this.code = HTTP_STATUS_CODE.SUCCESS_CODE
  }
}

class ErrorModel extends BaseModel {
  constructor (data, message) {
    super(data, message)
    this.code = HTTP_STATUS_CODE.SUCCESS_CODE
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}
