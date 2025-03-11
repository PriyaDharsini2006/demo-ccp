"use client";

import { Button, Flex, Select, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegUser } from "react-icons/fa";
import { HiEye, HiEyeOff, HiLogin } from "react-icons/hi";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";

const SignupComp = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [userType, setUserType] = useState("ENTREPRENEUR");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      await axios
        .post("api/auth/signup", {
          name,
          mail,
          pass,
          userType,
        })
        .then(() => toast.success("User Created"))
        .catch(() => toast.error("Error while creating the user"));
      console.log("Success");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Flex
      direction="column"
      gap="4"
      className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      <TextField.Root
        placeholder="John Doe"
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="flex items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md"
      >
        <TextField.Slot>
          <FaRegUser size={18} className="text-gray-500 dark:text-gray-300" />
        </TextField.Slot>
      </TextField.Root>

      <TextField.Root
        placeholder="sample@gmail.com"
        type="email"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
        className="flex items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md"
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
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          className="flex items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md"
        >
          <TextField.Slot>
            <IoKeyOutline
              size={18}
              className="text-gray-500 dark:text-gray-300"
            />
          </TextField.Slot>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-300"
          >
            {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
          </button>
        </TextField.Root>
      </div>

      <Select.Root
        defaultValue="INVESTOR"
        onValueChange={(value) => setUserType(value)}
        value={userType}
      >
        <Select.Trigger className="flex items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
          {userType}
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="INVESTOR" disabled>
            Investor
          </Select.Item>
          <Select.Item value="ENTREPRENEUR">Entrepreneur</Select.Item>
          <Select.Item value="INNOVATOR">Innovator</Select.Item>
        </Select.Content>
      </Select.Root>

      <Button
        variant="solid"
        onClick={handleSubmit}
        className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Signup <HiLogin size={18} className="ml-2" />
      </Button>
    </Flex>
  );
};

export default SignupComp;
