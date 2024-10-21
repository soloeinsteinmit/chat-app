import { createContext, useState, useEffect } from "react";
import { fetchChats } from "../services/chat-services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatsError, setChatsError] = useState(null);

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
        console.log("Fetching chats for user ID:", user._id);
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
      } else {
        console.log("User ID is not available.");
      }
    };

    fetchUserChats();
  }, [user]);
  console.log("UserChats:", userChats);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isChatLoading,
        setIsTyping,
        isTyping,
        chatsError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
