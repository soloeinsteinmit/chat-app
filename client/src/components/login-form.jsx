import { Button, Input, Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setSelected }) => {
  const handleLogin = (e) => {
    const navigate = useNavigate();
    navigate("/chat");
  };

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

  return (
    <form className="flex flex-col gap-4">
      {inputsData.map((input) => (
        <Input
          key={input.id}
          isRequired
          label={input.label}
          placeholder={`Enter your ${input.type}`}
          type={input.type}
        />
      ))}

      <p className="text-center text-small">
        Need to create an account?{" "}
        <Link size="sm" onPress={() => setSelected("sign-up")}>
          Sign up
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button type="submit" onClick={handleLogin} fullWidth color="primary">
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
