import { Button, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import SendIcon from "../assets/SendIcon";
import ChatHeader from "./ChatHeader";
import MessagesContainer from "./MessagesContainer";
import { FaRegImage } from "react-icons/fa6";
import { LuPlusCircle } from "react-icons/lu";
import ChatInput from "./ChatInput";

const MessagesScreen = () => {
  return (
    <div className="w-3/4 flex flex-col justify-between">
      <ChatHeader />
      <div className="flex-grow flex justify-center mt-[80px]">
        <MessagesContainer />
      </div>
      <ChatInput />
    </div>
  );
};

export default MessagesScreen;
