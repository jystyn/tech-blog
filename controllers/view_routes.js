//Create a router object to set up routes
const view_router = require('express').Router();

// GET route listening on localhost:3333
view_router.get('/', (req, res) => {
    //Sends our index.hbs file back to the client-side, main.hbs is loaded first
    //then anything inside of index.hbs is output througgh the {{{body}}}
    res.render('index');
});

module.exports = view_router;