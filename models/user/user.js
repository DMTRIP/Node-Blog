const { Schema, model } = require("mongoose");
// дополнительная провека на уникальность значения поля
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {type: String, required: true},
    Surname: String,
    age: Number,
    email: {type: String, required: true, unique: true,
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/]},
    password: { type: String, required: true, minLength: 8},
    avatar: {type: Buffer},

    posts: [{type: Schema.Types.ObjectId, ref:"Post"}]
});

userSchema.plugin(uniqueValidator);

const User = model('User', userSchema);
module.exports = User;
