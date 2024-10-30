const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('blogsite', 'root', "", {
    host: 'localhost',
    dialect: 'mysql',
});

const authenticateDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to MySQL has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

authenticateDB();

module.exports = sequelize;