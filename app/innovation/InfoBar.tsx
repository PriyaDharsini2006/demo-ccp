"use client";

import {
  Button,
  Dialog,
  Flex,
  Heading,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const InfoBar = ({
  innovation,
  userId,
}: {
  innovation: any;
  userId: string;
}) => {
  const [title, setTitle] = useState(innovation.title);
  const [description, setDescription] = useState(innovation.description);
  const [detailedDesc, setDetailedDesc] = useState(
    innovation.detailedDesc || ""
  );

  const handleSave = () => {};
  return (
    <Flex
      direction="column"
      gap="4"
      className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-transform transform hover:scale-105"
    >
      <Heading>{innovation.title}</Heading>
      <Text>{innovation.description}</Text>
      <Text>{innovation.detailedDesc}</Text>
      {userId == innovation.userId && (
        <Dialog.Root>
          <Dialog.Trigger>
            <Button
              variant="solid"
              className="bg-blue-500 text-white dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800"
            >
              Edit Contents
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Edit Innovation Conetents</Dialog.Title>
            <Flex direction="column" gap="4">
              <Flex align="center" gap="3">
                <Text className="text-gray-700 dark:text-gray-300">Title:</Text>
                <TextField.Root
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex-1 p-2 border rounded-md border-gray-300 dark:border-gray-700"
                />
              </Flex>
              <Flex align="center" gap="3">
                <Text className="text-gray-700 dark:text-gray-300">
                  Description:
                </Text>
                <TextArea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="flex-1 p-2 border rounded-md border-gray-300 dark:border-gray-700"
                />
              </Flex>
              <Flex align="center" gap="3">
                <Text className="text-gray-700 dark:text-gray-300">
                  Detailed Description:
                </Text>
                <TextArea
                  value={detailedDesc}
                  onChange={(e) => setDetailedDesc(e.target.value)}
                  className="flex-1 p-2 border rounded-md border-gray-300 dark:border-gray-700"
                />
              </Flex>
              <Flex justify="center" gap="3">
                <Button
                  variant="solid"
                  onClick={handleSave}
                  className="bg-green-500 text-white dark:bg-green-700 hover:bg-green-600 dark:hover:bg-green-800"
                >
                  Save Changes
                </Button>
                <Dialog.Close>
                  <Button
                    color="red"
                    className="bg-red-500 text-white dark:bg-red-700 hover:bg-red-600 dark:hover:bg-red-800"
                  >
                    Cancel Changes
                  </Button>
                </Dialog.Close>
              </Flex>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </Flex>
  );
};

export default InfoBar;
