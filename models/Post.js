const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as necessary
const User = require('./User'); // Adjust the path as necessary



const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    tableName: 'posts',
    timestamps: false
});
Post.belongsTo(User, { foreignKey: 'UserId' });
User.hasMany(Post, { foreignKey: 'UserId' });

module.exports = Post;