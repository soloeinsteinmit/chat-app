import React from "react";
import SenderChatCard from "./SenderChatCard";
import ReceiverChatCard from "./ReceiverChatCard";

const MessagesContainer = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col items-start justify-end">
      <SenderChatCard />
      <ReceiverChatCard />
      <ReceiverChatCard message="What was the content of the message?😒" />
      <SenderChatCard message="After investigating the issue, I found the bug was due to a race condition in the asynchronous data fetching process. To fix this, I implemented a mutex lock to ensure data integrity and prevent the race condition from occurring again." />
    </div>
  );
};

export default MessagesContainer;
