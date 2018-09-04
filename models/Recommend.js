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

const Recommend = mongoose.model('Recommend', recommendSchema);
module.exports = Recommend;
