const express = require('express');
const router  = express.Router();
const User = require("../models/User");
const Rest = require("../models/Restaurant")
const Rec = require("../models/Recommend")
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
  res.render("foodie/recommendations", {
    user: req.user,
  })

})

router.get("/:id/recommendations/create", (req, res, next) => {

  getRightPlace("+493040044289").then(result => {
    console.log("Hello", result)
    res.render("foodie/edit", {
      user: req.user,
      restaurant: result,
    })
  })
})

router.post("/:id/recommendations/create", (req, res, next) => {
  let {name,phone,picPath,address,coordinates,comment} = req.body;

  const arrAddress = address.split(",")
  const arrCoordinates = coordinates.split(",")
  const numberArray = arrCoordinates.map(el => {
    return parseFloat(el);
  })

  
  

  Rest.findOne({phone}).then(rest => {

    console.log("Result",rest)

    if (rest === null) {
      new Rest({
      name,
      phone,
      picPath,
      address : arrAddress,
      location: {
      type: "Point",
      coordinates: numberArray,
    }
  }).save().then(result => {

    User.findById(req.params.id).then(author => {
      console.log(result)
      new Rec({
        comment,
        author: author.username,
        restName: result.name
      }).save().then(comment => {
        Rest.findByIdAndUpdate(result._id, { $push: { recommendation: comment._id } })
        .then(restaurant => {
          console.log("This is the restaurant", restaurant)
        })
      })
    })
    res.redirect(`/restaurant/${result._id}`)
  })
  }
  else {res.send("Already made")}
  })
 

})




module.exports = router;
