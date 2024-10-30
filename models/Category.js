const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as necessary


const Category = sequelize.define('Category', {
    category_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category_image: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'categories', // Adjust the table name as necessary
    timestamps: true // Enable timestamps
});


// Sync the model with the database
sequelize.sync()
    .then(() => {
        console.log('Category table has been created.');
    })
    .catch(error => {
        console.error('Category to create table : ', error);
    });

module.exports = Category;