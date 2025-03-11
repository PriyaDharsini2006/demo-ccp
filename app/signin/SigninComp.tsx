"use client";

import { Button, Flex, TextField } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { GoSignIn } from "react-icons/go";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";

const SigninComp = () => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async () => {
    if (!mail && !pass) {
      toast.error("Credentials required");
      return;
    }
    const result = await signIn("credentials", {
      email: mail,
      password: pass,
    }).then((e) => {
      if (e?.error) toast.error("Error while login");
      else toast.success("User Logged In");
    });
  };

  return (
    <Flex
      direction="column"
      gap="4"
      className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      <TextField.Root
        placeholder="sample@gmail.com"
        type="email"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
        className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md"
      >
        <TextField.Slot>
          <MdOutlineAlternateEmail
            size={18}
            className="text-gray-500 dark:text-gray-300"
          />
        </TextField.Slot>
      </TextField.Root>

      <div className="relative">
        <TextField.Root
          placeholder="Password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="flex items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md"
        >
          <TextField.Slot>
            <IoKeyOutline
              size={18}
              className="text-gray-500 dark:text-gray-300"
            />
          </TextField.Slot>
        </TextField.Root>
      </div>

      <Button
        variant="solid"
        onClick={handleSubmit}
        className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Sign In <GoSignIn size={18} className="ml-2" />
      </Button>
    </Flex>
  );
};

export default SigninComp;
