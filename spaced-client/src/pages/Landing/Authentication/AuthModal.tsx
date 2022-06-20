import { Tabs } from "@mantine/core";
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { AuthHeader, AuthTabs } from "./Styles";

function AuthModal({ curr }: { curr: number }): JSX.Element {
  const [active, setActive] = useState(curr);

  return (
    <AuthHeader>
      <AuthTabs>
        <Tabs active={active} onTabChange={setActive}>
          <Tabs.Tab data-id="register-tab" label="Register">
            <Register />
          </Tabs.Tab>
          <Tabs.Tab label="Login">
            <Login />
          </Tabs.Tab>
        </Tabs>
      </AuthTabs>
    </AuthHeader>
  );
}

export default AuthModal;
