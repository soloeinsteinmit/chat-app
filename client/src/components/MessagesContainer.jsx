import React, { useContext, useEffect, useRef } from "react";
import SenderChatCard from "./SenderChatCard";
import ReceiverChatCard from "./ReceiverChatCard";
import { ChatContext } from "../context/ChatContext";
import { Spinner } from "@nextui-org/react";

import { AuthContext } from "../context/AuthContext";
import { formatTimestamp } from "../utils/utils";

const MessagesContainer = () => {
  const { messages, isMessagesLoading, messagesError } =
    useContext(ChatContext);
  const { user } = useContext(AuthContext);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    /**
     * Smoothly scrolls the messages container to the bottom.
     * @function
     */
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    scrollToBottom();
  }, [messages]);

  // console.log("messages->", messages);
  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 items-start justify-end">
      {isMessagesLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Spinner size="lg" color="currentColor" />
        </div>
      ) : messagesError ? (
        <div className="w-full flex items-center justify-center text-red-500">
          <p>Error loading messages: {messagesError}</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="w-full flex items-center justify-center text-gray-500">
          <p>You don’t have any messages with this user yet.</p>
        </div>
      ) : (
        <>
          {messages.map((message, index) =>
            message?.senderId === user._id ? (
              <SenderChatCard
                key={index}
                message={message.message}
                timestamp={formatTimestamp(message.createdAt)}
              />
            ) : (
              <ReceiverChatCard
                key={index}
                message={message.message}
                timestamp={formatTimestamp(message.createdAt)}
              />
            )
          )}
        </>
      )}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default MessagesContainer;
