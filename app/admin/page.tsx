import prisma from "@/prisma/client";
import { Card, Heading } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/signin");
  }

  const user = await prisma.admin.findUnique({
    where: {
      email: session?.user.email,
    },
  });

  if (!user) {
    redirect("/");
  }

  return (
    <Card>
      <Heading align="center">Admin</Heading>
    </Card>
  );
};

export default Dashboard;
