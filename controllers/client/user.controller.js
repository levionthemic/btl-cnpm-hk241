const User = require("../../models/user.model");
const PrintRequest = require("../../models/printRequest.model");
const LoginLog = require("../../models/loginLog.model");
const Printer = require("../../models/printer.model");
const CryptoJS = require("crypto-js");

// [GET] /user/login
module.exports.login = async (req, res) => {
  if (req.cookies.token) {
    const user = await User.findOne({ token: req.cookies.token });
    if (user) {
      res.redirect("/home");
      return;
    }
  }

  res.render("client/pages/user/login.pug", {
    pageTitle: "Đăng nhập",
    noHeader: true,
  });
};

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    username: username,
    deleted: false,
  });

  if (!user) {
    req.flash("error", "Tài khoản không tồn tại!");
    res.redirect("back");
    return;
  }

  var bytes = CryptoJS.AES.decrypt(user.password, "secretkey");
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  if (originalText !== password) {
    req.flash("error", "Mật khẩu không đúng!");
    res.redirect("back");
    return;
  }

  res.cookie("token", user.token);

  if (username === "admin") {
    res.redirect("/admin/dashboard");
  } else {
    await User.updateOne(
      { token: user.token },
      { loginTimes: user.loginTimes + 1 }
    );
    const newLoginLog = new LoginLog({ token: user.token });
    await newLoginLog.save();
    res.redirect("/home");
  }
};

// [GET] /user/signup
module.exports.signup = async (req, res) => {
  if (req.cookies.token) {
    const user = await User.findOne({ token: req.cookies.token });
    if (user) {
      res.redirect("/home");
      return;
    }
  }

  res.render("client/pages/user/signup.pug", {
    pageTitle: "Đăng ký",
    noHeader: true,
  });
};

// [POST] /user/signup
module.exports.signupPost = async (req, res) => {
  const { password } = req.body;

  const newUser = { ...req.body };
  newUser.password = CryptoJS.AES.encrypt(password, "secretkey").toString();

  try {
    const user = new User(newUser);
    await user.save();

    req.flash("success", "Đăng kí thành công!");
    res.redirect("/user/login");
  } catch (error) {
    console.log(error);
    req.flash("success", "Đăng kí thất bại!");
    res.redirect("back");
  }
};

// [GET] /user/logout
module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/user/login");
};

// [GET] /user/log-order
module.exports.logOrder = async (req, res) => {
  const result = req.query.result;

  const page = parseInt(req.query.page) || 1;
  let requests = [];
  let totalPages = 0;
  if (result) {
    requests = await PrintRequest.find({
      token: req.cookies.token,
      result: result,
    });
    totalPages = Math.ceil(requests.length / 20);
    requests = await PrintRequest.find({
      token: req.cookies.token,
      result: result,
    })
      .skip((page - 1) * 20)
      .limit(20);
  } else {
    requests = await PrintRequest.find({
      token: req.cookies.token,
    });
    totalPages = Math.ceil(requests.length / 20);
    requests = await PrintRequest.find({
      token: req.cookies.token,
    })
      .skip((page - 1) * 20)
      .limit(20);
  }

  let printPageSize = [];
  requests.forEach((request) => {
    let temp = "";
    temp += "A0 : " + String(request.stylePaperPrint[0].paperQuantity) + " | ";
    temp += "A1 : " + String(request.stylePaperPrint[1].paperQuantity) + " | ";
    temp += "A2 : " + String(request.stylePaperPrint[2].paperQuantity) + " | ";
    temp += "A3 : " + String(request.stylePaperPrint[3].paperQuantity) + " | ";
    temp += "A4 : " + String(request.stylePaperPrint[4].paperQuantity);
    printPageSize.push(temp);
  });
  Promise.all(
    requests.map((request) => Printer.findOne({ printerId: request.printerId }))
  ).then((printers) => {
    res.render("client/pages/user/log-order.pug", {
      pageTitle: "Lịch sử đặt in",
      requests: requests,
      printPageSize: printPageSize,
      printers: printers,
      page: page,
      totalPages: totalPages,
    });
  });
};

// [GET] /user/my-account
module.exports.getMyAccount = async (req, res) => {
  const userInfo = await User.findOne({ token: req.cookies.token });
  var bytes = CryptoJS.AES.decrypt(userInfo.password, "secretkey");
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  userInfo.password = originalText;

  res.render("client/pages/user/my-account.pug", {
    pageTitle: "Hồ sơ tài khoản",
    userInfo: userInfo,
  });
};

// [PATCH] /user/my-account/update
module.exports.update = async (req, res) => {
  try {
    const { password } = req.body;

    const newUser = { ...req.body };
    newUser.password = CryptoJS.AES.encrypt(password, "secretkey").toString();
    console.log(newUser);
    await User.updateOne({ token: req.cookies.token }, newUser);
    req.flash("success", "Cập nhật thành công!");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Cập nhật thất bại!");
    res.redirect("back");
  }
};
