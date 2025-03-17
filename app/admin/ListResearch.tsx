"use client";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const ListResearch = ({ research }: { research: any }) => {
  const router = useRouter();

  return (
    <Flex direction="column" align="center" className="w-full p-6 mx-auto">
      <Grid
        columns={{ sm: "2", md: "3", xl: "4" }} // Grid layout with responsive column count
        gap="6"
        className="w-full"
      >
        {research.map((r: any) => (
          <Flex
            key={r.id}
            direction="column"
            className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => router.push(`/research?id=${r.id}`)}
          >
            <Heading
              align="center"
              size="4"
              className="text-gray-900 dark:text-gray-100 mb-4"
            >
              Title: {r.title}
            </Heading>
            <Text className="text-gray-700 dark:text-gray-300 text-center mb-4">
              Description: {r.description}
            </Text>
            <Text className="text-gray-500 dark:text-gray-400 text-sm text-center">
              Created: {new Date(r.createdAt).toLocaleDateString()}
            </Text>
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
};

export default ListResearch;
