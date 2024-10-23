import { useState, useEffect, useContext } from "react";
import { Button, User } from "@nextui-org/react";
import { ThemeSwitch } from "./theme-switch";
import { TbLogout2 } from "react-icons/tb";
import { AuthContext } from "../context/AuthContext";
import ChatCard from "./chat-card";
import { ChatContext } from "../context/ChatContext";
import ChatSkeleton from "./chat-skeleton";
import { useFetchFriends } from "../hooks/fetchFriends";
import PotentialFriends from "./PotentialFriendsCard";
import { randomImage } from "../utils/avatar-images";
import { unreadNotification } from "../utils/unreadNotification";
import { formatTimestamp } from "../utils/utils";
import { getLastestMessage } from "../services/chat-services";

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
    newMessage,
    onlineUsers,
    notifications,
    markThisUserNotificationAsRead,
  } = useContext(ChatContext);

  const [latestMessages, setLatestMessages] = useState({});

  const { user, logoutUser } = useContext(AuthContext);

  const { friends } = useFetchFriends(userChats, user);
  // console.log("friends -> ", friends);

  const truncatedText = (text) => {
    if (text.length > 20) {
      return text.slice(0, 20) + "...";
    }
    return text;
  };

  // Assuming `friends` is your array of chat and friend objects.
  const friendIds = friends.map((friendObj) => friendObj.friend._id);
  // console.log("friendIds -> ", friendIds);

  if (chatsError) {
    return <div>{chatsError}</div>;
  }
  const profileImage = randomImage();
  const unreadNotifications = unreadNotification(notifications);

  const thisUserNotification = unreadNotifications?.filter((notification) => {
    const isFriend = friendIds.includes(notification.senderId);

    return isFriend;
  });

  useEffect(() => {
    const fetchLatestMessages = async () => {
      const messages = {};
      for (const { chat } of friends) {
        try {
          const response = await getLastestMessage(chat);
          const lastMessage = response ? response : null;
          messages[chat?._id] = lastMessage;
        } catch (error) {
          console.error("Error fetching latest message: ", error);
        }
      }
      setLatestMessages(messages);
    };

    if (friends && friends.length > 0) {
      fetchLatestMessages();
    }
  }, [friends, notifications, newMessage]);

  return (
    <div className="border-r border-divider w-1/4 overflow-y-auto overflow-x-hidden">
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
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <ChatSkeleton key={item} />
              ))}
            </div>
          ) : (
            friends?.map(({ friend, chat }) => {
              const hasNewMessages = thisUserNotification?.some(
                (notification) => notification.senderId === friend._id
              );

              const latestMessage = latestMessages[chat?._id];
              console.log("latestMessage -> ", latestMessage);

              return (
                <ChatCard
                  onClick={() => {
                    updateCurrentChat(chat);
                    if (thisUserNotification.length !== 0) {
                      markThisUserNotificationAsRead(
                        thisUserNotification,
                        notifications
                      );
                    }
                  }}
                  key={chat._id}
                  name={friend?.username}
                  isOnline={
                    onlineUsers?.some(
                      (onlineUser) => onlineUser?.userId === friend?._id
                    )
                      ? "success"
                      : "default"
                  }
                  newMessageCount={
                    thisUserNotification?.filter(
                      (notification) => notification.senderId === friend._id
                    ).length
                  }
                  showNewMessageCount={hasNewMessages}
                  message={latestMessage?.message || "No messages yet"}
                  time={
                    latestMessage
                      ? formatTimestamp(latestMessage?.createdAt).split(",")[0]
                      : ""
                  }
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
// message={chat?.lastMessage?.text}
// time={chat?.lastMessage?.createdAt}
// profileImage={friend?.profileImage}
