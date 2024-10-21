import Chat from "../pages/Chat";
import ChatList from "../components/ChatList";

const ChatScreenLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <ChatList />
      <Chat />
    </div>
  );
};

export default ChatScreenLayout;
