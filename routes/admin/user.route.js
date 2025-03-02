const express = require("express");

const controller = require("../../controllers/admin/user.controller");

const routes = express.Router();

routes.get("/", controller.index);
routes.get("/edit/:id", controller.edit);
routes.patch("/edit/:id", controller.editPatch);

routes.post("/delete/:id", controller.deletePost);

module.exports = routes;