import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import type { IconType } from "react-icons";

const OverviewCard = ({
  Icon,
  text,
  count,
}: {
  Icon: IconType;
  text: string;
  count: string;
}) => {
  return (
    <Card>
      <Flex align={"center"} gap={"3"}>
        <Icon size={"22"} />
        <Flex direction={"column"}>
          <Text weight={"light"} size={"2"}>
            {text}
          </Text>
          <Text weight={"bold"}>{count}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default OverviewCard;
