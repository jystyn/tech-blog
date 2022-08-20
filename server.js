const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const PORT = process.env.PORT || 3131;
const db = require('./config/db_connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

require('dotenv').config();

const { view_routes } = require('./controllers');
const User = require('./models/User');

const app = express();

app.use(express.static(path.join('front')));
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({ db }),
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: false
    }
}));

app.use('/', view_routes);

db.sync().then(() => {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
});