const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);
const passport = require('passport');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

require('./config/mongodb-config');
// mongoose schemas
const Post = require('./models/mongodb/mongoose-models/post');
const User = require('./models/mongodb/mongoose-models/user');
// Routes
const publicRoutes = require('./routes/public');

const blogRoute = require('./routes/blog');

const app = express();

// help show define arr's elements amount
hbs.registerHelper('each_limit', function (arr, max, options) {
  if (!arr || arr.length === 0) return options.inverse(this);

  const result = [];
  for (let i = 0; i < max && i < arr.length; ++i) result.push(options.fn(arr[i]));
  return result.join('');
});

const { app: { port } } = require('./config/config');

// view engine setup
app.set('view engine', 'hbs');

// client views
app.use(express.static(path.join(__dirname, '/public')));

// user, post images
app.use('/uploads', express.static('uploads'));

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
app.use(flash());

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect('/login');
  }
};

app.use('/', publicRoutes);
app.use('/blog', blogRoute);


app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
