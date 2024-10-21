import { Button, User } from "@nextui-org/react";
import { ThemeSwitch } from "./theme-switch";
import { TbLogout2 } from "react-icons/tb";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ChatCard from "./chat-card";
import { ChatContext } from "../context/ChatContext";
import ChatSkeleton from "./chat-skeleton";
import { useFetchFriends } from "../hooks/fetchFriends";

/**
 * A simple component that displays a user avatar and name
 * @function ChatList
 * @returns {ReactElement} A JSX Element
 */
const ChatList = () => {
  const { userChats, isChatLoading, chatsError } = useContext(ChatContext);
  const { user, logoutUser } = useContext(AuthContext);

  const { friends } = useFetchFriends(userChats, user);

  console.log("userChats->", userChats);

  console.log("friends->", friends);

  if (chatsError) {
    return <div>{chatsError}</div>;
  }
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
          {isChatLoading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                return <ChatSkeleton key={item} />;
              })}
            </div>
          ) : (
            <>
              {friends?.map((friend) => {
                return (
                  <ChatCard
                    key={friend._id}
                    name={friend?.username}
                    // message={chat?.lastMessage?.text}
                    // time={chat?.lastMessage?.createdAt}
                    // profileImage={friend?.profileImage}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
