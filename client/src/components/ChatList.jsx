import { Button, User } from "@nextui-org/react";
import { ThemeSwitch } from "./theme-switch";
import { TbLogout2 } from "react-icons/tb";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ChatCard from "./chat-card";

/**
 * A simple component that displays a user avatar and name
 * @function ChatList
 * @returns {ReactElement} A JSX Element
 */
const ChatList = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <div className="border-r border-divider w-1/4  overflow-y-auto">
      <div className="flex justify-between items p-4 bg-content1">
        <User
          name={user.username}
          description="Product Designer"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e2902670",
            isBordered: true,
            color: "success",
          }}
        />

        <div className="flex items-center justify-between">
          <ThemeSwitch />
          <Button
            isIconOnly
            variant="flat"
            color="danger"
            size="sm"
            onClick={() => logoutUser()}
          >
            {" "}
            <TbLogout2 className="text-lg" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 py-2">
        <p className="text-base font-semibold mx-4">Messages</p>
        <Button color="primary" size="sm" className="mx-4">
          Create New Chat
        </Button>
        <div className="flex flex-col">
          <ChatCard />
          <ChatCard />
        </div>
      </div>
    </div>
  );
};

export default ChatList;
