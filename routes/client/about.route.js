const express = require("express");

const controller = require("../../controllers/client/about.controller");

const routes = express.Router();

routes.get("/", controller.index);

module.exports = routes;