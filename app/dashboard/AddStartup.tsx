"use client";

import { Button, Dialog, Flex, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosAdd } from "react-icons/io";

const AddStartup = ({ id }: { id: string }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [gstIn, setGstIn] = useState("");
  const [mantra, setMantra] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    await axios
      .post("/api/user/startup", { id, name, desc, gstIn, mantra })
      .catch(() => toast.error("Unable to create Startup"))
      .then(() => {
        toast.success("Startup created");
        router.refresh();
      });
  };

  return (
    <>
      <Dialog.Root>
        <Flex direction={"column"} className="md:mx-44">
          <Dialog.Trigger>
            <Button>
              Add Startup <IoIosAdd size="22" />
            </Button>
          </Dialog.Trigger>
        </Flex>
        <Dialog.Content size="3">
          <Flex direction="column" gap="3">
            <TextField.Root
              placeholder="Name of the Startup"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextArea
              placeholder="Mantra for the startup"
              value={mantra}
              onChange={(e) => setMantra(e.target.value)}
              rows={4}
              required
            />
            <TextArea
              placeholder="Description of the Startup"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={4}
              required
            />
            <TextField.Root
              placeholder="GST IN Number of the startup"
              value={gstIn}
              onChange={(e) => setGstIn(e.target.value)}
              required
            />
            <Flex justify="center" gap="3" className="mt-4">
              <Dialog.Close>
                <Button color="green" variant="soft" onClick={handleSubmit}>
                  Create
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button color="red" variant="outline">
                  Cancel
                </Button>
              </Dialog.Close>
            </Flex>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default AddStartup;
