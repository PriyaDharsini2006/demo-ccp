"use client";

import { Button, Dialog, Flex, IconButton, Popover } from "@radix-ui/themes";
import { signOut } from "next-auth/react";
import { CiUser } from "react-icons/ci";
import ImageComp from "./ImageComp";
import UserFieldsUpdate from "./UserFieldsUpdate";
import { GoSignOut } from "react-icons/go";

const UserProf = ({ user }: { user: any }) => {
  return (
    <>
      <Popover.Root>
        <Popover.Trigger>
          <IconButton>
            <CiUser size={18} />
          </IconButton>
        </Popover.Trigger>
        <Popover.Content>
          <Flex
            direction="column"
            justify="center"
            className="bg-gray-100 dark:bg-gray-800 px-12 py-4 rounded-lg shadow-md"
            gap="6"
          >
            {user && (
              <>
                <ImageComp user={user} />
                <UserFieldsUpdate
                  email={user.email}
                  fullname={user.fullName}
                  pass={user.password}
                />
              </>
            )}
            <Button onClick={() => signOut()} color="red" variant="outline">
              Signout
              <GoSignOut size={18} />
            </Button>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </>
  );
};

export default UserProf;
