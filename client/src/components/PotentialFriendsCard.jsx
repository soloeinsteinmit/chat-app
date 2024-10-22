import { Avatar, AvatarGroup, Skeleton, Tooltip } from "@nextui-org/react";
import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { randomImage } from "../utils/avatar-images";
import { AuthContext } from "../context/AuthContext";

const PotentialFriends = ({
  profileImage = "https://i.pravatar.cc/150?u=a04258a246d826712d",
}) => {
  const { user } = useContext(AuthContext);
  const { potentialFriends, loadingFriends, createChat } =
    useContext(ChatContext);
  console.log(randomImage);

  return (
    <div className="flex items-center justify-center mt-3 mx-4">
      {loadingFriends ? (
        <div className="flex -space-x-3">
          <Skeleton className="rounded-full w-10 h-10" />
          <Skeleton className="rounded-full w-10 h-10" />
          <Skeleton className="rounded-full w-10 h-10" />
          <Skeleton className="rounded-full w-10 h-10" />
          <Skeleton className="rounded-full w-10 h-10" />
          <Skeleton className="rounded-full w-10 h-10" />
          <Skeleton className="rounded-full w-10 h-10" />
        </div>
      ) : (
        <AvatarGroup isBordered max={6}>
          {potentialFriends.map((friend) => (
            <Tooltip
              content={friend.username.split(" ")[0]}
              classNames={{
                content: "text-[0.55rem] w-fit",
              }}
              key={friend._id}
              showArrow
              delay={0}
              closeDelay={0}
              motionProps={{
                variants: {
                  exit: {
                    opacity: 0,
                    transition: {
                      duration: 0.1,
                      ease: "easeIn",
                    },
                  },
                  enter: {
                    opacity: 1,
                    transition: {
                      duration: 0.15,
                      ease: "easeOut",
                    },
                  },
                },
              }}
            >
              <div onClick={() => createChat(user._id, friend._id)}>
                <Avatar
                  showFallback
                  name={friend.username
                    .split(" ")[0]
                    .substring(0, 2)
                    .toUpperCase()}
                  src={randomImage()}
                />
              </div>
            </Tooltip>
          ))}
        </AvatarGroup>
      )}
    </div>
  );
};

export default PotentialFriends;
