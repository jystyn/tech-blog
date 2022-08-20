//Create a router object to set up routes
const view_router = require('express').Router();
const { isLoggedIn } = require('./helpers');
const User = require('../models/User');

// GET route listening on localhost:3333
view_router.get('/', (req, res) => {

    if (user_id) {
        return User.findOne({
            where: {
                id: user_id
            },
            attributes: ['id', 'email', 'username']
        })
            .then(user => {
                user = {
                    username: user.username,
                    email: user.email
                };

                res.render('index', { user });
            });
    };

    //Sends our index.hbs file back to the client-side, main.hbs is loaded first
    //then anything inside of index.hbs is output througgh the {{{body}}}
    res.render('index');
});

view_router.get('/login', isLoggedIn, (req, res) => {
    res.render('login', { errors: req.session.errors });
});

view_router.get('/register', isLoggedIn, (req, res) => {
    res.render('register', { errors: req.session.errors });
});

module.exports = view_router;