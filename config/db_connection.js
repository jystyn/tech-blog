//  Pull in the constructor
const { Sequelize } = require('sequelize');

// Set up our connection to the mysql server locally or on the cloud
const connection = new Sequelize(
    'tech_blog',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        // logging: false
    }
);

module.exports = connection;