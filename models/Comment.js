const { DataTypes, Model } = require('sequelize');

class Comment extends Model { }

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_created: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'post',
            key: 'id'
        }
    }
}, {
    sequelize: require('../config/db_connection'),
    modelName: 'comment',
    freezeTableName: true,
    underscored: true
});

module.exports = Comment;