const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recommendSchema = new Schema({
  restName: String,
  author: String,
  category: {
    type: [String],
    enum: ["pizza", "burger", "vegan", "sushi", "german", "indian", "thai", "vietnamese", "craft beer", "others"],
  },
  comment: String,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Recommend = mongoose.model('Recommend', recommendSchema);
module.exports = Recommend;
