const Sequelize = require("sequelize");
require('dotenv').config();

// Connect to the database
module.exports = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: 'dpg-chrt0qe4dadfn67jcjb0-a',
    dialect: 'postgres',
    operatorsAliases: '0',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});