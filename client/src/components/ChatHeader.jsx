import {
  Avatar,
  Badge,
  Button,
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import React from "react";
import { IoVideocamOutline, IoCallOutline } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { randomImage } from "../utils/avatar-images";

const ChatHeader = ({ profileImage = randomImage(), name = "CobbyTrade" }) => {
  return (
    <div className="flex-shrink-0 fixed top-0 bg-content1 border-b border-divider px-4 py-4 flex items-center justify-between w-[65.6%]">
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
