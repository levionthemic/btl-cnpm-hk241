const express = require("express");

const controller = require("../../controllers/admin/log.controller");

const routes = express.Router();

routes.get("/", controller.index);
routes.post("/delete/:id", controller.deletePost);

module.exports = routes;