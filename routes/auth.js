const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body
  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", { message: "Indicate username, email and password" });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The email already has an account" });
      return;
    }


    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email,
    });

    //req.login sets the newUser to the req.user, that means the user will
    // be logged in immediately after signing up

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        req.login(newUser, function (err) {
          if (err) { return next(err); }
          res.redirect("/")
        });
      }
    });
  });
});

//updated the picture seperatley and redirects to the same page 
//might be a problem that the inputs from the user disappears after they
//"refresh the page"
authRoutes.post("/:id/update/picture", (req, res, next) => {

  console.log("URL: ", req.url)

  req.files.picture.mv(`public/images/profilePics/${req.files.picture.name}`)


  User.findByIdAndUpdate(req.params.id, {
    picPath: `/images/profilePics/${req.files.picture.name}`
  }, { new: true }).then(user => {
    res.redirect(`/foodie/${req.params.id}/settings`)
  })
})

//picture update needs to be before(!) normal update, otherwise throws
//an error, because it will always got the normal update route

authRoutes.post("/:id/update", (req, res, next) => {
  console.log(req.url)
  const { username, description, expertIn } = req.body
  if (username === "") {
    res.render("auth/update", { message: "Please enter a User name!" });
    return;
  }
  let clean = expertIn.split(",")
  clean = clean.filter(el => el.length > 0)


  User.findByIdAndUpdate(req.params.id, {
    username,
    description,
    expertIn: clean,
  }, { new: true }).then(user => {
    res.redirect("/")
  })
});

// ====== Facebook Authentification ===== //
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
authRoutes.get('/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.

authRoutes.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// authRoutes.get('/facebook',
//   passport.authenticate('facebook', { scope: ['read_stream', 'publish_actions'] })
// );

module.exports = authRoutes;
