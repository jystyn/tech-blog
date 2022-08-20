//  Pull in the constructor
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Set up our connection to the mysql server locally or on the cloud
const connection = process.env.JAWSDB_URL
? new Sequelize(process.env.JAWSDB_URL)
: new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true,
    },
  });

// const connection = new Sequelize(
//     'tech_blog',
//     'root',
//     '',
//     {
//         host: 'localhost',
//         dialect: 'mysql',
//         // logging: false
//     }
// );

module.exports = connection;