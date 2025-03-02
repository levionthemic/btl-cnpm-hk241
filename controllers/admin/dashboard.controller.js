const User = require("../../models/user.model");
const Printer = require("../../models/printer.model");
const PrintRequest = require("../../models/printRequest.model");
const LoginLog = require("../../models/loginLog.model");

// [GET] /admin/dashboard
module.exports.index = async (req, res) => {
  try {
    const users = await User.find({ username: { $ne: "admin" } , deleted : false});
    const requests = await PrintRequest.find({ result: "printed"});

    const totalUsers = users.length;
    const totalPrinters = await Printer.countDocuments({deleted : false});
    // const totalRequests = requests.length;

    const totalLogin = await LoginLog.countDocuments({deleted : false});

    let totalPrintTimes = 0;
    let totalPrintedPaper = [
      {
        paperSize: "A0",
        quantity: 0,
      },
      {
        paperSize: "A1",
        quantity: 0,
      },
      {
        paperSize: "A2",
        quantity: 0,
      },
      {
        paperSize: "A3",
        quantity: 0,
      },
      {
        paperSize: "A4",
        quantity: 0,
      },
    ];

    requests.forEach((request) => {
      totalPrintTimes += request.printQuantity;
      totalPrintedPaper[0].quantity += request.stylePaperPrint[0].paperQuantity;
      totalPrintedPaper[1].quantity += request.stylePaperPrint[1].paperQuantity;
      totalPrintedPaper[2].quantity += request.stylePaperPrint[2].paperQuantity;
      totalPrintedPaper[3].quantity += request.stylePaperPrint[3].paperQuantity;
      totalPrintedPaper[4].quantity += request.stylePaperPrint[4].paperQuantity;
    });

    res.render("admin/pages/dashboard/index.pug", {
      pageTitle: "Trang dashboard",
      totalLogin: totalLogin,
      totalPrintTimes: totalPrintTimes,
      totalPrintedPaper: totalPrintedPaper,
      totalPrinters: totalPrinters,
      totalUsers: totalUsers,
    });
  } catch (error) {
    console.log(error);
  }
};
