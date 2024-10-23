import {
  Avatar,
  Badge,
  Popover,
  Button,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { randomImage } from "../utils/avatar-images";
import { NotificationIcon } from "../assets/NotificationIcon";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { unreadNotification } from "../utils/unreadNotification";
import { formatTimestamp } from "../utils/utils";

export const Notifications = () => {
  const {
    notifications,
    userChats,
    allUsers,
    onlineUsers,
    markAllNotificationsAsRead,
    markNotificationAsRead,
  } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  const unreadNotifications = unreadNotification(notifications);
  const modifiedNotifications = notifications.map((notification) => {
    const sender = allUsers.find((user) => user._id === notification.senderId);
    return { ...notification, senderName: sender?.username };
  });
  const notificationCount = unreadNotifications.length.toString();

  // console.log("modifiedNotifications -> ", modifiedNotifications);
  // console.log("unreadNotifications -> ", unreadNotifications);

  return (
    <Popover
      showArrow
      backdrop="opaque"
      placement="left"
      className="w-[450px] overflow-y-auto h-[500px] overflow-x-hidden"
      classNames={{
        base: [
          // arrow color
          "before:bg-default-200",
        ],
        content: [
          "py-3 px-4 border border-default-200",
          "bg-gradient-to-br from-white to-default-300",
          "dark:from-default-100 dark:to-default-50",
        ],
      }}
    >
      <Badge
        content={notificationCount}
        shape="circle"
        color="danger"
        size="lg"
        variant="shadow"
        showOutline={false}
        isInvisible={notificationCount == 0 || notificationCount == undefined}
      >
        <PopoverTrigger>
          <Button
            radius="full"
            isIconOnly
            aria-label="notifications"
            variant="shadow"
            size="md"
          >
            <NotificationIcon size={24} />
          </Button>
        </PopoverTrigger>
      </Badge>
      <PopoverContent>
        {(titleProps) => (
          <div className="px-1 py-2 flex flex-col gap-3 items-start justify-start  w-full">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-xl font-bold" {...titleProps}>
                Nofications🔔
              </h3>
              <Button
                variant="flat"
                size="sm"
                color="warning"
                onClick={() => {
                  markAllNotificationsAsRead(notifications);
                }}
              >
                Mark all as read
              </Button>
            </div>
            <div className="w-full flex flex-col gap-2">
              {modifiedNotifications?.length == 0 ? (
                <span>No notifcations yet...</span>
              ) : (
                modifiedNotifications.map((notification, index) => (
                  <Notifcationcard
                    key={index}
                    onClick={() =>
                      markNotificationAsRead(
                        notification,
                        userChats,
                        user,
                        notifications
                      )
                    }
                    senderName={notification.senderName}
                    // profileImage={notification.sender.profileImage}
                    name={notification.senderName}
                    message={notification.message}
                    time={formatTimestamp(notification.time)}
                    isRead={notification.isRead}
                    isOnline={
                      onlineUsers?.some(
                        (onlineUser) =>
                          onlineUser?.userId === notification.receiverId
                      )
                        ? "success"
                        : "default"
                    }
                  />
                ))
              )}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

const Notifcationcard = ({
  senderName,
  profileImage = randomImage(),
  name = "Name here",
  message = "Message here",
  time = "2:30 PM",
  isOnline,
  onClick = () => {},
  isRead = false,
  ...props
}) => {
  return (
    <div
      className={`flex justify-between items-center px-4 py-3 ${
        isRead ? "hover:bg-content2" : "bg-content2 hover:bg-content1"
      }  transition active:scale-95 w-full rounded-medium`}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-center justify-start gap-2">
        <Badge
          content=""
          color={isOnline}
          shape="circle"
          placement="bottom-right"
          size="sm"
        >
          <Avatar radius="full" size="lg" src={profileImage} />
        </Badge>
        <div className="flex flex-col  gap-1 mt-1 text-xs cursor-default">
          <span className="text-default-foreground text-bold text-sm">
            {name}{" "}
            <span className="text-default-500 text-normal">
              sent you a message
            </span>
          </span>
          <span className="text-default-500 text-sm">{message}</span>
        </div>
      </div>
      <span className="text-[0.65rem] text-default-500 cursor-default">
        {time}
      </span>
    </div>
  );
};
