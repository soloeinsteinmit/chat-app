const mongoose = require("mongoose");

// Message schema
const messageSchema = new mongoose.Schema(
  {
    chatId: String,
    senderId: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model("Message", messageSchema);

module.exports = messageModel;
