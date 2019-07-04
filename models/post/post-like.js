const { Schema, model } = require("mongoose");

const likeSchema = Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  postId: { type: Schema.Types.ObjectId, required: true },
  author: { type: Schema.Types.ObjectId, required: true }
});

const Like = model("Lies", likeSchema);
module.exports = Like;
