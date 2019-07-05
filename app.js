const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);
const passport = require('passport');

require('./config/db/db');
// mongoose schemas
const Post = require('./models/post/post');
const User = require('./models/user/user');
// Routes
const postRouts = require('./routes/post');
const publicRouts = require('./routes/common');
const userRouts = require('./routes/user');

const app = express();

hbs.registerHelper('if_st', function (templateAtribut, compareAtreibut, opts) {
  if (templateAtribut === compareAtreibut) {
    return opts.fn(this);
  }
  return opts.inverse(this);
});

const { app: { port } } = require('./config/config');

// view engine setup
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use session
app.use(
  expressSession({
    secret: 'hghtyNN23h',
    store: new FileStore(),
    cookie: {
      path: '/',
      httpOnly: false,
      maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  }),
);

// Configuring passport
require('./config/config-passport');

app.use(passport.initialize());
app.use(passport.session());


const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect('/login');
  }
};

app.use('/', publicRouts);
app.use('/post', postRouts);
app.use('/user', userRouts);


app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
