import { Spinner } from "@nextui-org/react";
import React, { useContext, useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessagesContainer from "./MessagesContainer";
import ChatInput from "./ChatInput";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { useFetchFriends } from "../hooks/fetchFriends";
import { fetchCurrentChatInfo } from "../services/chat-services";

const MessagesScreen = () => {
  const { currentChat, messages, isMessagesLoading, messagesError, userChats } =
    useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const { friends } = useFetchFriends(userChats, user);
  const [currentChatInfo, setCurrentChatInfo] = useState(null);

  // Fetch current chat info when currentChat changes
  useEffect(() => {
    const fetchInfo = async () => {
      const info = await fetchCurrentChatInfo(currentChat, user?._id);
      setCurrentChatInfo(info);
    };

    fetchInfo();
  }, [currentChat]);

  // console.log("friend->", friends);

  if (!currentChat) {
    return (
      <p className="w-full flex items-center justify-center">
        No conversion selected yet...
      </p>
    );
  }

  if (isMessagesLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner
          label="Loading messages💬..."
          color="default"
          labelColor="foreground"
        />
      </div>
    );
  }

  // console.log("currentChat -> ", currentChat);
  // console.log("currentChatInfo -> ", currentChatInfo);

  return (
    <div className="w-3/4 flex flex-col justify-between">
      <ChatHeader name={currentChatInfo?.username} />
      <div className="flex-grow flex justify-center mt-[80px]">
        <MessagesContainer />
      </div>
      <ChatInput />
    </div>
  );
};

export default MessagesScreen;
