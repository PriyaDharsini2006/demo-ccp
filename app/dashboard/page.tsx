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
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = async () => {
  const session = useSession(); 
  const session = await getServerSession();
   useEffect(() => {
    const checkAdminStatus = async () => {
      if (session.status === "authenticated" && session.data?.user?.email) {
        try {
          // Make an API call to check if the user's email exists in the admin table
          const response = await fetch('/api/check-admin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: session.data.user.email }),
          });
          
          const data = await response.json();
          
          if (data.isAdmin) {
            // Redirect to admin page if user is an admin
            window.location.href = '/admin';
            return;
          }
          
          // If not admin, redirect to dashboard (as in your original code)
          redirect('/dashboard');
        } catch (error) {
          console.error('Error checking admin status:', error);
          // Fall back to dashboard redirect if there's an error
          redirect('/dashboard');
        }
      }
      
      setIsLoading(false);
    };

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
