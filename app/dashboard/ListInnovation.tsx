"use client";

import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const ListInnovation = ({ innovation }: { innovation: any }) => {
  const router = useRouter();

  return (
    <Flex direction="column" align="center" className="w-full p-6 mx-auto">
      <Grid
        columns={{ sm: "2", md: "3", xl: "4" }} // Grid layout with responsive column count
        gap="6"
        className="w-full"
      >
        {innovation.map((i: any) => (
          <Flex
            key={i.id}
            direction="column"
            className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => router.push(`/innovation?id=${i.id}`)}
          >
            <Heading
              align="center"
              size="4"
              className="text-gray-900 dark:text-gray-100 mb-4"
            >
              Name: {i.title}
            </Heading>
            <Text className="text-gray-700 dark:text-gray-300 text-center mb-4">
              Description: {i.description}
            </Text>
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
};

export default ListInnovation;
