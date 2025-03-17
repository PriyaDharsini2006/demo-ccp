import { Flex } from "@radix-ui/themes";
import React from "react";
import ResearchInfoBar from "./InfoBar";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";

const Research = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession();
  const research = await prisma.research.findUnique({
    where: { id: String(searchParams?.id) },
  });

  return (
    <Flex justify={"between"} className="p-4" gap="6">
      <ResearchInfoBar research={research} userId={session?.user.id!} />
    </Flex>
  );
};

export default Research;
