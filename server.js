const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
require('dotenv').config();
const PORT = process.env.PORT || 3333;

const { view_routes } = require('./controllers');

const app = express();

app.use(express.static(path.join('front')));
app.engine('hbs', engine({ extname:'.hbs' }));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', view_routes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));