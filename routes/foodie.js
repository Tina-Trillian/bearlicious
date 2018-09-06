const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Rest = require("../models/Restaurant")
const Recom = require("../models/Recommend")
const Places = require("../public/javascripts/places.js");
const getThreeResults = Places.getThreeResults;
const getRightPlace = Places.getRightPlace;


//add ":id" later to the route, when we have models
router.get('/profile/:id', (req, res, next) => {
  User.findById(req.params.id)
  .populate({
    path: 'recommendations',
    populate: { path: 'restId' }
  })
  .then(user => {
    let sameUser = false

    console.log("REQ", typeof req.user._id)
    console.log("USER",typeof user._id)
    if (req.user._id.toString() == user._id.toString()) {
      sameUser = true
    }
    console.log("DEBUG",sameUser)
    
    res.render('foodie/profile', { 
      user: req.user,
      profileUser: user,
      sameUser, });
  })
});

//check if the user is signed in and the right one, otherwise redirect to
//sign in page
router.get('/:id',(req, res, next) => {
  if (!req.user || req.user.id !== req.params.id) {
    res.redirect("auth/login")
  }
  else next();
})

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

  res.render("foodie/settings", {
    user: req.user,
    expArr,
  })
})

//we don't need to search the Database for the right User here,
//because of the middleWare protection
router.get("/:id/bookmark", (req, res, next) => {

  User.findById(req.params.id)
  .populate("bookmarks")
  .exec()
  .then(result => {

    res.render("foodie/bookmark", {
      user: req.user,
      bookmarks : result.bookmarks
    })
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

  //populates works just with a query! It is also important to name the Schema
  //like you do in the file it is defined!
  //with the code below, it is possible to populate fields INSIDE populated fields!

  User.findById(req.params.id)
    .populate({
    path: 'recommendations',
    populate: { path: 'restId' }
  }).then(result => {
    let restaurants = []
    result.recommendations.forEach(el => {
      restaurants.push(el.restId)
    })
    res.render("foodie/recommendations", {
      user: req.user,
      restaurants
    })
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
    //console.log(restaurants);
    res.render("foodie/search", {restaurants, user : req.user})})
  .catch(err => console(err))
})

router.get("/:id/recommendations/create/:restid", (req,res,next) => {
  

  const expArr = []
  const foodArr = User.schema.tree.expertIn.enum
  foodArr.map(el => {
    let foodObj = {}
    foodObj["key"] = el;
    foodObj["value"] = false;
    expArr.push(foodObj)
  })
// console.log(foodArr)

  User.findById(req.params.id)
    .populate("recommendations")
    .exec()
    .then(result => {
      let comment;
      result.recommendations.forEach(el => {
        if(req.params.restid == el.restId)
        comment = el.comment
      })


        Rest.findById(req.params.restid).then(restaurant => {
          restaurant.category.forEach(category => {
              expArr.forEach(button => {
                if(button.key == category) 
                {button.value = true}
              })
          })
          
          res.render("foodie/create", {
            user: req.user,
            restaurant,
            comment,
            expArr,
          })
        })
    })
})

router.post("/:id/recommendations/create", (req, res, next) => {
    const {coordinates, picPath, address, name, phone,id} = req.body
    const arrAddress = address.split(",")
    const arrCoordinates = coordinates.split(",")
    const numberArray = arrCoordinates.map(el => {
    return parseFloat(el);
  })

  const expArr = []
  const foodArr = User.schema.tree.expertIn.enum
  foodArr.map(el => {
    let foodObj = {}
    foodObj["key"] = el;
    foodObj["value"] = false;
    expArr.push(foodObj)
  })
  
    Rest.findOne({yelpId : id}).then(restaurant => {
      
      if(!restaurant) {
        new Rest({
          location: {
               type: "Point",
               coordinates: numberArray,
              },
          picPath,
          address,
          name,
          phone,
          yelpId : id,
        }).save().then(rest => {
          res.render("foodie/create", {
            user: req.user,
            restaurant : rest,
            expArr,
          })
        })
      }
      else {

        restaurant.category.forEach(food => {
          expArr.forEach(button => {
            if(food === button.key)
            {button.value = true}
          })
        })

        // console.log(expArr)
        
        res.render("foodie/create", {
          user: req.user,
          restaurant,
          expArr,
        })
      }
  })
})


router.post("/:id/recommendations/new", (req, res, next) => {

  let clean = req.body.category.split(",")
  clean = clean.filter(el => el.length > 0)


 User.findById(req.user.id)
 
 .then(user => {

    Rest.findById(req.body._id)
    .populate("recommendation")
    .exec()
    .then(restaurant => {

      Recom.findOneAndUpdate({authorId : user._id}, {
        comment: req.body.comment,
          author: req.user.username,
          restName: restaurant.name,
          authorId: req.user._id,
          restId: restaurant._id,
      }, {upsert: true, new: true})
      .then(comment => {

        restaurant.recommendation.filter(recom => (recom._id.toString() == comment._id.toString()))
            if (user.recommendations.indexOf(comment._id) == -1)
            {user.recommendations = user.recommendations.concat([comment._id])
            user.save()}
            if ((restaurant.recommendation.filter(recom => (recom._id.toString() == comment._id.toString()))).length === 0 )
            {restaurant.recommendation = restaurant.recommendation.concat([comment._id])
            restaurant.category = clean;
            restaurant.save()}
          })
          .then(result => {
            res.redirect(`/restaurant/${restaurant._id}`)
          })
    
      })
  
     })  
  })





module.exports = router;
