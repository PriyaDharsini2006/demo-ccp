import prisma from "@/prisma/client";
import { Card, Flex, Heading, Button } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardNav from "../components/DashboardNav";
import Link from "next/link";
import { IoIosAdd } from "react-icons/io";

const StartupsPage = async () => {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/signin");
  }

  const startups = await prisma.startup.findMany({
    include: {
      user: true
    }
  });

  return (
    <div className="p-4">
      <DashboardNav />
      <Card className="p-6">
        <Flex justify="between" align="center" mb="4">
          <Heading>Startups</Heading>
          <Link href="/dashboard/startups/new">
            <Button color="blue">
              Add Startup <IoIosAdd size="22" />
            </Button>
          </Link>
        </Flex>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {startups.map((startup) => (
            <Card key={startup.id} className="p-4">
              <Heading size="4">{startup.name}</Heading>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{startup.mantra}</p>
              <p className="text-sm text-gray-500 mt-2">By {startup.user.name}</p>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StartupsPage; 