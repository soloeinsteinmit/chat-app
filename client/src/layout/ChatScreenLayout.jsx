import ChatContainer from "../components/ChatContainer";
import ChatList from "../components/ChatList";

const ChatScreenLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <ChatList />
      <ChatContainer />
    </div>
  );
};

export default ChatScreenLayout;
