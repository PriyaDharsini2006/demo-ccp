"use client";

import { Flex, Button } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import React from "react";
import Logo from "./Logo";
import ThemeSwitch from "./ThemeSwitch";

const LoginBtn = () => {
  return (
    <Button onClick={() => signIn()} variant="soft" color="green">
      Login / Signup
    </Button>
  );
};

export default LoginBtn;
