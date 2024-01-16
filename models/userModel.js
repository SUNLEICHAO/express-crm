const BaseModel = require('./base')

class UserModel extends BaseModel {
  constructor(props = 'users') {
    super(props)
  }
}

module.exports = UserModel