const Config = require("../../models/config.model");

// [GET] /admin/config
module.exports.index = async (req, res) => {
  const config = await Config.findOne({});

  res.render("admin/pages/config/index.pug", {
    pageTitle: "Quản lý cấu hình",
    config: config
  })
}
