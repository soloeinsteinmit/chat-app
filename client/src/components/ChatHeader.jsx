import { Avatar, Badge, Button, Chip } from "@nextui-org/react";
import React from "react";
import { IoVideocamOutline, IoCallOutline } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const ChatHeader = ({
  profileImage = "https://i.pravatar.cc/150?u=a0428a2462d826712d",
  name = "CobbyTrade",
}) => {
  return (
    <div className="flex-shrink-0 fixed top-0 bg-content2 border-b border-divider px-4 py-4 flex items-center justify-between w-[60%]">
      <div className="flex items-center gap-2">
        <Avatar radius="full" src={profileImage} size="md" />
        <span className="text-sm">{name}</span>
      </div>
      <Chip color="success" variant="flat" size="sm">
        Online
      </Chip>
      <div className="flex gap-3 mr-5">
        <Button isIconOnly variant="bordered" size="sm" aria-label="send">
          <IoCallOutline className="text-lg" />
        </Button>
        <Button isIconOnly variant="bordered" size="sm" aria-label="send">
          <IoVideocamOutline className="text-lg" />
        </Button>
        <Button isIconOnly variant="bordered" size="sm" aria-label="send">
          <HiOutlineDotsHorizontal className="text-lg" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
