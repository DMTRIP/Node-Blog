// mongoose model of user
require('../config/mongodb-config');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./schemas/user');


const { ObjectId } = mongoose.Types;

// get cursor on all users
exports.all = async () => await User.find().exec();

exports.findOneById = async id => await User.findById(id).select('-password');

exports.create = async (data) => {
  const { name, email, password } = data;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    password,
    avatar: '/uploads/default-images/profiledefault.png',
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  return user.save();
};

exports.update = (id, update) => User.updateOne({ _id: ObjectId(id) }, update);

exports.delete = id => User.deleteOne({ _id: ObjectId(id) });

exports.findOneByEmail = async email => await User.findOne({ email });

exports.findByEmailAndPassword = async (email, password) => await User.findOne({ email, password });
