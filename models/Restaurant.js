const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restSchema = new Schema({
  name: String,
  address: String,
  location: { type: String, coordinates: [Number] },
  category: {
    type: [String],
    enum: ["Pizza", "Burger", "Vegan", "Sushi", "German", "Indian", "Thai", "Vietnamese", "Craft beer", "Others"],
  },
  description: {
    type: String,
  },
  picPath: String,
});

restSchema.index({ location: '2dsphere' });

const Rest = mongoose.model('Rest', restSchema);
module.exports = Rest;
