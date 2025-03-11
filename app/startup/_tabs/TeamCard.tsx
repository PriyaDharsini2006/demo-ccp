import { Avatar, Card, Flex, Heading, Text } from "@radix-ui/themes";

const TeamCard = ({
  img,
  name,
  role,
}: {
  img: string;
  name: string;
  role: string;
}) => {
  return (
    <Card>
      <Flex align={"center"} gap={"3"}>
        <Avatar src={img} fallback="H" radius="full" />
        <Flex direction="column">
          <Text weight="bold">{role}</Text>
          <Text weight="light">{name}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default TeamCard;
