const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const PORT = process.env.PORT || 3131;
const db = require('./config/db_connection');
require('dotenv').config();

const { view_routes } = require('./controllers');
const User = require('./models/User');

const app = express();

app.use(express.static(path.join('front')));
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', view_routes);

db.sync().then(() => {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
});