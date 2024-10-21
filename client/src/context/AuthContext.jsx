import { createContext, useCallback, useEffect, useState } from "react";
import { signup } from "../services/auth-services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  console.log(`signupInfo -> ${JSON.stringify(signupInfo)}`);
  console.log(`user -> ${JSON.stringify(user)}`);

  // Check if user is stored in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateSignupInfo = useCallback((key, value) => {
    setSignupInfo((prevInfo) => ({ ...prevInfo, [key]: value }));
  }, []);

  const signupUser = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const response = await signup(
          signupInfo.username,
          signupInfo.email,
          signupInfo.password
        );

        console.log(`signupInfo response -> ${JSON.stringify(response)}`);

        if (response.error) {
          setLoading(false);
          setSignupError(response.error);
        } else {
          localStorage.setItem("User", JSON.stringify(response));
          setUser(response);
          setSignupInfo({
            username: "",
            email: "",
            password: "",
          });
          setSignupError(null);
          setLoading(false);
        }
      } catch (error) {
        setSignupError(error.message);

        setLoading(false);
      }
    },
    [signupInfo]
  );

  // Logout user
  // Remove user from localStorage
  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signupInfo,
        updateSignupInfo,
        signupUser,
        signupError,
        setUser,
        loading,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
