import { Card, Flex, Heading } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardNav from "./components/DashboardNav";

const Dashboard = async () => {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/signin");
  }

  return (
    <div className="p-4">
      <DashboardNav />
      <Card className="p-6">
        <Heading align="center" mb="4">Welcome to Innovation Hub</Heading>
        <Flex direction="column" gap="4" align="center">
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl">
            Explore startups, innovations, research projects, and IPR applications. 
            Use the navigation bar above to browse different sections or create new entries.
          </p>
        </Flex>
      </Card>
    </div>
  );
};

export default Dashboard;
