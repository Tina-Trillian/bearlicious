const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

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
  bookmarks: [Schema.Types.ObjectId],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
