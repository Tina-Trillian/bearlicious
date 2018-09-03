const express = require('express');
const router  = express.Router();



//add ":id" later to the route, when we have models
router.get('/profile/:id', (req, res, next) => {
  res.render('foodie/profile');
});


//check if user is signed in and the right one
router.get('/:id',(req, res, next) => {
  if (!req.user || req.user._id !== req.params.id) {
    res.redirect("/")
  }
  else next();
});

//we don't need to search the Database for the right User here,
//because of the middleWare protection
router.get("/:id/settings", (req, res, next) => {
  console.log("Session User: ", req.user)
  res.render("foodie/settings", {
    user: req.user
  })
})

//we don't need to search the Database for the right User here,
//because of the middleWare protection
router.get("/:id/bookmarks", (req, res, next) => {
  res.render("foodie/bookmarks", {
    user: req.user
  })
})

//when the user wants to access this route and does NOT have expertIn or
//description values, he gets redirected to the setting page
router.get("/:id/recommendations", (req,res, next) => {
  console.log(req.user);
  if (!req.user.expertIn.length === 0 || !req.user.decription) {
    res.redirect(`/foodie/${req.user._id}/settings`)
  }
  else next();
})

//we don't need to search the Database for the right User here,
//because of the middleWare protection
router.get("/:id/recommendations", (req, res, next) => {
  res.render("foodie/recommendations", {
    user: req.user
  })
})





module.exports = router;
