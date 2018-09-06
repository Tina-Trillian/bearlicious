const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Recommend = require("../models/Recommend");

//User can sign-in with facebook and google as well
//that is why the password etc. is not required
//will maybe add later some other options in "expertsIn"

//will use "createdAt" to show on profile how long the user is a member

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  expertIn: {
    type: [String],
    enum: ["Pizza", "Burger", "Vegan", "Sushi", "German", "Indian", "Thai", "Vietnamese", "Craft Beer", "Others"],
  },
  description: {
    type: String,
  },
  picPath: String,
  facebookId: String,
  googleId: String,
  bookmarks: [{
    type : Schema.Types.ObjectId,
    ref: "Rest"
  }],
  recommendations: [{
    type: Schema.Types.ObjectId,
    ref: "Recommend"}],
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
