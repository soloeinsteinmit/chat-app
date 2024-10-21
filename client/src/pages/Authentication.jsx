import { useContext } from "react";
import { AuroraBackground } from "../components/aurora-background";
import AuthForm from "../components/auth-form";
import ChatterboxCard from "../components/chatterbox-card";
import EmojiCard from "../components/emoji-cards";
import SocialCard from "../components/social-card";
import UsersCard from "../components/users-card";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Authentication = () => {
  const { user } = useContext(AuthContext);

  // if user is logged in, redirect to chat page
  if (user) {
    return <Navigate to="/chat" />;
  }

  return (
    <AuroraBackground>
      <div className="flex flex-col items-center justify-center gap-9 w-full h-full relative">
        <p className="font-extrabold flex flex-col gap-3 text-center text-default-foreground">
          <span className="text-5xl">🌟 Connect. Converse. Chatterbox. 💫</span>
          <span className="text-4xl">
            🌟 Where every hello sparks a story ✨
          </span>
          <span className="text-3xl">🌏 Your world, in one chat. 💬</span>
        </p>
        <AuthForm />
        <div className="flex flex-col max-w-[300px] overflow-hidden items-center justify-center absolute left-20 -rotate-12">
          <UsersCard />

          <EmojiCard />
        </div>
        <div className="absolute right-20 ">
          <ChatterboxCard />
        </div>

        <div className="flex items-center gap-1 absolute bottom-0 mb-5 text-default-foreground">
          <p className="text-xs">Made with 💖 by Solomon Eshun</p>
          <p className="text-xs">
            Copyright © 2024 Chatterbox. All rights reserved.
          </p>
          <SocialCard />
        </div>
      </div>
    </AuroraBackground>
  );
};

export default Authentication;
