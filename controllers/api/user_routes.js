const router = require('express').Router();
const { underscoredIf } = require('sequelize/types/utils');
const { User, Post, Comment } = require('../../models');

// Get all users
router.get('/', (req, res) => {
    User.findAll({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => console.log(err));
});

// Get user by ID
router.get('/:d', (req, res) => {
    User.FindOne({
        where: { id: req.params.id },
        include: [{
            model: Post,
            attributes: ['id', 'title', 'content', 'date_created']
        }, {
            model: Comment,
            attributes: ['id', 'content', 'date_created']
        }]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No user found with that ID!'
                });
                return;
            };
            res.json(dbUserData);
        })
        .catch(err => console.log(err));
});

// Create user
router.post('/', (res, req) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            })
        })
        .catch(err => console.log(err));
});

// Login user
router.post('/login', (req, res) => {
    User.findOne({
        where: { username: req.body.username }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({
                    message: 'There is no user with that username!'
                });
                return;
            };

            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                req.json({
                    user: dbUserData,
                    message: 'You are logged in!'
                });
            });
        });
});

// Logout user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    };
});

module.exports = router;