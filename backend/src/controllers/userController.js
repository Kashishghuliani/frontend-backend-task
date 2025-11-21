exports.getProfile = async (req, res, next) => {
  try {
    const user = req.user;
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const { name, avatarUrl } = req.body;
    if (name) user.name = name;
    if (avatarUrl) user.avatarUrl = avatarUrl;
    await user.save();
    res.json({ user });
  } catch (err) {
    next(err);
  }
};
