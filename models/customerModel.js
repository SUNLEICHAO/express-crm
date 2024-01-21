const config = require('../knexfile').development;
const knex = require('knex')(config);

const BaseModel = require('./base')

class CustomerModel extends BaseModel {
  constructor(props = 'customers') {
    super(props)
  }

  selectSpan(limit, offset) {
    return knex(this.table).select().limit(limit).offset(offset)
  }
}

module.exports = CustomerModel