const User = require('../../models/mongodb/user');

exports.get_one_user_get = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOneById(id)
    .catch((err) => { if (err) return res.status(404).json({ massage: 'user not found' }); });

  res.status(200).json({ user });
};
