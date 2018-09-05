const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Rest = require("../models/Restaurant")
const Places = require("../public/javascripts/places.js");
const getThreeResults = Places.getThreeResults;
const getRightPlace = Places.getRightPlace;


//add ":id" later to the route, when we have models
router.get('/profile/:id', (req, res, next) => {
  User.findById(req.params.id).then(user => {
    res.render('foodie/profile', { profileUser: user });
  })
});


<<<<<<< HEAD
//check if user is signed in and the right one, otherwise redirect to
//sign in page
router.get('/:id',(req, res, next) => {
=======
//check if user is signed in and the right one
router.get('/:id', (req, res, next) => {
>>>>>>> 9f9451f00b2c0439c168933b5bc40150aa4362b7
  if (!req.user || req.user.id !== req.params.id) {
    res.redirect("/auth/login")
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
router.get("/:id/recommendations", (req, res, next) => {
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

router.get("/:id/recommendations/search", (req, res, next) => {
  
  res.render("foodie/search", {user: req.user})

})

//Will ask the Api for the top 3 results and render the page with the
//results
router.post("/:id/recommendations/search", (req, res, next) => {
  const {term} = req.body
  
  getThreeResults({term, location: "Berlin, germany"}).then(restaurants => {
    console.log(restaurants);
    res.render("foodie/search", {restaurants, user : req.user})})
  .catch(err => console(err))
})

router.post("/:id/recommendations/create", (req, res, next) => {
    const {coordinates, picPath, address, name, phone} = req.body
    const restaurant = {
      coordinates,
      picPath,
      address,
      name,
      phone,
    }
    res.render("foodie/create", {
      user: req.user,
      restaurant,
    })
  })

<<<<<<< HEAD
router.post("/:id/recommendations/new", (req, res, next) => {
  let {name,phone,picPath,address,coordinates,comment} = req.body;
=======
router.post("/:id/recommendations/create", (req, res, next) => {
  let { name, phone, picPath, address, coordinates, comment } = req.body;

>>>>>>> 9f9451f00b2c0439c168933b5bc40150aa4362b7
  const arrAddress = address.split(",")
  const arrCoordinates = coordinates.split(",")
  const numberArray = arrCoordinates.map(el => {
    return parseFloat(el);
  })


  console.log("Phone", phone)

  Rest.findOne({ phone: phone }).then(rest => {

<<<<<<< HEAD
    console.log("Result",rest)
    let restaurant;
    //check if there already is a restaurant with that phone number 
    //phone number acts as an id here - if there is, the recommendation will be
    //added to the existing Restaurant if not it will create a new Restuarant

=======
    console.log("Result", rest)
>>>>>>> 9f9451f00b2c0439c168933b5bc40150aa4362b7

    if (rest === null) {
      const newRes = new Rest({
        name,
        phone,
        picPath,
        address: arrAddress,
        location: {
          type: "Point",
          coordinates: numberArray,
        }
      })
      newRes.recommendation.push({
        comment: comment,
        author: req.user.username,
        restName: newRes.name,
        author_id: req.user._id,
      })
      newRes.save()
<<<<<<< HEAD
      restaurant = newRes
      // res.redirect(`/restaurant/${newRes._id}`)
=======

      res.redirect(`/restaurant/${newRes._id}`)
>>>>>>> 9f9451f00b2c0439c168933b5bc40150aa4362b7
    }
    else {

      rest.recommendation = rest.recommendation.concat([{
        comment: comment,
        author: req.user.username,
        restName: rest.name,
        author_id: req.user._id,
      }])

      rest.save();

      restaurant = rest
    console.log("22222",rest)

   
  }
  return restaurant;
  }).then(result => {
    console.log(result)
    res.redirect(`/restaurant/${result._id}`)
  })


})




module.exports = router;
