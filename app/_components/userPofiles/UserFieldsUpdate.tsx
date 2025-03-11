"use client";

import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { GrUpdate } from "react-icons/gr";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

const UserFieldsUpdate = ({
  email,
  fullname,
  pass,
}: {
  email: string;
  fullname: string;
  pass: string;
}) => {
  const router = useRouter();
  const [name, setName] = useState(fullname);
  const [passw, setPassw] = useState(pass);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    await axios
      .put("/api/user", { email, name, pass: passw })
      .then(() => {
        toast.success("Information Updated");
        router.refresh();
      })
      .catch(() => toast.error("Error while updating the data"));
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md">
      <TextField.Root
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md"
        placeholder="Full Name"
      >
        <TextField.Slot>
          <MdOutlineDriveFileRenameOutline
            size="20"
            className="text-gray-500 dark:text-gray-300"
          />
        </TextField.Slot>
      </TextField.Root>

      <div className="relative">
        <TextField.Root
          value={passw}
          onChange={(e) => setPassw(e.target.value)}
          className="flex items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
        >
          <TextField.Slot>
            <IoKeyOutline
              size="20"
              className="text-gray-500 dark:text-gray-300"
            />
          </TextField.Slot>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-300"
          >
            {showPassword ? <HiEyeOff size="20" /> : <HiEye size="20" />}
          </button>
        </TextField.Root>
      </div>

      <Button color="green" variant="soft" onClick={handleSubmit}>
        Update <GrUpdate />
      </Button>
    </div>
  );
};

export default UserFieldsUpdate;
