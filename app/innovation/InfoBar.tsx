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
import { toast } from "react-hot-toast"; // Add this for notifications

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
    innovation.detailedDesc || "",
  );
  const [open, setOpen] = useState(false);

  const handleSave = async () => {
    try {
      const response = await fetch("/api/innovations", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: innovation.id,
          title,
          description,
          detailedDesc,
        }),
      });

      if (response.ok) {
        toast.success("Innovation updated successfully");
        setOpen(false);
        // Force refresh the page to see updated data
        window.location.reload();
      } else {
        const errorData = await response.json();
        toast.error(errorData || "Failed to update innovation");
      }
    } catch (error) {
      console.error("Error updating innovation:", error);
      toast.error("An error occurred while updating");
    }
  };

  return (
    <Flex
      direction="column"
      gap="4"
      className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-transform transform hover:scale-105"
    >
      <Heading>{innovation.title}</Heading>
      <Text className="text-gray-700 dark:text-gray-300 font-medium">
        Description:
      </Text>
      <Text className="ml-2">{innovation.description}</Text>

      {innovation.detailedDesc && (
        <>
          <Text className="text-gray-700 dark:text-gray-300 font-medium">
            Detailed Description:
          </Text>
          <Text className="ml-2">{innovation.detailedDesc}</Text>
        </>
      )}

      {userId === innovation.innovatorId && (
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger>
            <Button
              variant="solid"
              className="bg-blue-500 text-white dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800"
            >
              Edit Contents
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Edit Innovation Contents</Dialog.Title>
            <Flex direction="column" gap="4">
              <Flex direction="column" gap="2">
                <Text className="text-gray-700 dark:text-gray-300">Title:</Text>
                <TextField.Root
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex-1 p-2 border rounded-md border-gray-300 dark:border-gray-700"
                />
              </Flex>
              <Flex direction="column" gap="2">
                <Text className="text-gray-700 dark:text-gray-300">
                  Description:
                </Text>
                <TextArea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="flex-1 p-2 border rounded-md border-gray-300 dark:border-gray-700"
                  rows={3}
                />
              </Flex>
              <Flex direction="column" gap="2">
                <Text className="text-gray-700 dark:text-gray-300">
                  Detailed Description:
                </Text>
                <TextArea
                  value={detailedDesc}
                  onChange={(e) => setDetailedDesc(e.target.value)}
                  className="flex-1 p-2 border rounded-md border-gray-300 dark:border-gray-700"
                  rows={5}
                />
              </Flex>
              <Flex justify="center" gap="3" className="mt-4">
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
                    Cancel
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
