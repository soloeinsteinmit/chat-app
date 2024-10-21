const messageModel = require("../models/messageModel");

/**
 * Creates a new message and saves it in the database.
 *
 * @param {Object} req - The request object containing the chatId, sender, and message.
 * @param {Object} res - The response object to send the created message.
 *
 * @returns {void} Sends a JSON response with the created message or an error message.
 */
const createMessage = async (req, res) => {
  const { chatId, senderId, message } = req.body;
  try {
    // create new message
    const newMessage = new messageModel({
      chatId,
      senderId,
      message,
    });

    // save message
    const savedMessage = await newMessage.save();

    // return saved message
    res.status(200).json(savedMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves all messages from a chat from the database and sends them in the response.
 *
 * @param {Object} req - The request object containing the chatId.
 * @param {Object} res - The response object to send the messages.
 *
 * @returns {void} Sends a JSON response with all messages or an error message.
 */
const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    // find messages
    const messages = await messageModel.find({ chatId });
    // return messages
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createMessage, getMessages };
