const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as necessary
const Category = require('./Category'); // Adjust the path as necessary

const Subcategory = sequelize.define('Subcategory', {
    subcategory_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subcategory_image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id'
        }
    }
}, {
    tableName: 'subcategories',
    timestamps: false
});

Subcategory.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Subcategory, { foreignKey: 'category_id' });

module.exports = Subcategory;