import { Button, Input, Link } from "@nextui-org/react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ErrorText } from "./error-alert";
import { useNavigate } from "react-router-dom";

/**
 * Handles user signup functionality.
 * It provides input fields for username, email and password,
 * along with a signup button.
 * @param {function} setSelected A function to set the currently selected
 * form (login or signup).
 * @returns {JSX.Element} The signup form component.
 */
const SignupForm = ({ setSelected }) => {
  const { signupInfo, updateSignupInfo, signupUser, signupError, loading } =
    useContext(AuthContext);

  const inputsData = [
    {
      id: "username",
      label: "Username",
      label: "Username",
      type: "text",
    },
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
   * Handles the submission of the signup form. Calls `signupUser` from the
   * `AuthContext` and redirects the user to the chat page.
   * @param {Event} e The form submission event.
   */
  const handleSignup = async (e) => {
    e.preventDefault();
    const isSignedUp = await signupUser(e);

    // If there is no signup error, redirect to the chat page
    if (isSignedUp && !signupError) {
      navigate("/");
    }
  };

  return (
    <form className="flex flex-col gap-4 h-[300px]" onSubmit={handleSignup}>
      {inputsData.map((input) => (
        <Input
          key={input.id}
          isRequired
          isClearable
          label={input.label}
          placeholder={`Enter your ${input.label.toLowerCase()}`}
          type={input.type}
          value={signupInfo[input.id]}
          onChange={(e) => updateSignupInfo(input.id, e.target.value)}
          onClear={() => updateSignupInfo(input.id, "")}
        />
      ))}

      <p className="text-center text-small">
        Already have an account?{" "}
        <Link size="sm" onPress={() => setSelected("login")}>
          Login
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button type="submit" fullWidth color="primary" isLoading={loading}>
          {loading ? "Signing you up🚀..." : "Sign up"}
        </Button>
      </div>
      {signupError && <ErrorText errorText={signupError} />}
    </form>
  );
};

export default SignupForm;
