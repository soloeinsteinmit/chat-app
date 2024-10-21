import { Button, Input, Link } from "@nextui-org/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ErrorText } from "./error-alert";

/**
 * LoginForm component handles user login functionality.
 * It provides input fields for email and password,
 * along with a login button.
 */
const LoginForm = ({ setSelected }) => {
  const { loginError, loginUser, loading, updateLoginInfo, loginInfo } =
    useContext(AuthContext);

  const inputsData = [
    {
      id: "email",
      label: "Email",
      type: "email",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
    },
  ];

  const navigate = useNavigate();
  /**
   * Handles the submission of the login form.
   * Calls `loginUser` from the `AuthContext` and redirects the user to the chat page.
   * @param {Event} e The form submission event.
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser(e);

    // If there is no login error, redirect to the chat page
    if (!loginError) {
      navigate("/");
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
      {inputsData.map((input) => (
        <Input
          key={input.id}
          isRequired
          label={input.label}
          placeholder={`Enter your ${input.type}`}
          type={input.type}
          value={loginInfo[input.id]}
          onChange={(e) => updateLoginInfo(input.id, e.target.value)}
        />
      ))}

      <p className="text-center text-small">
        Need to create an account?{" "}
        <Link size="sm" onPress={() => setSelected("sign-up")}>
          Sign up
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button type="submit" fullWidth color="primary" isLoading={loading}>
          {loading ? "Logging in🚀..." : "Login"}
        </Button>
      </div>

      {loginError && <ErrorText errorText={loginError} />}
    </form>
  );
};

export default LoginForm;
