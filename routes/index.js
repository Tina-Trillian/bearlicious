const express = require('express');
const router = express.Router();
const Restaurant = require("../models/Restaurant");


/* GET home page */
router.get('/', (req, res, next) => {
  Restaurant.find({}, (err, restaurants) => {
    console.log(restaurants)
    if (err) throw err;
    res.render('index', { restaurants }); // send restaurants  
  })
});

module.exports = router;
