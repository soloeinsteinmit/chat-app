import { Avatar, Badge } from "@nextui-org/react";
import React, { useContext } from "react";
import { randomImage } from "../utils/avatar-images";
import { ChatContext } from "../context/ChatContext";
import { unreadNotification } from "../utils/unreadNotification";
import { AuthContext } from "../context/AuthContext";
import { useFetchFriends } from "../hooks/fetchFriends";

const ChatCard = ({
  message = "Hello bro",
  name = "CobbyTrade 🤑",
  time = "12mins",
  profileImage = randomImage(),
  props,
  isOnline,
  newMessageCount,
  showNewMessageCount,
  onClick = () => {},
}) => {
  return (
    <div
      className="flex justify-between items-center px-4 py-3 hover:bg-content2 transition active:scale-95"
      onClick={onClick}
      {...props}
    >
      <div className="flex items-center justify-start gap-2">
        <Badge
          content=""
          color={isOnline}
          shape="circle"
          placement="bottom-right"
          size="sm"
        >
          <Avatar radius="full" src={profileImage} />
        </Badge>
        <div className="flex flex-col  gap-1 mt-1 text-xs cursor-default">
          <span className="text-default-foreground">{name}</span>
          <span className="text-default-500 truncate w-[150px]">{message}</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-[0.65rem] text-default-500 cursor-default">
          {time}
        </span>
        {showNewMessageCount && newMessageCount > 0 && (
          <span className="text-[0.60rem] bg-primary text-white px-1 py-0.5 h-[0.85rem] rounded-full text-center flex items-center justify-center">
            {newMessageCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatCard;
