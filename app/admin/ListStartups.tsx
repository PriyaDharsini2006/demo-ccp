"use client";

import { Box, Card, Flex, Grid, Heading, Inset, Text } from "@radix-ui/themes"; // Import Radix components
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";

const StartupGrid = ({ startup }: { startup: any }) => {
  const router = useRouter();

  return (
    <>
      <Grid
        columns={{ initial: "2", md: "4", xl: "5" }} // Defining responsive grid columns
        gap="6"
        className="w-full overflow-y-scroll hidden-scrollbar"
      >
        {startup.map((s: any) => (
          <Box
            key={s.id}
            className="p-2 shadow-lg rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => router.push(`/startup?id=${s.id}`)}
          >
            <Card size={"2"}>
              <Inset clip="padding-box" side="top" pb="current">
                <CldImage
                  src={s.imageURL ? s.imageURL : ""}
                  width={150}
                  height={100}
                  alt="Image wasn't Available"
                  className="object-cover block w-full h-[180px]"
                />
              </Inset>
              <Flex gap={"3"} direction={"column"}>
                <Heading size={"4"}>{s.name}</Heading>
                <Text>{s.mantra}</Text>
              </Flex>
            </Card>
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default StartupGrid;
