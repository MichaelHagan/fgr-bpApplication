const Sequelize = require('sequelize');
const db = require('../config/database');

const application = db.define('Application', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING
    },
    phone:{
        type: Sequelize.STRING
    },
    resumeUrl: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'applications'
}
);

module.exports = application;