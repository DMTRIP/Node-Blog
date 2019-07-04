const { Schema, model } = require("mongoose");

const commentSchema = Schema({
  _id: Schema.Types.ObjectId,
  postId: { type: Schema.Types.Object, ref: "Post" },
  // id user which left comment
  author: { type: Schema.Types.Object, ref: "User" },
  // user comment
  massage: { type: String, minLength: 10, maxLength: 500 }
});

const Comment = model("Comment", commentSchema);
module.exports = Comment;
