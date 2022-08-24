const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// Get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'content', 'date_created'],
        include: [{
            model: User,
            attributes: ['username']

        }, {
            model: Comment,
            attributes: ['id', 'content', 'date_created', 'user_id', 'post_id'],
            include: User,
            attributes: ['username']
        }]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage', { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => console.log(err));
});

// Get a single post by id
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'content', 'date_created'],
        include: [{
            model: User,
            attributes: ['username']

        }, {
            model: Comment,
            attributes: ['id', 'content', 'date_created', 'user_id', 'post_id'],
            include: User,
            attributes: ['username']
        }]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({
                    message: 'No post found with this id!'
                });
            };

            const post = dbPostData.get({ plain: true });
            res.render('single-post', { post, loggedIn: req.session.loggedIn });
        })
        .catch(err => console.log(err));
});

// Go to login page
router.get('/login', isLoggedIn, (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Go to signup page
router.get('/signup', isLoggedIn, (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;