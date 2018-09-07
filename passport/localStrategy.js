const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, next) {
    User.findOne({ email }, (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }

      if (!foundUser) {
        next(null, false, { message: 'Incorrect email' });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        next(null, false, { message: 'Incorrect password' });
        return;
      }

      next(null, foundUser);
    });
  }));

passport.use(new FacebookStrategy(
  {
    clientID: 244565082916525,
    clientSecret: '487df1dc3888fb8e797f0b5262de700c',
    // callbackURL: "https://bearlicious.herokuapp.com/",
    callbackURL: "/auth/facebook/callback"
  }, function (accessToken, refreshToken, profile, cb) {
    User.findOne({ 'facebookProvider.id': profile.id }, (err, user) => {
      if (err) {
        next(err);
        return;
      }
      console.log('\n \n Im at passport in FB\n \n ')
      console.log(profile)

      if (!user) {

        console.log('\n \n first time I use bearlicious \n \n ')
        var newUser = new User({
          facebookId: profile.id,
          username: profile.displayName
        });
        newUser.save()
        return;
      } else {
        return cb(err, user);
      }

    });
  }));
