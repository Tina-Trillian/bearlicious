const express = require('express');
const router  = express.Router();


//add ":id" later to the route, when we have models
router.get('/profile', (req, res, next) => {
  res.render('foodie/profile');
});

module.exports = router;
