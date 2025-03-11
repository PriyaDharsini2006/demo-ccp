"use server";

import prisma from "@/prisma/client";
import { Button, Flex, Tooltip } from "@radix-ui/themes";
import InfoBar from "./InfoBar";
import Performance from "./Performance";
import EditInfo from "./EditInfo";
import Essentials from "./Essentials";

const Page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const startupId = String(searchParams?.id);

  const startup = await prisma.startup.findUnique({
    where: { id: startupId },
    include: { gstInfo: true },
  });

  if (!startup) {
    return <div>Startup not found</div>;
  }
  if (!startup.gstInfo?.id) {
    return <div>No GST Info ID found</div>;
  }

  const invoices = await prisma.invoice.findMany({
    where: { gstInfoId: startup.gstInfo?.id },
  });

  return (
    <Flex className="p-4 w-full" gap="6">
      <Flex
        direction="column"
        gap="4"
        className="p-6 shadow-lg rounded-lg w-5/12"
      >
        <InfoBar startup={startup} />
        <EditInfo startup={startup} />
      </Flex>
      <Flex direction={"column"} gap={"3"} className="w-7/12">
        <Performance invoices={invoices} />
        <Essentials id={startupId} />
        <Tooltip content="Support by giving funds">
          <Button color="green" variant="soft">
            Support
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default Page;
