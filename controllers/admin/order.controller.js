const Request = require("../../models/printRequest.model");
const User = require("../../models/user.model");
const Printer = require("../../models/printer.model");

// [GET] /admin/order
module.exports.index = async (req, res) => {
  let requests = await Request.find({});
  const page = parseInt(req.query.page) || 1;
  const mySet = new Set();
  requests.forEach((request) => {
    mySet.add(request.printerId);
  });
  const printerIdDropdownList = [...mySet];
  requests = null;
  let totalPages = 0;
  const printerId = req.query.printerId;
  if (req.query.result && printerId) {
    requests = await Request.find({
      result: req.query.result,
      printerId: printerId,
    });
    totalPages = Math.ceil(requests.length / 20);
    requests = await Request.find({
      result: req.query.result,
      printerId: printerId,
    })
      .skip((page - 1) * 20)
      .limit(20);
  } else if (!req.query.result && printerId) {
    requests = await Request.find({ printerId: printerId });
    totalPages = Math.ceil(requests.length / 20);
    requests = await Request.find({ printerId: printerId })
      .skip((page - 1) * 20)
      .limit(20);
  } else if (req.query.result && !printerId) {
    requests = await Request.find({ result: req.query.result });
    totalPages = Math.ceil(requests.length / 20);
    requests = await Request.find({ result: req.query.result })
      .skip((page - 1) * 20)
      .limit(20);
  } else {
    requests = await Request.find({});
    totalPages = Math.ceil(requests.length / 20);
    requests = await Request.find({})
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

  const mapUser = async (requests) => {
    const users = await Promise.all(
      requests.map((request) => User.findOne({ token: request.token }))
    );
    return users;
  };

  const users = await mapUser(requests);
  res.render("admin/pages/order/index.pug", {
    pageTitle: "Quản lý đơn đặt in",
    requests: requests,
    users: users,
    printPageSize: printPageSize,
    page: page,
    totalPages: totalPages,
    printerIdDropdownList: printerIdDropdownList,
  });
};

// [PATCH] /admin/order/success/:id
module.exports.success = async (req, res) => {
  try {
    const request = await Request.findOne({ _id: req.params.id });
    await Printer.updateOne(
      {
        printerId: request.printerId,
      },
      {
        status: "standby",
      }
    );
    await Request.updateOne(
      {
        _id: req.params.id,
      },
      {
        result: "printed",
      }
    );
    req.flash("success", "Cập nhật kết quả in thành công!");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Cập nhật kết quả in thất bại!");
    res.redirect("back");
  }
};

// [PATCH] /admin/order/fail/:id
module.exports.fail = async (req, res) => {
  try {
    const request = await Request.findOne({ _id: req.params.id });
    await Printer.updateOne(
      {
        printerId: request.printerId,
      },
      {
        status: "standby",
      }
    );
    await Request.updateOne(
      {
        _id: req.params.id,
      },
      {
        result: "failed",
      }
    );
    let slotPrintUsed = 0;
    slotPrintUsed += request.stylePaperPrint[0].paperQuantity * 16;
    slotPrintUsed += request.stylePaperPrint[1].paperQuantity * 8;
    slotPrintUsed += request.stylePaperPrint[2].paperQuantity * 4;
    slotPrintUsed += request.stylePaperPrint[3].paperQuantity * 2;
    slotPrintUsed += request.stylePaperPrint[4].paperQuantity * 1;

    const user = await User.findOne({ token: request.token });
    await User.updateOne(
      {
        token: request.token,
      },
      {
        printPage: user.printPage + slotPrintUsed,
      }
    );
    req.flash("success", "Cập nhật kết quả in thành công!");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Cập nhật kết quả in thất bại!");
    res.redirect("back");
  }
};
