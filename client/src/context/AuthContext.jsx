import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext();

/**
 * The AuthProvider component wraps the context provider for the user state.
 * It manages the user state and provides the user and loading state to
 * its children components.
 *
 * @param {React.ReactNode} children The children components to wrap.
 * @returns {React.ReactElement} The AuthProvider component.
 */
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  console.log(`signupInfo -> ${JSON.stringify(signupInfo)}`);

  const updateSignupInfo = useCallback(
    (key, value) => {
      setSignupInfo({ ...signupInfo, [key]: value });
    },
    [signupInfo]
  );

  return (
    <AuthContext.Provider
      value={{ user, signupInfo, updateSignupInfo, setUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
