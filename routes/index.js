const express = require('express');
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const recommendation = require("../models/Recommend");

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

module.exports = router;
