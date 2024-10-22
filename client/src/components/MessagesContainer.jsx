import React, { useContext } from "react";
import SenderChatCard from "./SenderChatCard";
import ReceiverChatCard from "./ReceiverChatCard";
import { ChatContext } from "../context/ChatContext";
import { Spinner } from "@nextui-org/react";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";

const MessagesContainer = () => {
  const formatTimestamp = (createdAt) => {
    const now = moment();
    const messageDate = moment(createdAt);

    if (messageDate.isSame(now, "day")) {
      // Same day - show "Today, 10:30 AM"
      return `Today, ${messageDate.format("h:mm A")}`;
    } else if (messageDate.isSame(now.subtract(1, "day"), "day")) {
      // Previous day - show "Yesterday, 10:30 AM"
      return `Yesterday, ${messageDate.format("h:mm A")}`;
    } else if (messageDate.isSame(now, "week")) {
      // Same week - show day of the week, e.g. "Tuesday, 10:30 AM"
      return `${messageDate.format("dddd")}, ${messageDate.format("h:mm A")}`;
    } else {
      // Older messages - show full date, e.g. "Sep 18, 2024, 10:30 AM"
      return messageDate.format("MMM D, YYYY, h:mm A");
    }
  };

  const { currentChat, messages, isMessagesLoading, messagesError } =
    useContext(ChatContext);
  const { user } = useContext(AuthContext);

  console.log("messages->", messages);
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
    </div>
  );
};

export default MessagesContainer;
