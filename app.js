const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);
const passport = require('passport');
const cookieParser = require('cookie-parser');

require('./config/db/db');
// mongoose schemas
const Post = require('./models/post/post');
const User = require('./models/user/user');
// Routes
const postRouts = require('./routes/post');
const commonRoutes = require('./routes/common');
const userRouts = require('./routes/user');
const publicRoutes = require('./routes/public');

const app = express();

hbs.registerHelper('if_st', function (templateAtribut, compareAtreibut, opts) {
  if (templateAtribut === compareAtreibut) {
    return opts.fn(this);
  }
  return opts.inverse(this);
});

hbs.registerHelper('dataFormat', (value) => {
  //console.log(value.slice(0,17));
  return value.slice(0);
});

const { app: { port } } = require('./config/config');

// view engine setup
app.set('view engine', 'hbs');

// client views
app.use(express.static(path.join(__dirname,'public')));
app.use('/single-post', express.static('public'));
// user, post images
app.use('/uploads', express.static('uploads'));
app.use('/single-post', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
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
app.use('/', publicRoutes);
app.use('/', auth, commonRoutes);
app.use('/post', auth, postRouts);
app.use('/user', auth, userRouts);


app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
