import { useEffect } from "react";
import { baseUrl } from "./services";
import axios from "axios";

/**
 * Gets all chats where the user with the given `userId` is in the members array.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object[]>} A promise that resolves with an array of chat
 * objects or an error message.
 */
const fetchChats = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/chats/${userId}`);

    // return response
    return response.data;
  } catch (error) {
    return error.message;
  }
};

const fetchCurrentChatInfo = async (currentChat, userId) => {
  if (!currentChat) {
    // console.log("currentChat is null");
    return null;
  }

  try {
    const ids = currentChat.members;

    // Find the other member ID that is not equal to the userId
    const otherMemberId = ids.find((id) => id !== userId);

    // If no other member ID is found, return null
    if (!otherMemberId) {
      console.log("No other member found in the current chat");
      return null;
    }

    // Fetch the other member's data
    const response = await axios.get(
      `${baseUrl}/users/getUser/${otherMemberId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching current chat info:", error);
    return null;
  }
};
/**
 * Retrieves the latest message for a given chat.
 *
 * @param {Object} chat - The chat object containing the chat ID.
 *
 * @returns {Promise<Object>} A promise that resolves with the latest message
 * object or logs an error if the request fails.
 */
const getLastestMessage = async (chat) => {
  try {
    const response = await axios.get(`${baseUrl}/messages/${chat?._id}`);
    console.log(chat?._id);
    console.log("response -> ", response.data);

    if (response.error) return console.log(response.error);

    return response.data[response?.data.length - 1];
  } catch (error) {
    console.log(error);
  }
};
export { fetchChats, fetchCurrentChatInfo, getLastestMessage };
