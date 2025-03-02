const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const uploadCloudinary = require("../../helpers/uploadCloudinary");

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
// End Cloudinary

module.exports.upload = async (req, res, next) => {
  if (req.file) {
    req.body[req.file.fieldname] = await uploadCloudinary(req.file.buffer);
  }
  next();
};
