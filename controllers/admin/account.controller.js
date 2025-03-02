const User = require("../../models/user.model");

// [GET] /admin/account
module.exports.index = (req, res) => {
  res.render("admin/pages/account/index.pug", {
    pageTitle: "Trang tài khoản"
  })
  
}

// [PATCH] /admin/account/update
module.exports.update = async (req, res) => {
  const { address, phone, email, avatar } = req.body;

  try {
    await User.updateOne({
      _id: res.locals.user.id
    }, {
      address: address,
      phoneNumber: phone,
      email: email,
      avatar: avatar
    });
    req.flash("success", "Cập nhật thành công!");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Cập nhật thất bại");
    res.redirect("back");
  }
  
}

