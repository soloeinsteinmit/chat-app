import { Avatar } from "@nextui-org/react";

const getInitials = (name) => {
  const nameParts = name.split(" ");
  if (nameParts.length > 1) {
    return nameParts[0].charAt(0) + nameParts[1].charAt(0);
  } else {
    return name.charAt(0) + name.charAt(1);
  }
};

function SenderChatCard({
  message = "I send your message yesterday...",

  timestamp = "12:53 PM",
}) {
  return (
    <div className="flex flex-col items-end justify-end gap-1 w-full ">
      <p className="flex flex-col gap-1 shadow-medium rounded-es-medium rounded-ss-3xl rounded-e-medium p-2 px-5 bg-primary max-w-[600px] text-sm text-white">
        {message}
      </p>
      <span className="text-[0.65rem] text-right text-default-400">
        {timestamp}
      </span>
    </div>
  );
}

export default SenderChatCard;
