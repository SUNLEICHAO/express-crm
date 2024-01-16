const BaseModel = require('./base')

class CustomerModel extends BaseModel {
  constructor(props = 'customers') {
    super(props)
  }
}

module.exports = CustomerModel