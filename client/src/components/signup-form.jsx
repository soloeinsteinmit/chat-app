import { Button, Input, Link } from "@nextui-org/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SignupForm = ({ setSelected }) => {
  const { signupInfo, updateSignupInfo } = useContext(AuthContext);

  const handleSignup = (e) => {
    e.preventDefault();
    const navigate = useNavigate();
    navigate("/");
  };

  const inputsData = [
    {
      id: "username",
      label: "Userame",
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

  return (
    <form className="flex flex-col gap-4 h-[300px]">
      {inputsData.map((input) => (
        <Input
          key={input.id}
          isRequired
          label={input.label}
          placeholder={`Enter your ${input.type}`}
          type={input.type}
          onChange={(e) => updateSignupInfo(input.id, e.target.value)}
        />
      ))}

      <p className="text-center text-small">
        Already have an account?{" "}
        <Link size="sm" onPress={() => setSelected("login")}>
          Login
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button type="submit" onClick={handleSignup} fullWidth color="primary">
          Sign up
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
