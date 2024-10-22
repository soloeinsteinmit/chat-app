import { Button, Textarea } from "@nextui-org/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { LuPlusCircle } from "react-icons/lu";
import SendIcon from "../assets/SendIcon";
import { ChatContext } from "../context/ChatContext";
import EmojiPicker from "emoji-picker-react";
import { AuthContext } from "../context/AuthContext";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // New state to manage emoji picker visibility

  const { currentChat, sendMessage } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
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

  const handleMouseEnter = () => {
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setEmoji(randomEmoji); // Set a random emoji from the array
  };

  const handleMouseLeave = () => {
    setEmoji(emoji); // Revert back to the original emoji when not hovered
  };

  const handleSend = async () => {
    // Handle sending the message here
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(currentChat._id, user._id, message, setMessage);
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev); // Toggle the emoji picker visibility
  };
  const emojiPickerRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [emojiPickerRef]);

  const handleEmojiClick = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);

    setShowEmojiPicker(false); // Hide the emoji picker after selecting an emoji
  };
  console.log("message->", message);

  return (
    <div className="flex-shrink-0 sticky bottom-0 left-0 w-full z-50 flex py-5 pl-5 justify-center items-center bg-content1 border-t border-divider">
      <Textarea
        className="w-full transition mr-2"
        onKeyDown={handleKeyPress}
        style={{ whiteSpace: "pre-line" }} // Preserve white spaces and line breaks
        classNames={{
          innerWrapper: "items-center",
          label: "text-primary",
          input: "text-sm",
        }}
        placeholder="Write a message..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        variant="faded"
        minRows={1}
        radius="md"
        startContent={
          <div className="relative">
            <Button
              isIconOnly
              className="text-lg border-none"
              size="sm"
              variant="faded"
              radius="full"
              onClick={toggleEmojiPicker} // Show/hide emoji picker when clicked
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              aria-label="emoji"
            >
              {emoji}
            </Button>
            <div ref={emojiPickerRef} className="absolute bottom-full mb-2">
              {showEmojiPicker && (
                <EmojiPicker onEmojiClick={handleEmojiClick} theme="auto" />
              )}
            </div>
          </div>
        }
        endContent={
          <div className="flex h-full items-end">
            <Button
              isIconOnly
              color="primary"
              variant="shadow"
              size="sm"
              onClick={() =>
                sendMessage(currentChat._id, user._id, message, setMessage)
              }
              aria-label="send"
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
        >
          <LuPlusCircle className="text-lg" />
        </Button>
        <Button
          isIconOnly
          variant="light"
          size="sm"
          onClick={handleSend}
          aria-label="send"
        >
          <FaRegImage className="text-lg" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
