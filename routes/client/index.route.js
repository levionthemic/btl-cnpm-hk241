const homeRoutes = require("./home.route");
const userRoutes = require("./user.route");
const aboutRoutes = require("./about.route");
const printRoutes = require("./print.route");
const checkoutRoutes = require("./checkout.route");

const authMiddleware = require("../../middlewares/client/auth.middleware");

module.exports = (app) => {
  app.use("/home", authMiddleware.requireAuth, homeRoutes);
  app.use("/user", userRoutes);
  app.use("/about", authMiddleware.requireAuth, aboutRoutes);
  app.use("/print", authMiddleware.requireAuth, printRoutes);
  app.use("/checkout", authMiddleware.requireAuth, checkoutRoutes);
};
