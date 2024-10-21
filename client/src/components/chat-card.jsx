import { Avatar, Badge } from "@nextui-org/react";
import React from "react";

const ChatCard = ({
  message = "Hello bro",
  name = "CobbyTrade 🤑",
  time = "12mins",
  profileImage = "https://i.pravatar.cc/150?u=a04258a2462d826712d",
}) => {
  return (
    <div className="flex justify-between items-center px-4 py-3 hover:bg-default-50 transition active:scale-95">
      <div className="flex items-center justify-start gap-2">
        <Badge
          content=""
          color="success"
          shape="circle"
          placement="bottom-right"
          size="sm"
        >
          <Avatar radius="full" src={profileImage} />
        </Badge>
        <div className="flex flex-col gap-1 text-xs cursor-default">
          <span className="text-default-foreground">{name}</span>
          <span className="text-default-500">{message}</span>
        </div>
      </div>
      <div className="flex flex-col ml-3">
        <span className="text-[0.65rem] text-default-500 cursor-default">
          {time}
        </span>
      </div>
    </div>
  );
};

export default ChatCard;
