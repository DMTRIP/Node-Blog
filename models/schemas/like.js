const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const parse = require('../../parse');


const likeSchema = Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  postId: { type: Schema.Types.ObjectId, required: true },
  author: { type: Schema.Types.ObjectId, required: true },
  created: { type: String, default: parse.date() },
});

const Like = mongoose.model('Lies', likeSchema);
module.exports = Like;
