import { Button, User } from "@nextui-org/react";
import { ThemeSwitch } from "./theme-switch";
import { TbLogout2 } from "react-icons/tb";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ChatCard from "./chat-card";
import { ChatContext } from "../context/ChatContext";
import ChatSkeleton from "./chat-skeleton";
import { useFetchFriends } from "../hooks/fetchFriends";
import PotentialFriends from "./PotentialFriendsCard";
import { randomImage } from "../utils/avatar-images";

/**
 * A simple component that displays a user avatar and name
 * @function ChatList
 * @returns {ReactElement} A JSX Element
 */
const ChatList = () => {
  const {
    userChats,
    isChatLoading,
    chatsError,
    updateCurrentChat,
    currentChat,
    onlineUsers,
  } = useContext(ChatContext);

  const { user, logoutUser } = useContext(AuthContext);

  const { friends } = useFetchFriends(userChats, user);

  if (chatsError) {
    return <div>{chatsError}</div>;
  }
  const profileImage = randomImage();

  return (
    <div className="border-r border-divider w-1/4  overflow-y-auto overflow-x-hidden">
      <div className="flex justify-between items p-4 bg-content1">
        <User
          name={user.username}
          description="Product Designer"
          avatarProps={{
            src: profileImage,
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
        <Button color="primary" size="sm" className="mx-4">
          Create New Chat
        </Button>
        <p className="text-base font-semibold mx-4">Potential Friends</p>
        <PotentialFriends />
        <p className="text-base font-semibold mx-4">Messages</p>
        <div className="flex flex-col">
          {isChatLoading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                return <ChatSkeleton key={item} />;
              })}
            </div>
          ) : (
            <>
              {friends?.map(({ friend, chat }) => {
                return (
                  <ChatCard
                    onClick={() => updateCurrentChat(chat)}
                    key={chat._id}
                    name={friend?.username}
                    isOnline={
                      onlineUsers?.some(
                        (onlineUser) => onlineUser?.userId === friend?._id
                      )
                        ? "success"
                        : "default"
                    }
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
