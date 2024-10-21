import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@nextui-org/react";
import { Navigate } from "react-router-dom";

const Chat = () => {
  const { user, logoutUser } = useContext(AuthContext);

  // if user is not logged in, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div>
      <h1>welcome to Chatterbox {user?.username}</h1>
      <Button onClick={() => logoutUser()}>Logout</Button>
    </div>
  );
};

export default Chat;
