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

const ResearchInfoBar = ({ research }: { research: any }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [title, setTitle] = useState(research.title);
  const [description, setDescription] = useState(research.description);
  const [detailedDesc, setDetailedDesc] = useState(research.detailedDesc || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  // Debug session info
  useEffect(() => {
    console.log("Current session status:", status);
    console.log("Session data:", session);
    console.log("Research data:", research);
  }, [session, status, research]);

  // Check ownership when session or research changes
  useEffect(() => {
    if (session?.user?.id && research?.researcherId) {
      const sessionUserId = String(session.user.id);
      const researcherId = String(research.researcherId);
      console.log("Checking ownership:", { sessionUserId, researcherId });
      setIsOwner(sessionUserId === researcherId);
    } else {
      setIsOwner(false);
    }
  }, [session, research]);

  const handleSave = async () => {
    // Validate required data
    if (!research.id) {
      toast.error("Missing research ID");
      return;
    }

    // Check authentication status
    if (status !== "authenticated") {
      toast.error("You must be logged in to update this research");
      return;
    }

    try {
      setIsLoading(true);

      console.log("Sending update request with data:", {
        id: research.id,
        title,
        description,
        detailedDesc,
      });

      // Make API request
      const response = await axios.put(
        "/api/user/research",
        {
          id: research.id,
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
      toast.success("Research updated successfully!");
      router.refresh(); // Refresh the page to show updated data

      // Close dialog on success
      const closeButton = document.querySelector(
        '[aria-label="Close"]',
      ) as HTMLButtonElement;
      if (closeButton) closeButton.click();
    } catch (error: any) {
      console.error("Error updating research:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to update research";
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
      <Heading>{research.title}</Heading>
      <Text>{research.description}</Text>
      {research.detailedDesc && <Text>{research.detailedDesc}</Text>}

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
            <Dialog.Title>Edit Research Contents</Dialog.Title>
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

export default ResearchInfoBar;
