const express = require("express");

const controller = require("../../controllers/client/checkout.controller");

const routes = express.Router();

routes.get("/buy-paper", controller.buyPaperIndex);
routes.get("/print-request", controller.printRequestIndex);

module.exports = routes;