const User = require("../../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.redirect("/user/login");
  } else {
    const user = await User.findOne({ token: token });
    if (!user) {
      res.redirect("/user/login");
    } else {
      if (user.username == "admin") {
        res.redirect("/user/logout");
      } else {
        res.locals.user = user;
        next();
      }
    }
  }
};
