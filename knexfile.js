// Update with your config settings.
require('dotenv').config()
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  // 开发时默认即运行development
  development: {
    client: 'mysql',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
      tableName: '20240116031402_create_crm'
    },
    seeds: {
      directory: './database/seeds',
      tableName: '20240116031402_create_crm'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
      tableName: '20240116031402_create_crm'
    }
  },

  // production: {
  //   client: 'mysql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password',

  //   },
  //   filename: './xxx',
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
