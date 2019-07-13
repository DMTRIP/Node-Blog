const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');

// require mongoose user model
const User = require('../models/mongodb/mongoose-models/user');

passport.serializeUser((user, done) => {
  console.log('Сериализация: ', user);
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  console.log('Десериализация: ', id);
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    console.log('in Strategy');
    User.findOne({ email, password }, (err, result) => {
      if (err) throw err;
      if (result === false) {
        return done(null, false);
      }
      return done(null, result);
    });
  }),
);


