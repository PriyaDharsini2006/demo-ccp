"use client";

import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { start } from "repl";

const softwareTypes = [
  { value: "APPLICATION", label: "Application" },
  { value: "SYSTEM", label: "System" },
  { value: "PLATFORM", label: "Platform" },
  { value: "OTHER", label: "Other" },
];

const domains = [
  { value: "HEALTHCARE", label: "Healthcare" },
  { value: "FINTECH", label: "Fintech" },
  { value: "EDUCATION", label: "Education" },
  { value: "ECOMMERCE", label: "E-commerce" },
  { value: "OTHER", label: "Other" },
];

const EditInfo = ({ startup }: { startup: any }) => {
  const session = useSession();

  const [Name, setName] = useState(startup.name);
  const [description, setDescription] = useState(startup.description);
  const [type, setType] = useState(startup.type || "");
  const [domain, setDomain] = useState(startup.domain || "");
  const [vision, setVision] = useState(startup.vision || "");
  const [mission, setMission] = useState(startup.mission || "");

  const id = startup.id;

  const handleSave = async () => {
    await axios
      .put("/api/user/startup", {
        id,
        Name,
        description,
        type,
        domain,
        vision,
        mission,
      })
      .catch(() => toast.error("Error while Updating content"))
      .then(() => {
        toast.success("Information Updated");
      });
  };

  if (
    session.status !== "authenticated" ||
    session.data.user.id !== startup.userId
  )
    return null;
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="soft">Edit Contents</Button>
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: "500px", width: "100%" }}>
        <Dialog.Title>Edit Startup Profile</Dialog.Title>
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="2">
            <Text size="2" weight="medium">
              Name:
            </Text>
            <TextField.Root
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </Flex>
          <Flex direction="column" gap="2">
            <Text size="2" weight="medium">
              Description:
            </Text>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ minHeight: "80px" }}
            />
          </Flex>
          <Flex direction="column" gap="2">
            <Text size="2" weight="medium">
              Software Type:
            </Text>
            <Select.Root value={type} onValueChange={(value) => setType(value)}>
              <Select.Trigger style={{ width: "100%" }}>
                {type || "Select any one type"}
              </Select.Trigger>
              <Select.Content>
                {softwareTypes.map((option) => (
                  <Select.Item key={option.value} value={option.value}>
                    {option.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>
          <Flex direction="column" gap="2">
            <Text size="2" weight="medium">
              Domain:
            </Text>
            <Select.Root
              value={domain}
              onValueChange={(value) => setDomain(value)}
            >
              <Select.Trigger style={{ width: "100%" }}>
                {domain || "Select any one domain"}
              </Select.Trigger>
              <Select.Content>
                {domains.map((option) => (
                  <Select.Item key={option.value} value={option.value}>
                    {option.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>
          <Flex direction="column" gap="2">
            <Text size="2" weight="medium">
              Vision:
            </Text>
            <TextArea
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              style={{ minHeight: "80px" }}
            />
          </Flex>
          <Flex direction="column" gap="2">
            <Text size="2" weight="medium">
              Mission:
            </Text>
            <TextArea
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              style={{ minHeight: "80px" }}
            />
          </Flex>
          <Flex justify="center" gap="3" mt="4">
            <Dialog.Close>
              <Button color="green" variant="soft" onClick={handleSave}>
                Save Changes
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button color="red" variant="outline">
                Cancel Changes
              </Button>
            </Dialog.Close>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditInfo;
