const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const parse = require('../../parse');


const likeSchema = Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  item: { type: Schema.Types.ObjectId, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  created: { type: String, default: parse.date() },
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
