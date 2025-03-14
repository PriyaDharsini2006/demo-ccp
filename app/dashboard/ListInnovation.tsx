"use client";

import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const ListInnovation = ({ innovation }: { innovation: any[] }) => {
  const router = useRouter();

  return (
    <Grid
      columns={{ initial: "2", md: "4", xl: "5" }} 
      gap="6"
      className="w-full overflow-y-scroll hidden-scrollbar p-6"
    >
      {innovation.map((i) => (
        <Box
          key={i.id}
          className="p-2 shadow-lg rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
          onClick={() => router.push(`/innovation?id=${i.id}`)}
        >
          <Card size="2">
            <Flex gap="3" direction="column">
              <Heading size="4">{i.title}</Heading>
              <Text>{i.description}</Text>
            </Flex>
          </Card>
        </Box>
      ))}
    </Grid>
  );
};

export default ListInnovation;
