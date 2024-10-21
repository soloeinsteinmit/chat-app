export default ReceiverChatCard;
function ReceiverChatCard({
  message = "I received your message yesterday...",
  timestamp = "12:53 PM",
}) {
  return (
    <div className="flex flex-col items-start justify-start gap-1 w-full ">
      <p className="flex flex-col gap-1 shadow-medium rounded-s-medium rounded-se-3xl rounded-e-medium p-2 px-5 bg-default-200 max-w-[600px] text-sm ">
        {message}
      </p>
      <span className="text-[0.65rem] text-right text-default-400">
        {timestamp}
      </span>
    </div>
  );
}
