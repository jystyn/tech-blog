const { Datatypes, Model } = require('sequelize');

class User extends Model { }

User.init({
    username: {
        type: Datatypes.STRING,
        allowNull: false
    },
    email: {
        type: Datatypes.STRING,
        allowNull: false
    },
    password: {
        type: Datatypes.STRING,
        allowNull: false
    }
}, {
    sequelize: requre('../config/db_connection'),
    modelName: 'user'
});

module.exports = User;