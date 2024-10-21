import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@nextui-org/react";

const Chat = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <div>
      <h1>welcome to Chatterbox {user?.username}</h1>
      <Button onClick={() => logoutUser()}>Logout</Button>
    </div>
  );
};

export default Chat;
