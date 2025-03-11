import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import React from "react";
import { CiUser } from "react-icons/ci";
import { PiProjectorScreenChartLight } from "react-icons/pi";

const EditOverview = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="soft">Update Overview</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Insights</Dialog.Title>
        <Dialog.Description>
          Give the Insight of your Company
        </Dialog.Description>
        <Flex direction={"column"} gap={"2"} className="mt-4">
          <Flex direction={"column"}>
            <Text>Number of Employees</Text>
            <TextField.Root placeholder="count of Employees">
              <TextField.Slot>
                <CiUser size={"20"} />
              </TextField.Slot>
            </TextField.Root>
          </Flex>
          <Flex direction={"column"}>
            <Text>Current Projects</Text>
            <TextField.Root placeholder="no of projects">
              <TextField.Slot>
                <PiProjectorScreenChartLight size={"20"} />
              </TextField.Slot>
            </TextField.Root>
          </Flex>
          <Flex direction={"column"}>
            <Text>Previous Projects</Text>
            <TextField.Root placeholder="no of projects">
              <TextField.Slot>
                <PiProjectorScreenChartLight size={"20"} />
              </TextField.Slot>
            </TextField.Root>
          </Flex>
          <Flex direction={"column"}>
            <Text>Funds Railsed</Text>
            <TextField.Root placeholder="no of projects">
              <TextField.Slot>
                <PiProjectorScreenChartLight size={"20"} />
              </TextField.Slot>
            </TextField.Root>
          </Flex>
        </Flex>
        <Flex justify="center" gap="3" mt="4">
          <Dialog.Close>
            <Button color="green" variant="soft">
              Save Changes
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button color="red" variant="outline">
              Cancel Changes
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditOverview;
