import { Flex } from "@radix-ui/themes";
import React from "react";
import InfoBar from "./InfoBar";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";

const Innovation = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession();
  const innovation = await prisma.innovation.findUnique({
    where: { id: String(searchParams?.id) },
  });
  return (
    <Flex justify={"between"} className="p-4" gap="6">
      <InfoBar innovation={innovation} userId={session?.user.id!} />
    </Flex>
  );
};

export default Innovation;
