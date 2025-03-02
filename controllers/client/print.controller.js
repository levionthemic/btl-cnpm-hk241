const Printer = require("../../models/printer.model");
const User = require("../../models/user.model");
const PrintRequest = require("../../models/printRequest.model");

// [GET] /print
module.exports.index = (req, res) => {
  res.render("client/pages/print/index.pug", {
    pageTitle: "Tạo in ấn",
  });
};

// [GET] /print/create
module.exports.create = async (req, res) => {
  const printers = await Printer.find({ status: "standby", power: "on" });
  res.render("client/pages/print/create.pug", {
    pageTitle: "Trang tạo in ấn",
    printers: printers,
    num_page: 0,
    bonus_price: 6000,
    total_price: 0,
  });
};

// [GET] /print/buy-paper
module.exports.buyPaper = (req, res) => {
  res.render("client/pages/print/buy-paper.pug", {
    pageTitle: "Mua lượt in",
  });
};

// [POST] /print/create
module.exports.createPost = async (req, res) => {
  try {
    const typePrint = req.body.printtype;
    const printSide = req.body.side;
    const printerId = req.body["print-machine"];
    const pageSize = req.body.size;
    const printQuantity = req.body.copy;
    const file = req.file.path;

    const stylePaperPrint = [
      {
        paperSize: "A0",
        paperQuantity: 0,
      },
      {
        paperSize: "A1",
        paperQuantity: 0,
      },
      {
        paperSize: "A2",
        paperQuantity: 0,
      },
      {
        paperSize: "A3",
        paperQuantity: 0,
      },
      {
        paperSize: "A4",
        paperQuantity: 0,
      },
    ];
    stylePaperPrint[parseInt(pageSize.split("")[1])].paperQuantity =
      req.body.pagenum * printQuantity;

    let slotPrintLeft = req.body.pagenum * printQuantity;
    switch (pageSize) {
      case "A0":
        slotPrintLeft *= 16;
        break;
      case "A1":
        slotPrintLeft *= 8;
        break;
      case "A2":
        slotPrintLeft *= 4;
        break;
      case "A3":
        slotPrintLeft *= 2;
        break;
      default:
        slotPrintLeft *= 1;
        break;
    }

    if (slotPrintLeft > res.locals.user.printPage) {
      req.flash("error", "Không đủ lượt in! Mời bạn nạp thêm lượt in");
      res.redirect("back");
      return;
    }

    await User.updateOne(
      { token: req.cookies.token },
      { printPage: res.locals.user.printPage - slotPrintLeft }
    );

    const newPrintRequest = new PrintRequest({
      typePrint,
      printSide,
      printerId,
      pageSize,
      printQuantity,
      file,
      stylePaperPrint,
      token: req.cookies.token,
      result: "printing",
    });

    await newPrintRequest.save();

    await Printer.updateOne(
      {
        printerId: printerId,
      },
      {
        status: "using",
      }
    );

    req.flash("success", "Tạo in thành công!");
    res.redirect("/home");
  } catch (error) {
    req.flash("error", "Tạo in thất bại!");
    res.redirect("back");
  }
};

// [POST] /print/buy-paper/post-buypaper
module.exports.postBuypaper = async (req, res) => {
  try {
    const totalPage = req.body.totalPage;
    if (!totalPage) {
      req.flash("error", "Thông tin số trang không hợp lệ.");
      res.redirect("/checkout/buy-paper");
      return;
    }

    const user = await User.findOne({ token: req.cookies.token });
    await User.updateOne(
      { token: req.cookies.token },
      { printPage: user.printPage + parseInt(totalPage) }
    );

    req.flash(
      "success",
      `Cập nhật thành công! Số trang in hiện tại: ${
        user.printPage + parseInt(totalPage)
      }`
    );
    res.redirect("/home");
  } catch (error) {
    req.flash("error", "Có lỗi xảy ra. Vui lòng thử lại.");
    res.redirect("/checkout/buy-paper");
  }
};
