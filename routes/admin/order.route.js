const express = require("express");

const controller = require("../../controllers/admin/order.controller");

const routes = express.Router();

routes.get("/", controller.index);
routes.patch("/success/:id" , controller.success);
routes.patch("/fail/:id" , controller.fail);
module.exports = routes;