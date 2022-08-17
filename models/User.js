const { Datatypes, Model } = require('sequelize');

class User extends Model { }

User.init({
    username: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
            len: 2
        }
    },
    email: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
            len: 6
        }
    }
}, {
    sequelize: requre('../config/db_connection'),
    modelName: 'user'
});

module.exports = User;