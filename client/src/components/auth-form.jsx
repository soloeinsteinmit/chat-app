import React from "react";
import { Tabs, Tab, Card, CardBody, CardFooter } from "@nextui-org/react";
import LoginForm from "./login-form";
import SignupForm from "./signup-form";
import ErrorAlert from "./error-alert";

export default function AuthForm() {
  const [selected, setSelected] = React.useState("login");

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <Card className="max-w-full w-[400px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <LoginForm setSelected={setSelected} />
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <SignupForm setSelected={setSelected} />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
