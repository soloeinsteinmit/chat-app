import React, { useContext } from "react";
import SenderChatCard from "./SenderChatCard";
import ReceiverChatCard from "./ReceiverChatCard";
import { ChatContext } from "../context/ChatContext";
import { Spinner } from "@nextui-org/react";
import moment from "moment";

const MessagesContainer = () => {
  const { currentChat, messages, isMessagesLoading, messagesError } =
    useContext(ChatContext);

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
          {messages.map((message) => (
            <div key={message._id}>
              <ReceiverChatCard
                message={message.message}
                timestamp={`${moment(message.createdAt).format(
                  "dddd"
                )}, ${moment(message.createdAt).format("h:mm A")}`}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default MessagesContainer;

{
  /* <SenderChatCard />
       <ReceiverChatCard />
      <ReceiverChatCard message="What was the content of the message?😒" />
      <SenderChatCard message="After investigating the issue, I found the bug was due to a race condition in the asynchronous data fetching process. To fix this, I implemented a mutex lock to ensure data integrity and prevent the race condition from occurring again." /> */
}
