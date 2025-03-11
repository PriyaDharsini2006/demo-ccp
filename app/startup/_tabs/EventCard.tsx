import { Card, Flex, Avatar, Text } from "@radix-ui/themes";
import React from "react";

const EventCard = ({
  img,
  title,
  description,
  time,
  place,
}: {
  img: string;
  title: string;
  description: string;
  time: string;
  place: string;
}) => {
  return (
    <Card>
      <Flex justify={"between"}>
        <Flex align={"center"} gap={"3"}>
          <Avatar src={img} fallback="H" />
          <Flex direction="column">
            <Text weight="bold">{title}</Text>
            <Text weight="light">{description}</Text>
          </Flex>
        </Flex>
        <Flex direction="column">
          <Text weight="bold"> {time}</Text>
          <Text> {place}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default EventCard;
