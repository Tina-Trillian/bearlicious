const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Rest = require("../models/Restaurant")

const recommendSchema = new Schema({
  restName: String,
  author: String,
  comment: String,
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  restId: {
    type: Schema.Types.ObjectId,
    ref: "Rest"
  }
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Recommend = mongoose.model('Recommend', recommendSchema);
module.exports = Recommend;
