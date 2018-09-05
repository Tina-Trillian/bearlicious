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
  User.findById(req.params.id).then(user => {
    res.render('foodie/profile', { profileUser: user });
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

 



  // res.render("foodie/recommendations", {
  //   user: req.user,
  // })

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
    const {coordinates, picPath, address, name, phone,id} = req.body
    const arrAddress = address.split(",")
    const arrCoordinates = coordinates.split(",")
    const numberArray = arrCoordinates.map(el => {
    return parseFloat(el);
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
          })
        })
      }
      else {
        res.render("foodie/create", {
          user: req.user,
          restaurant,
        })
      }
  })
})


router.post("/:id/recommendations/new", (req, res, next) => {





 User.findById(req.user.id).then(user => {

    Rest.findById(req.body._id)
    .then(restaurant => {

        let newRecom = new Recom({
          comment: req.body.comment,
          author: req.user.username,
          restName: restaurant.name,
          authorId: req.user._id,
          restId: restaurant._id,
        })
        .save()
        .then(result => {
          user.recommendations = user.recommendations.concat([result._id])
          user.save()
          restaurant.recommendation = restaurant.recommendation.concat([result._id])
          restaurant.save()
          console.log("REST",restaurant.recommendation)
          console.log("USER",user.recommendations)
        })
        .then(result => {
          res.redirect(`/restaurant/${restaurant._id}`)
        })
     })  
  })
})

  //   if (rest === null) {
  //     const newRes = new Rest({
  //       name,
  //       yelpId,
  //       phone,
  //       picPath,
  //       address: arrAddress,
  //       location: {
  //         type: "Point",
  //         coordinates: numberArray,
  //       }
  //     })

  //     const newRec = new Recom({
  //       comment: comment,
  //       author: req.user.username,
  //       restName: newRes.name,
  //       author_id: req.user._id,
  //     }).save().then(result => {
  //       User.findById(req.user.id).then(user => {
  //         user.recommendation.push(result._id)
  //       }).save()
  //       newRes.recommendation.push(result._id)
  //     })

  //     newRes.save()

  //     res.send(newRes)
  //     restaurant = newRes
  //     // res.redirect(`/restaurant/${newRes._id}`)
  //   }
  //   else {

  //     rest.recommendation = rest.recommendation.concat([{
  //       comment: comment,
  //       author: req.user.username,
  //       restName: rest.name,
  //       author_id: req.user._id,
  //     }])

  //     rest.save();

  //     restaurant = rest
  //   console.log("22222",rest)

   
  // }
  // return restaurant;
  // }).then(result => {
  //   console.log(result)
  //   res.redirect(`/restaurant/${result._id}`)
  // })


// })




module.exports = router;
