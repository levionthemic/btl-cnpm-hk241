const mongoose = require("mongoose");
const { generateItemId } = require("../helpers/generate");

const printerSchema = new mongoose.Schema(
  {
    name: String,
    printerId: {
      type: String,
      default: "PR" + generateItemId(6),
      unique: true,
    },
    description: String,
    status: String,
    power: String,
    printPapers: [
      {
        paperSize: String,
        paperQuantity: Number,
      },
    ],
    location: String,
    thumbnail: String,
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Printer = mongoose.model("Printer", printerSchema, "printers");

module.exports = Printer;
