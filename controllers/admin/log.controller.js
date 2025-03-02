const LoginLog = require("../../models/loginLog.model");
const User = require("../../models/user.model");

// [GET] /admin/log
module.exports.index = async (req, res) => {
  const page = parseInt(req.query.page) || 1;

  const usersTotal = await User.find({ username: { $ne: "admin" } });

  const loginLogs = await LoginLog.find({ deleted: false });
  // .skip((page - 1) * 20)
  // .limit(20);

  let todayLoginCount = 0;
  let inMonthLoginCount = 0;
  let userInMonth = [];
  let userToday = [];
  loginLogs.forEach((loginLog) => {
    const dateString = loginLog.createdAt;
    const date = new Date(dateString);
    const today = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (
      day == today.getDate() &&
      month == today.getMonth() + 1 &&
      year == today.getFullYear()
    ) {
      userToday.push(loginLog);
      todayLoginCount++;
    }
    if (month == today.getMonth() + 1 && year == today.getFullYear()) {
      userInMonth.push(loginLog);
      inMonthLoginCount++;
    }
  });

  // console.log(day, month, year);
  let result = [];
  const time = req.query.time;
  if (time) {
    if (time == "month") {
      result = userInMonth;
    } else {
      result = userToday;
    }
  } else {
    result = loginLogs;
  }

  const totalPages = Math.ceil(result.length / 20);

  result = result.slice((page - 1) * 20 , page * 20 );
  
  Promise.all(
    result.map((loginLog) => User.findOne({ token: loginLog.token }))
  ).then((users) => {
    res.render("admin/pages/log/index.pug", {
      pageTitle: "Trang lịch sử đăng nhập",
      users: users,
      usersTotal: usersTotal,
      loginLogs: result,
      page: page,
      totalPages: totalPages,
      todayLoginCount: todayLoginCount,
      inMonthLoginCount: inMonthLoginCount,
    });
  });
};

// [POST] /admin/log/delete/:id
module.exports.deletePost = async (req, res) => {
  try {
    await LoginLog.updateOne({ _id: req.params.id }, { deleted: true });
    req.flash("success", "Xoá thành công");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Xóa thất bại");
    res.redirect("back");
  }
};
