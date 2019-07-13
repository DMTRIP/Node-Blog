const { Schema } = require('mongoose');
const mongoose = require('mongoose');
// дополнительная провека на уникальность значения поля
const uniqueValidator = require('mongoose-unique-validator');
const parse = require('../../../parse');


const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String, required: true, minLength: 3, maxLength: 40,
  },
  surname: String,
  age: Number,
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    ],
  },
  password: { type: String, required: true, minLength: 8 },
  // type can be user or admin
  type: { type: String, default: 'user' },
  avatar: { type: String },

  // array for populate
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],

  created: { type: String, default: parse.date() },
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);
module.exports = User;
