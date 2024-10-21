const chatModel = require("../models/chatModel");

/**
 * Creates a new chat between two users if the chat doesn't already exist.
 *
 * @function createChat
 * @param {Object} req - The request object containing the IDs of the two users.
 * @param {Object} res - The response object to send the chat information.
 *
 * @returns {void} Sends a JSON response with the chat information or an error message.
 */
const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    // check if chat already exists
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    // if chat exists, return it
    if (chat) return res.status(200).json(chat);

    // if chat doesn't exist, create it
    const newChat = new chatModel({
      members: [firstId, secondId],
    });

    // save chat
    const savedChat = await newChat.save();

    // return saved chat
    res.status(200).json(savedChat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Finds all chats where the given user ID is in the members array.
 *
 * @function getUserChats
 * @param {Object} req - The request object containing the user ID.
 * @param {Object} res - The response object to send the chat information.
 *
 * @returns {void} Sends a JSON response with an array of chat documents or an error message.
 */
const getUserChats = async (req, res) => {
  const userId = req.params.userId;
  try {
    // find all chats where userId is in the members array
    const chats = await chatModel.find({ members: { $in: [userId] } });

    // return chats
    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    // find chat
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    // return chat
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createChat, getUserChats, findChat };
