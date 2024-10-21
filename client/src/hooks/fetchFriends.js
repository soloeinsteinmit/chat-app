import { useEffect, useState } from "react";
import { baseUrl } from "../services/services";
import axios from "axios";

/**
 * Fetches information about the friends of the user from the userChats data.
 * @param {Object[]} userChats - An array of user chats.
 * @param {Object} user - The user object.
 * @returns {Object} An object containing the list of friends and any error that occurred during fetching.
 */
export const useFetchFriends = (userChats, user) => {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      // Check if userChats is not an array
      if (!userChats || !Array.isArray(userChats)) return;

      try {
        // Fetch friends for each user in userChats
        const friendsData = await Promise.all(
          userChats.map(async (chat) => {
            const friendId = chat.members.find((id) => id !== user._id);
            if (!friendId) return null;

            const response = await axios.get(
              `${baseUrl}/users/getUser/${friendId}`
            );
            return response.data;
          })
        );

        // Filter out any `null` values that may have been returned
        setFriends(friendsData.filter((friend) => friend !== null));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchFriends();
  }, [userChats, user._id]);

  return { friends, error };
};
