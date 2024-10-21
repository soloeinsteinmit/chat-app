const express = require("express");
const {
  createChat,
  getUserChats,
  findChat,
} = require("../controllers/chatController");

const router = express.Router();

// create chat
router.post("/", createChat);

// get user chats
router.get("/:userId", getUserChats);

// find chat
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;
