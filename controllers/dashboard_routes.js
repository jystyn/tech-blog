const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all posts
router.get('/', withAuth, (req, res) => {
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
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => console.log(err));
});

// Get a single post by id to edit
router.get('/edit/:id', (req, res) => {
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
            res.render('edit-post', { post, loggedIn: true });
        })
        .catch(err => console.log(err));
});

router.get('/new', (req, res) => {
    res.render('add-post', { loggedIn: true });
});

module.exports = router;