import { Button, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { LuPlusCircle } from "react-icons/lu";
import SendIcon from "../assets/SendIcon";

const ChatInput = () => {
  const emojis = [
    "😜",
    "😂",
    "😎",
    "😍",
    "🤩",
    "🥳",
    "🤔",
    "😅",
    "😇",
    "😡",
    "🤔",
    "😳",
    "😛",
    "😊",
    "😎",
    "😯",
    "😉",
    "😗",
    "🤨",
    "🙄",
    "😒",
    "🤤",
    "😴",
    "😌",
    "🙁",
    "😖",
    "😭",
  ];

  const [emoji, setEmoji] = useState("🤪");

  const getCurrentFormattedTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleMouseEnter = () => {
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setEmoji(randomEmoji); // Set a random emoji from the array
  };

  const handleMouseLeave = () => {
    setEmoji(emoji); // Revert back to the original emoji when not hovered
  };

  const handleSend = async () => {
    const formattedTime = getCurrentFormattedTime();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      handleSend();
    }
  };

  return (
    <div className="flex-shrink-0 sticky bottom-0 left-0  w-full z-50 flex py-5 pl-5 justify-center items-center bg-content1 border-t border-divider">
      <Textarea
        className=" w-full transition mr-2"
        onKeyDown={handleKeyPress}
        //   size="sm"
        style={{ whiteSpace: "pre-line" }} // Preserve white spaces and line breaks
        classNames={{
          innerWrapper: "items-center",
          label: "text-primary",
          input: "text-sm",
        }}
        placeholder="Write a message..."
        //   onChange={handleChange}
        //   value={inputMessage}
        variant="faded"
        minRows={1}
        radius="md"
        startContent={
          <Button
            isIconOnly
            className="text-lg border-none"
            size="sm"
            variant="faded"
            radius="full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label="emoji"
          >
            {emoji}
          </Button>
        }
        endContent={
          <div className="flex  h-full items-end ">
            <Button
              isIconOnly
              color="primary"
              variant="shadow"
              size="sm"
              onClick={handleSend}
              aria-label="send"
              // isDisabled={!inputMessage.trim()}
            >
              <SendIcon />
            </Button>
          </div>
        }
      />
      <div className="flex gap-1 mr-5">
        <Button
          isIconOnly
          variant="light"
          size="sm"
          onClick={handleSend}
          aria-label="send"
          // isDisabled={!inputMessage.trim()}
        >
          <LuPlusCircle className="text-lg" />
        </Button>
        <Button
          isIconOnly
          variant="light"
          size="sm"
          onClick={handleSend}
          aria-label="send"
          // isDisabled={!inputMessage.trim()}
        >
          <FaRegImage className="text-lg" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
