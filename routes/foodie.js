const express = require('express');
const router  = express.Router();
const User = require("../models/User");
const getRightPlace = require("../public/javascripts/places.js");


//add ":id" later to the route, when we have models
router.get('/profile/:id', (req, res, next) => {
  User.findById(req.params.id).then(user => {
    res.render('foodie/profile', {user});
  }) 
});


//check if user is signed in and the right one
router.get('/:id',(req, res, next) => {
  if (!req.user || req.user.id !== req.params.id) {
    res.redirect("/")
  }
  else next();
});

//we don't need to search the Database for the right User here,
//because of the middleWare protection
router.get("/:id/settings", (req, res, next) => {
  
  const expArr = []
  const foodArr = User.schema.tree.expertIn.enum
  foodArr.map(el => {
    let foodObj = {}
    foodObj["key"] = el;
    if (req.user.expertIn.indexOf(el) > -1) {
      foodObj["value"] = true
    }
    else {
      foodObj["value"] = false
    }
    expArr.push(foodObj)
  })

  console.log(expArr)
  res.render("foodie/settings", {
    user: req.user,
    expArr,
  })
})

//we don't need to search the Database for the right User here,
//because of the middleWare protection
router.get("/:id/bookmarks", (req, res, next) => {
  res.render("foodie/bookmark", {
    user: req.user
  })
})

//when the user wants to access this route and does NOT have expertIn or
//description values, he gets redirected to the setting page
router.get("/:id/recommendations", (req,res, next) => {
  if (req.user.expertIn.length === 0 || !req.user.description) {
    res.redirect(`/foodie/${req.user._id}/settings`)
  }
  else next();
})

//we don't need to search the Database for the right User here,
//because of the middleWare protection
router.get("/:id/recommendations", (req, res, next) => {

  // getRightPlace("+493040044289").then(result => {
  //   console.log("Hello", result)
  // })

  res.render("foodie/recommendations", {
    user: req.user
  })
})





module.exports = router;
