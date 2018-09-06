const express = require('express');
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const recommendation = require("../models/Recommend");
const User = require("../models/User");

/* GET home page */
router.get('/', (req, res, next) => {

  const expArr = []
  const foodArr = User.schema.tree.expertIn.enum
  foodArr.map(el => {
    let foodObj = {}
    foodObj["key"] = el;
    foodObj["value"] = false;
    expArr.push(foodObj)
  })

  Restaurant.find({}, (err, restaurants) => {

    if (err) throw err;
    res.render('index', {
      restaurants,
      user: req.user,
      expArr
    }); // send restaurants  
  })
});


router.get("/restaurant/:id", (req, res, next) => {

  Restaurant.findById(req.params.id)
  .populate("recommendation")
  .exec()
  .then(restaurant => {

    let bookmark = false

    if (req.user && req.user.bookmarks.indexOf(req.params.id) !== -1) {
      bookmark = true
    }

    res.render("restaurant/restaurant", {
        restaurant,
        user: req.user,
        bookmark,
    })
  })
})

router.post("/restaurant/:id", (req, res, next) => {

  
  User.findById(req.body.userId)
  .then(result => {
    if (result.bookmarks.indexOf(req.params.id) === -1) {
      result.bookmarks = result.bookmarks.concat([req.params.id])
      result.save();
    }
    else if (result.bookmarks.indexOf(req.params.id) !== -1){
      let index = result.bookmarks.indexOf(req.params.id)
      result.bookmarks.splice(index,1)
      result.save()}
    res.redirect(`/restaurant/${req.params.id}`)
  })
})

module.exports = router;
