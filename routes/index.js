const express = require('express');
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const recommendation = require("../models/Recommend");
const User = require("../models/User");

/* GET home page */
router.get('/', (req, res, next) => {
  Restaurant.find({}, (err, restaurants) => {
    console.log(restaurants)
    if (err) throw err;
    res.render('index', {
      restaurants,
      user: req.user
    }); // send restaurants  
  })
});


router.get("/restaurant/:id", (req, res, next) => {

  Restaurant.findById(req.params.id)
  .populate("recommendation")
  .exec()
  .then(restaurant => {
    res.render("restaurant/restaurant", {
        restaurant,
        user: req.user
    })
  })
})

router.post("/restaurant/:id", (req, res, next) => {

  User.findByIdAndUpdate(req.body.userId, {$push: {
    bookmarks: req.params.id
  }}, {new: true}).then(result =>
    res.redirect(`/restaurant/${req.params.id}`)
  )
})

module.exports = router;
