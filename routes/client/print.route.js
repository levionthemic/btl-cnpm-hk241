const express = require("express");

const controller = require("../../controllers/client/print.controller");

const multer = require("multer");
const upload = multer({ dest: "./public/uploads" });

const routes = express.Router();

routes.get("/", controller.index);

routes.get("/create", controller.create);

routes.get("/buy-paper", controller.buyPaper);

routes.post("/create", upload.single("filename"), controller.createPost);

routes.post("/buy-paper/post-Buypaper", controller.postBuypaper);

module.exports = routes;
