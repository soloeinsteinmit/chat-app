import { Avatar, Badge } from "@nextui-org/react";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ChatInfoContainer = ({
  profileImage = "https://i.pravatar.cc/150?u=a04258a2462d826712d",
}) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full border-l h-screen border-divider p-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <Badge
          content=""
          color="success"
          shape="circle"
          placement="bottom-right"
          size="lg"
        >
          <Avatar radius="full" className="w-32 h-32" src={profileImage} />
        </Badge>
        <p>{user.username}</p>
        <p>{user.email}</p>
      </div>
      <br />
      <br />
      <br />
      information about chat here
    </div>
  );
};

export default ChatInfoContainer;
