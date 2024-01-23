const BaseModel = require('./base')

class PermissionModel extends BaseModel {
  constructor(props = 'permissions') {
    super(props)
  }
}

module.exports = PermissionModel