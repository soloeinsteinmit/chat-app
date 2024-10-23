import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { baseUrl } from "../services/services";
import axios from "axios";

export const useFetchLatestMessage = (chat) => {
  const { newMessage, notifications } = useContext(ChatContext);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      const response = await axios.get(`${baseUrl}/messages/${chat?._id}`);
      console.log(chat?._id);
      console.log("response -> ", response);

      if (response.error) return console.log(response.error);

      const lastMessage = response.data[response?.data.length - 1];
      console.log("lastMessage -> ", lastMessage);
      setLatestMessage(lastMessage);
    };

    getMessages();
  }, [newMessage, notifications]);

  return { latestMessage };
};
