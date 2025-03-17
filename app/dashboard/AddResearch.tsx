"use client";
import { Button, Flex, Popover, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddResearch = ({ userId }: { userId: string }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    axios
      .post("/api/user/research", { 
        title, 
        description, 
        researcherId: userId  // Change userId to researcherId here
      })
      .then((r) => {
        toast.success(r.data);
        router.refresh();
      })
      .catch((e) => toast.error(e.data));
  };
  return (
    <>
      <Popover.Root>
        <Popover.Trigger className="mx-12">
          <Button variant="outline">Add New Research</Button>
        </Popover.Trigger>
        <Popover.Content
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96"
          sideOffset={8}
        >
          <Flex direction="column" gap="3">
            <TextField.Root
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md"
              placeholder="Title of the Research"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextArea
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md"
              placeholder="Description of the Research"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
            <Flex justify="center" gap="3" className="mt-4">
              <Popover.Close>
                <Button color="red" variant="soft">
                  Cancel
                </Button>
              </Popover.Close>
              <Popover.Close>
                <Button
                  color="green"
                  variant="solid"
                  onClick={handleSubmit}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Create
                </Button>
              </Popover.Close>
            </Flex>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </>
  );
};

export default AddResearch;
