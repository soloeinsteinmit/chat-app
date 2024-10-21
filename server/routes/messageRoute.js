const express = require("express");
const {
  createMessage,
  getMessages,
} = require("../controllers/messageController");

const router = express.Router();

// create message
router.post("/", createMessage);

// get messages
router.get("/:chatId", getMessages);

module.exports = router;
