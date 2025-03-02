const mongoose = require("mongoose");

const loginLogSchema = new mongoose.Schema(
  {
    token: String,
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const LoginLog = mongoose.model("LoginLog", loginLogSchema, "login-logs");

module.exports = LoginLog;
