
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Button } from "@radix-ui/themes";import { getServerSession } from "next-auth";
import Link from "next/link";
import StartupGrid from "../ListStartups";
import { redirect } from "next/navigation";
import DashboardNav from "../components/DashboardNav";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";

import AddStartup from "../AddStartup";

const NewStartupPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
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
        <Heading mb="4">Create New Startup</Heading>
        <AddStartup id={session?.user?.id!} />
      </Card>
      
      <StartupGrid startup={startups} />
        
      
    </div>
  );
};

export default NewStartupPage; 