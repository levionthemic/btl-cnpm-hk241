const dashboardRoutes = require("./dashboard.route");
const accountRoutes = require("./account.route");
const configRoutes = require("./config.route");
const logRoutes = require("./log.route");
const orderRoutes = require("./order.route");
const printerRoutes = require("./printer.route");
const userRoutes = require("./user.route");
const systemConfig = require("../../config/system");

const { requireAuth } = require("../../middlewares/admin/auth.middleware");

module.exports = (app) => {
  app.use(requireAuth);

  app.use(systemConfig.prefixAdmin + "/dashboard", dashboardRoutes);
  app.use(systemConfig.prefixAdmin + "/account", accountRoutes);
  app.use(systemConfig.prefixAdmin + "/config", configRoutes);
  app.use(systemConfig.prefixAdmin + "/log", logRoutes);
  app.use(systemConfig.prefixAdmin + "/order", orderRoutes);
  app.use(systemConfig.prefixAdmin + "/printer", printerRoutes);
  app.use(systemConfig.prefixAdmin + "/user", userRoutes);
}

