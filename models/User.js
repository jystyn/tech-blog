const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: 6,
                msg: 'Your password must be at least 6 characters in length.'
            }
        }
    }
}, {
    sequelize: require('../config/db_connection'),
    modelName: 'user',
    freezeTableName: true,
    underscored: true,
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bycrypt.hash(user.password, 10);
            return user;
        },
        beforeUpdate: async (updatedUser) => {
            updatedUser.password = await bycrypt.hash(updatedUser.password, 10);
            return updatedUser;
        }
    }
});

module.exports = User;