import { createContext, useCallback, useEffect, useState } from "react";
import { login, signup } from "../services/auth-services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  // console.log(`signupInfo -> ${JSON.stringify(signupInfo)}`);
  // console.log(`loginInfo -> ${JSON.stringify(loginInfo)}`);
  // console.log(`user -> ${JSON.stringify(user)}`);

  // Check if user is stored in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Update signup info
  const updateSignupInfo = useCallback((key, value) => {
    setSignupInfo((prevInfo) => ({ ...prevInfo, [key]: value }));
  }, []);

  // Update login info
  const updateLoginInfo = useCallback((key, value) => {
    setLoginInfo((prevInfo) => ({ ...prevInfo, [key]: value }));
  }, []);

  // Signup user
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

  // Login user
  const loginUser = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        setLoading(true);
        const response = await login(loginInfo.email, loginInfo.password);

        if (response.error) {
          setLoading(false);
          setLoginError(response.error);
        } else {
          localStorage.setItem("User", JSON.stringify(response));
          setUser(response);
          setLoginInfo({ email: "", password: "" });
          setLoginError(null);
          setLoading(false);
        }
      } catch (error) {
        setLoginError(error.message);
        setLoading(false);
      }
    },
    [loginInfo]
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
        loginInfo,
        updateSignupInfo,
        updateLoginInfo,
        signupUser,
        loginUser,
        signupError,
        loginError,
        setUser,
        loading,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
