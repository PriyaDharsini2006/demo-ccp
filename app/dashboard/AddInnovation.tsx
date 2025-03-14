"use client";

import { Button, Flex, Card, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddInnovation = ({ userId }: { userId: string }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await axios.post("/api/user/innovation", { title, description, userId });
      toast.success("Innovation added successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Failed to add innovation.");
    }
  };

  return (
    <Card className="p-6 shadow-lg rounded-lg">
      <Flex direction="column" gap="4">
        <TextField.Root
          placeholder="Name of the Innovation"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="Description of the Innovation"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
        <Flex justify="center" gap="3" className="mt-4">
          <Button color="red" variant="soft" onClick={() => { setTitle(""); setDescription(""); }}>
            Cancel
          </Button>
          <Button color="green" variant="solid" onClick={handleSubmit}>
            Create
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export default AddInnovation;
