const express = require('express');
const router = express.Router();
const Restaurant = require("../models/Restaurant");


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
  
  Restaurant.findById(req.params.id).then(restaurant => {
    res.render("restaurant/restaurant", {
        restaurant
    })
  })
})

module.exports = router;
