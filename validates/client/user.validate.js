const { isValidDate, isValidPhoneNumber } = require("../../helpers/validate");
const User = require("../../models/user.model");

module.exports.signupPost = async (req, res, next) => {
  const { username, birthday, address, phone, password, confirmPassword, avatar } =
    req.body;

  const user = await User.findOne({ username: username });
  if (user) {
    req.flash("error", "Username đã tồn tại!");
    res.redirect("back");
    return;
  }
  
  if (!isValidDate(birthday)) {
    req.flash("error", "Ngày sinh không hợp lệ!");
    res.redirect("back");
    return;
  }

  if (!isValidPhoneNumber(phone)) {
    req.flash("error", "Số điện thoại không hợp lệ!");
    res.redirect("back");
    return;
  }

  if (password !== confirmPassword) {
    req.flash("error", "Xác nhận mật khẩu không trùng khớp!");
    res.redirect("back");
    return;
  }

  next();
}