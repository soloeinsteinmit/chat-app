import ChatInfoContainer from "../components/ChatInfoContainer";
import MessagesScreen from "../components/MessagesScreen";

const Chat = () => {
  return (
    <div className="flex-grow flex w-full overflow-y-auto">
      {/* Scrollable Messages Screen */}

      <MessagesScreen />

      {/* Sticky Chat Info Container */}
      <div className="chat-info-container w-72 sticky top-0 h-screen">
        <ChatInfoContainer />
      </div>
    </div>
  );
};

export default Chat;
