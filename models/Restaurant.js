const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recommendSchema = new Schema({
  restName: String,
  author: String,
  comment: String,
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const restSchema = new Schema({
  name: String,
  address: String,
  phone: String,
  location: { type: { type: String }, coordinates: [Number] },
  category: {
    type: [String],
    enum: ["Pizza", "Burger", "Vegan", "Sushi", "German", "Indian", "Thai", "Vietnamese", "Craft beer", "Others"],
  },
  description: {
    type: String,
  },
  picPath: String,
  recommendation: [recommendSchema]
});

restSchema.index({ location: '2dsphere' });

const Rest = mongoose.model('Rest', restSchema);
module.exports = Rest;
