const Printer = require("../../models/printer.model");
const systemConfig = require("../../config/system");

// [GET] /admin/printer
module.exports.index = async (req, res) => {
  const status = req.query.status;
  const power = req.query.power;
  const page = parseInt(req.query.page) || 1;
  let printers = null;
  let printersPage = null;
  if (status && power) {
    printersPage = await Printer.find({
      deleted: false,
      status: status,
      power: power,
    })
      .skip((page - 1) * 5)
      .limit(5);
    printers = await Printer.find({
      deleted: false,
      status: status,
      power: power,
    });
  } else if (status && !power) {
    printersPage = await Printer.find({ deleted: false, status: status })
      .skip((page - 1) * 5)
      .limit(5);
    printers = await Printer.find({ deleted: false, status: status });
  } else if (!status && power) {
    printersPage = await Printer.find({ deleted: false, power: power })
      .skip((page - 1) * 5)
      .limit(5);
    printers = await Printer.find({ deleted: false, power: power });
  } else {
    printersPage = await Printer.find({ deleted: false })
      .skip((page - 1) * 5)
      .limit(5);
    printers = await Printer.find({ deleted: false });
  }

  const totalPages = Math.ceil(printers.length / 5);

  const countStandby = await Printer.countDocuments({
    deleted: false,
    status: "standby",
  });
  const countUsing = await Printer.countDocuments({
    deleted: false,
    status: "using",
  });
  const countOn = await Printer.countDocuments({ deleted: false, power: "on" });
  // for (const printer of printers) {
  //   if (printer.status == "standby") {
  //     countStandby++;
  //   } else {
  //     countUsing++;
  //   }
  //   if (printer.power == "on") {
  //     countOn++;
  //   }
  // }

  let printPapers = [];
  printers.forEach((printer) => {
    let temp = "";
    temp += "A0 : " + String(printer.printPapers[0].paperQuantity) + " | ";
    temp += "A1 : " + String(printer.printPapers[1].paperQuantity) + " | ";
    temp += "A2 : " + String(printer.printPapers[2].paperQuantity) + " | ";
    temp += "A3 : " + String(printer.printPapers[3].paperQuantity) + " | ";
    temp += "A4 : " + String(printer.printPapers[4].paperQuantity);
    printPapers.push(temp);
  });
  res.render("admin/pages/printer/index.pug", {
    pageTitle: "Trang quản lý máy in",
    printers: printersPage,
    page: page,
    totalPages: totalPages,
    countStandby: countStandby,
    countOn: countOn,
    countUsing: countUsing,
    printerCount: printers.length,
    printPapers: printPapers,
  });
};

// [GET] /admin/printer/create
module.exports.create = (req, res) => {
  res.render("admin/pages/printer/create.pug", {
    pageTitle: "Thêm máy in",
  });
};

// [POST] /admin/printer/create
module.exports.createPost = async (req, res) => {
  const updatePrinter = { ...req.body};
  
  const printPapers = [
    {
      paperSize: "A0",
      paperQuantity: updatePrinter.A0
    },
    {
      paperSize: "A1",
      paperQuantity: updatePrinter.A1
    },
    {
      paperSize: "A2",
      paperQuantity: updatePrinter.A2
    },
    {
      paperSize: "A3",
      paperQuantity: updatePrinter.A3
    },
    {
      paperSize: "A4",
      paperQuantity: updatePrinter.A4
    },
  ]
  updatePrinter.printPapers = printPapers;
  try {
    const newPrinter = new Printer(updatePrinter);
    await newPrinter.save();

    req.flash("success", "Thêm máy in thành công");
    res.redirect(`${systemConfig.prefixAdmin}/printer?page=1`);
  } catch (error) {
    req.flash("error", "Thêm máy in thất bại");
    res.redirect("back");
  }
};

// [GET] /admin/printer/edit/:id
module.exports.edit = async (req, res) => {
  const printer = await Printer.findOne({ _id: req.params.id });

  res.render("admin/pages/printer/edit.pug", {
    pageTitle: "Cập nhật máy in",
    printer: printer,
  });
};

// [PATCH] /admin/printer/edit/:id
module.exports.editPatch = async (req, res) => {
  const updatePrinter = { ...req.body};
  
  const printPapers = [
    {
      paperSize: "A0",
      paperQuantity: updatePrinter.A0
    },
    {
      paperSize: "A1",
      paperQuantity: updatePrinter.A1
    },
    {
      paperSize: "A2",
      paperQuantity: updatePrinter.A2
    },
    {
      paperSize: "A3",
      paperQuantity: updatePrinter.A3
    },
    {
      paperSize: "A4",
      paperQuantity: updatePrinter.A4
    },
  ]
  updatePrinter.printPapers = printPapers;

  try {
    await Printer.updateOne(
      {
        _id: req.params.id,
      },
      updatePrinter
    );
    req.flash("success", "Cập nhật thành công!");
    res.redirect(`${systemConfig.prefixAdmin}/printer?page=1`);
  } catch (error) {
    req.flash("error", "Cập nhật thất bại!");
    res.redirect("back");
  }
};

// [POST] /admin/printer/delete/:id
module.exports.deletePost = async (req, res) => {
  try {
    await Printer.updateOne(
      {
        _id: req.params.id,
      },
      { deleted: true }
    );
    req.flash("success", "Xóa máy in thành công!");
    res.redirect("back");
  } catch (error) {
    req.flash("success", "Xóa máy in thất bại!");
    res.redirect("back");
  }
};
