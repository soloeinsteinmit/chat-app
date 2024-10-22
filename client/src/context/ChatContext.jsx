import { createContext, useState, useEffect, useCallback } from "react";
import { fetchChats } from "../services/chat-services";
import axios from "axios";
import { baseUrl } from "../services/services";
import { io } from "socket.io-client";

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
  const [sendMessageError, setSendMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  //initalize socket
  useEffect(() => {
    const newSocket = io("http://localhost:1234");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  // add online users to socket
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);
  // console.log("online users -> ", onlineUsers);

  // send message to socket
  useEffect(() => {
    if (socket === null) return;

    // check for receiver of the message
    const receiverId = currentChat?.members?.find((id) => id !== user._id);

    socket.emit("sendMessage", { ...newMessage, receiverId });
  }, [newMessage]);

  // console.log("newMessage -> ", newMessage);

  //receive message from socket
  useEffect(() => {
    if (socket === null) return;
    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res?.chatId) {
        return;
      }
      setMessages((prevMessages) => [...prevMessages, res]);
    });
    return () => {
      socket.off("getMessage");
    };
  }, [socket, currentChat]);

  useEffect(() => {
    if (socket === null || currentChat === null) return;

    const receiverId = currentChat.members.find((id) => id !== user._id);
    socket.emit("chatOpened", { chatId: currentChat._id, receiverId });
  }, [currentChat, socket]);

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
    /**
     * Fetches all messages for the currently selected chat from the server.
     * Sets the isMessagesLoading state to true while the request is in progress.
     * If the request is successful, it sets the messages state to the response data.
     * If the request fails, it sets the messagesError state to the error message.
     * In any case, it sets the isMessagesLoading state to false when the request is complete.
     */
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

  const sendMessage = useCallback(
    async (currentChatId, senderId, inputMessage, setInputMessage) => {
      if (!inputMessage) return console.log("Please enter a message");

      const response = await axios.post(`${baseUrl}/messages`, {
        chatId: currentChatId,
        senderId: senderId,
        message: inputMessage,
      });

      if (response.error) return setSendMessageError(response.error);

      setNewMessage(response.data);
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setInputMessage("");
    },
    []
  );

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
        sendMessage,
        sendMessageError,
        newMessage,
        socket,
        onlineUsers,
        setCurrentChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
