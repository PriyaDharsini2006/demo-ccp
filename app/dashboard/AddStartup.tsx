"use client";
import React, { useState } from "react";
import { Button, Dialog, Flex, TextField, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const AddStartup = ({ id }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [gstIn, setGstIn] = useState("");
  const [mantra, setMantra] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !desc || !gstIn || !mantra) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("/api/user/startup", {
        name,
        desc,
        id,
        gstIn,
        mantra,
      });

      if (response.status === 201) {
        toast.success("Startup created successfully!");
        setName("");
        setDesc("");
        setGstIn("");
        setMantra("");
        setOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Error creating startup:", error);
      toast.error(error.response?.data?.message || "Failed to create startup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button color="blue" variant="soft" size="3">
          Add Startup
        </Button>
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: 500 }}>
        <Dialog.Title>Create New Startup</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Fill in the details to create your new startup
        </Dialog.Description>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Startup Name *
              </Text>
              <TextField.Root
                placeholder="Enter startup name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Description *
              </Text>
              <TextField.Root
                placeholder="Describe your startup"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                GST Number *
              </Text>
              <TextField.Root
                placeholder="Enter GST number"
                value={gstIn}
                onChange={(e) => setGstIn(e.target.value)}
                required
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Mantra/Tagline *
              </Text>
              <TextField.Root
                placeholder="Enter a catchy mantra or tagline"
                value={mantra}
                onChange={(e) => setMantra(e.target.value)}
                required
              />
            </label>
            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Startup"}
              </Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddStartup;
