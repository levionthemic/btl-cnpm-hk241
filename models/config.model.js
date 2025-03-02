const mongoose = require("mongoose");

const configSchema = new mongoose.Schema(
  {
    defaultPageQuantity: {
      type: Number,
      default: 50
    },
    permittedFileTypes: Array,
  },
  {
    timestamps: true,
  }
);

const Config = mongoose.model("Config", configSchema, "config");

module.exports = Config;
