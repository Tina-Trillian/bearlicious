const mongoose = require('mongoose');
const Rest = require('../models/Restaurant');

// const dbName = 'awesome-project';
mongoose.connect(process.env.MONGODB_URI);

const restaurants = [
  {
    name: "Sushi Restaurants",
    location: {
      type: "Point",
      coordinates: [52.508402, 13.374900],
    }
  },
  {
    name: "Pizza Restaurants",
    location: {
      type: "Point",
      coordinates: [52.509034, 13.375079],
    }
  },
  {
    name: "Kebab Restaurants",
    location: {
      type: "Point",
      coordinates: [52.510888, 13.377504],
    }
  },
]

Rest.create(restaurants, (err) => {
  if (err) { throw (err) }
  console.log(`Created ${restaurants.length} restaurants`)
  mongoose.connection.close()
});