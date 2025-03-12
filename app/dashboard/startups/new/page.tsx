import { Card, Heading } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardNav from "../../components/DashboardNav";
import AddStartup from "../AddStartup";

const NewStartupPage = async () => {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/signin");
  }

  return (
    <div className="p-4">
      <DashboardNav />
      <Card className="p-6">
        <Heading mb="4">Create New Startup</Heading>
        <AddStartup id={session.user.id!} />
      </Card>
    </div>
  );
};

export default NewStartupPage; 