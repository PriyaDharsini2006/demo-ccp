import { Card, Flex, Avatar, Text } from "@radix-ui/themes";
import React from "react";

const ContributorCard = ({
  img,
  name,
  date,
  amt,
}: {
  img: string;
  name: string;
  date: string;
  amt: number;
}) => {
  return (
    <Card>
      <Flex justify={"between"}>
        <Flex align={"center"} gap={"3"}>
          <Avatar src={img} fallback="H" radius="full" />
          <Flex direction="column">
            <Text weight="bold">{name}</Text>
            <Text weight="light">{date}</Text>
          </Flex>
        </Flex>
        <Text weight="bold">$ {amt}</Text>
      </Flex>
    </Card>
  );
};

export default ContributorCard;
