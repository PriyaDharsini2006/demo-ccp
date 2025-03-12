import prisma from "@/prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ImageComp from "../_components/userPofiles/ImageComp";
import UserFieldsUpdate from "../_components/userPofiles/UserFieldsUpdate";
import ListStartups from "./ListStartups";
import AddStartup from "./AddStartup";
import ListInnovation from "./ListInnovation";
import AddInnovation from "./AddInnovation";

const Dashboard = async () => {
  const session = await getServerSession();

  if (!session) redirect("/signin");

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email!,
    },
  });

  if (user?.userType === "ENTREPRENEUR") {
    const startup = await prisma.startup.findMany({
      where: {
        userId: user?.id,
      },
    });
    return (
      <Card>
        <Heading align={"center"}>Your Startup</Heading>
        <Flex direction="column" className="p-6" gap="6">
          <ListStartups startup={startup} />
          <AddStartup id={user?.id!} />
        </Flex>
      </Card>
    );
  } else if (user?.userType == "INNOVATOR") {
    const innovation = await prisma.innovation.findMany({
      where: { innovatorId: session.user.id },
    });
    return (
      <Flex
        direction="column"
        className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md"
        gap="6"
      >
        <ListInnovation innovation={innovation} />
        <AddInnovation userId={user.id!} />
      </Flex>
    );
  }
};

export default Dashboard;
