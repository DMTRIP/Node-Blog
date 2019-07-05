const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
require('./config/db/db');
// mongoose post schema
const Post = require('./models/post/post');
const postRouts = require('./routes/post');
const publicRouts = require('./routes/common');
const userRouts = require('./routes/user');

const app = express();

hbs.registerHelper('if_st', function(templateAtribut, compareAtreibut, opts) {
  if (templateAtribut === compareAtreibut) {
    return opts.fn(this);
  }
  return opts.inverse(this);
});

const { app: { port } } = require('./config/config');

// view engine setup
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', publicRouts);
app.use('/post', postRouts);
app.use('/user', userRouts);


// app.get('/', (req, res) => {
//   res.render('index', {
//     title: 'hbs',
//     // choose style for post 1 == first style etc...
//     poststyle: 1,
//     post: [{
//
//     }],
//   });
// });

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
