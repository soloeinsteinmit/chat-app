import { createContext } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const value = {};
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
