import { createContext, useState, useEffect, useCallback } from "react";
import { fetchChats } from "../services/chat-services";
import axios from "axios";
import { baseUrl } from "../services/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatsError, setChatsError] = useState(null);
  const [potentialFriends, setPotentialFriend] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);

  useEffect(() => {
    /**
     * Fetches all users and filters out the ones that are already in any of the
     * userChats. The result is stored in the potentialFriends state.
     * @returns {Promise<void>} A promise that resolves when the request is completed
     * or an error message if the request fails.
     */
    const getUsers = async () => {
      try {
        // Get all users
        setLoadingFriends(true);
        const response = await axios.get(`${baseUrl}/users`);

        if (response.error) {
          setLoadingFriends(false);
          return response || console.log("Error fetching users");
        }

        // Use response.data to filter
        const potentialFriend = response.data.filter((u) => {
          // Skip the current user
          if (user._id === u._id) return false;

          // Check if the user is already in any of the userChats
          const isFriend = userChats?.some((chat) =>
            chat.members.includes(u._id)
          );

          return !isFriend;
        });

        setPotentialFriend(potentialFriend);
        setLoadingFriends(false);
      } catch (error) {
        setLoadingFriends(false);
        return error.message;
      }
    };

    getUsers();
  }, [userChats]);

  useEffect(() => {
    /**
     * Fetches the chats for the current user.
     * If the user ID is not available, it logs a message to the console.
     * If the user ID is available, it sets the isChatLoading state to true,
     * fetches the chats using fetchChats, and sets the userChats state to the
     * response. If the response contains an error, it sets the chatsError state
     * to the error message. If there is an error during the fetch, it sets
     * the chatsError state to the error message.
     */
    const fetchUserChats = async () => {
      if (user?._id) {
        setIsChatLoading(true);
        setChatsError(null);
        try {
          const response = await fetchChats(user._id);

          if (response.error) {
            setChatsError(response);
            setIsChatLoading(false);
          } else {
            setUserChats(response);
            setIsChatLoading(false);
          }
        } catch (error) {
          setChatsError(error.message);
          setIsChatLoading(false);
        }
      }
    };

    fetchUserChats();
  }, [user]);

  useEffect(() => {
    const fetchMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);
      try {
        const response = await axios.get(
          `${baseUrl}/messages/${currentChat?._id}`
        );

        if (response.error) {
          setMessagesError(response);
          setIsMessagesLoading(false);
        } else {
          setMessages(response.data);
          setIsMessagesLoading(false);
        }
      } catch (error) {
        setMessagesError(error.message);
        setIsMessagesLoading(false);
      }
    };

    fetchMessages();
  }, [currentChat]);

  console.log("messages --->", messages);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  // console.log("currentChat --->", currentChat);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await axios.post(`${baseUrl}/chats`, {
      firstId,
      secondId,
    });

    if (response.error) return response;

    setUserChats((prevChats) => [...prevChats, response.data]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isChatLoading,
        setIsTyping,
        isTyping,
        chatsError,
        potentialFriends,
        loadingFriends,
        createChat,
        updateCurrentChat,
        currentChat,
        messages,
        isMessagesLoading,
        messagesError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
