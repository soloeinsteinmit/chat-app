import { Skeleton } from "@nextui-org/react";

/**
 * A component that renders a skeleton for a chat message.
 * @param {boolean} isLoading - If true, the skeleton is shown. If false, nothing is shown.
 * @returns {ReactElement} A React element representing the skeleton.
 */
const ChatSkeleton = () => {
  return (
    <div className="max-w-[300px] w-full flex items-center gap-3 px-4">
      <div>
        <Skeleton
          //   isLoading={isLoading}
          className="flex rounded-full w-10 h-10"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-2 w-3/5 rounded-lg" />
        <Skeleton className="h-2 w-4/5 rounded-lg" />
      </div>
    </div>
  );
};

export default ChatSkeleton;
