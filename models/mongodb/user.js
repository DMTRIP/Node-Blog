// mongoose model of user
const User = require('./mongoose-models/user');
require('../../config/mongodb-config');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

// get cursor on all users
exports.all = async () => await User.find().exec();

exports.findOneById = async id => await User.findById(id);

exports.create = async data  => {
  const { name, email, password } = data;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    password,
    avatar: '/uploads/default-images/profiledefault.png',
  });

  return user.save();
};

exports.update = (id, update) => User.updateOne({ _id: ObjectId(id) }, update);

exports.delete = id => User.deleteOne({ _id: ObjectId(id) });

