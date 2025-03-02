const express = require("express");

const controller = require("../../controllers/admin/account.controller");
const uploadCloud = require("../../middlewares/client/uploadCloud.middleware");

const multer = require("multer");
const upload = multer();

const routes = express.Router();

routes.get("/", controller.index);

routes.patch("/update", 
  upload.single("avatar"),
  uploadCloud.upload, 
  controller.update
);

module.exports = routes;