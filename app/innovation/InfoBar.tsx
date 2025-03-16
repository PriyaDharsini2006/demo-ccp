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
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

// Ensure credentials are included with requests
axios.defaults.withCredentials = true;

const InfoBar = ({ innovation }: { innovation: any }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [title, setTitle] = useState(innovation.title);
  const [description, setDescription] = useState(innovation.description);
  const [detailedDesc, setDetailedDesc] = useState(
    innovation.detailedDesc || "",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  // Debug session info
  useEffect(() => {
    console.log("Current session status:", status);
    console.log("Session data:", session);
    console.log("Innovation data:", innovation);
  }, [session, status, innovation]);

  // Check ownership when session or innovation changes
  useEffect(() => {
    if (session?.user?.id && innovation?.innovatorId) {
      const sessionUserId = String(session.user.id);
      const innovatorId = String(innovation.innovatorId);
      console.log("Checking ownership:", { sessionUserId, innovatorId });
      setIsOwner(sessionUserId === innovatorId);
    } else {
      setIsOwner(false);
    }
  }, [session, innovation]);

  const handleSave = async () => {
    // Validate required data
    if (!innovation.id) {
      toast.error("Missing innovation ID");
      return;
    }

    // Check authentication status
    if (status !== "authenticated") {
      toast.error("You must be logged in to update this innovation");
      return;
    }

    try {
      setIsLoading(true);

      console.log("Sending update request with data:", {
        id: innovation.id,
        title,
        description,
        detailedDesc,
      });

      // Make API request
      const response = await axios.put(
        "/api/user/innovation",
        {
          id: innovation.id,
          title,
          description,
          detailedDesc,
        },
        {
          withCredentials: true, // Ensure cookies are sent for authentication
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("API Response:", response.data);
      toast.success("Innovation updated successfully!");
      router.refresh(); // Refresh the page to show updated data

      // Close dialog on success
      const closeButton = document.querySelector(
        '[aria-label="Close"]',
      ) as HTMLButtonElement;
      if (closeButton) closeButton.click();
    } catch (error: any) {
      console.error("Error updating innovation:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to update innovation";
      toast.error(errorMessage);

      // Log additional error details
      if (error.response) {
        console.log("Error status:", error.response.status);
        console.log("Error details:", error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      direction="column"
      gap="4"
      className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-transform transform hover:scale-105"
    >
      <Heading>{innovation.title}</Heading>
      <Text>{innovation.description}</Text>
      {innovation.detailedDesc && <Text>{innovation.detailedDesc}</Text>}

      {/* Only show edit button if user is the owner */}
      {isOwner && (
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
            <Dialog.Title>Edit Innovation Contents</Dialog.Title>
            <Flex direction="column" gap="4">
              <Flex direction="column" gap="2">
                <Text className="text-gray-700 dark:text-gray-300">Title:</Text>
                <TextField.Root
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-700"
                />
              </Flex>
              <Flex direction="column" gap="2">
                <Text className="text-gray-700 dark:text-gray-300">
                  Description:
                </Text>
                <TextArea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-700"
                  style={{ minHeight: "80px" }}
                />
              </Flex>
              <Flex direction="column" gap="2">
                <Text className="text-gray-700 dark:text-gray-300">
                  Detailed Description:
                </Text>
                <TextArea
                  value={detailedDesc}
                  onChange={(e) => setDetailedDesc(e.target.value)}
                  className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-700"
                  style={{ minHeight: "120px" }}
                />
              </Flex>
              <Flex justify="center" gap="3" mt="4">
                <Button
                  variant="solid"
                  onClick={handleSave}
                  disabled={isLoading}
                  className="bg-green-500 text-white dark:bg-green-700 hover:bg-green-600 dark:hover:bg-green-800"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
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
