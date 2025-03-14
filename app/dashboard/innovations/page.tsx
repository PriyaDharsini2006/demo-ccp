import prisma from "@/prisma/client";
import { Card, Heading } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardNav from "../components/DashboardNav";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import AddInnovation from "../AddInnovation";
import ListInnovation from "../ListInnovation";

export default async function InnovationsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/signin");
  }

  // Fetch innovations from the database (server-side)
  const innovations = await prisma.innovation.findMany();

  return (
    <div className="p-4">
      <DashboardNav />
      <Card className="p-6">
        <Heading mb="4">Create New Innovation</Heading>
        <AddInnovation userId={session?.user?.id!} />
      </Card>

      {/* Pass fetched innovations to the client component */}
      <ListInnovation innovation={innovations} />
    </div>
  );
}
