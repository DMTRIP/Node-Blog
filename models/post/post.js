const { Schema, model } = require("mongoose");

const postSchema = Schema({
   _id: {type: Schema.Types.ObjectId, required: true},
    // id user which send post
    author: {type: Schema.Types.ObjectId, required: true,},
    title: String,
    description: {type: String, maxLength: 600},
    // category tags for post
    tags: [String],
    preview: Buffer,
    authorAvatar: Buffer,
    created: {type: Date, default: Date.now()},
});

const Post = model('Post',postSchema);
module.exports = Post;