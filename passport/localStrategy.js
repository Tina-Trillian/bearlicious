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
    callbackURL: "/"
  }, function (accessToken, refreshToken, profile, cb) {
    User.findOne({ 'facebookProvider.id': profile.id }, (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }

      if (!user) {
        console.log('hello,I logged in on FB')
        var newUser = new User({
          email: profile.emails[0].value
        });
        newUser.save()
        return;
      } else {
        return cb(err, user);
      }
    });
  }));

// UserSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
//   var that = this;
//   return this.findOne({
//         'facebookProvider.id': profile.id
//   }, function(err, user) {
//     // no user was found, lets create a new one
//     if (!user) {
//           var newUser = new that({
//                 email: profile.emails[0].value,
//                 facebookProvider: {
//                       id: profile.id,
//                       token: accessToken
//                 }
//           });

//           newUser.save(function(error, savedUser) {
//             if (error) {
//                   console.log(error);
//             }
//             return cb(error, savedUser);
//       });
//     } else {
//           return cb(err, user);
//     }
//   });
// };


/// ===first try===

// function (accessToken, refreshToken, profile, done) {
//   User.findOne({ facebookId: profile.id }, function (err, user) {
//     if (err) { return done(err); }
//     done(null, user);
//   }).save().then(result => console.log("USER", result))
// }