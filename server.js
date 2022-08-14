const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const { escapeRegExp } = require('lodash');
require('dotenv').config();
const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.static(path.join('front')));
app.engine('hbs', engine({ extname:'.hbs' }));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index', { })
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`));