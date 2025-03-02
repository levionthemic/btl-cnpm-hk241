const express = require("express");

const controller = require("../../controllers/admin/printer.controller");
const uploadCloud = require("../../middlewares/client/uploadCloud.middleware");

const multer = require("multer");
const upload = multer();

const routes = express.Router();

routes.get("/", controller.index);
routes.get("/create", controller.create);
routes.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  controller.createPost
);

routes.get("/edit/:id", controller.edit);
routes.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  controller.editPatch
);

routes.post("/delete/:id", controller.deletePost);

module.exports = routes;
