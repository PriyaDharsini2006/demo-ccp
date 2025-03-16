import prisma from "@/prisma/client";
import { Card, Flex, Heading, Button, Text, Box } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import ImageComp from "../_components/userPofiles/ImageComp";
import UserFieldsUpdate from "../_components/userPofiles/UserFieldsUpdate";
import ListStartups from "./ListStartups";
import AddStartup from "./AddStartup";
import ListInnovation from "./ListInnovation";
import AddInnovation from "./AddInnovation";

const Dashboard = async ({ searchParams }) => {
  const session = await getServerSession();
  if (!session) redirect("/signin");

  const view = searchParams?.view || "all"; // Default view shows all users' work
  const category = searchParams?.category || "both"; // Default category shows both types
  const showAddStartup = searchParams?.addStartup === "true";
  const showAddInnovation = searchParams?.addInnovation === "true";

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email!,
    },
    include: {
      startups: true,
      innovations: true,
    },
  });

  // Fetch all startups with detailed info
  let allStartups = [];
  if (view === "all" && (category === "both" || category === "entrepreneur")) {
    allStartups = await prisma.startup.findMany({
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        overview: true,
      },
    });
  } else if (view === "my") {
    // Fetch only user's startups
    allStartups = await prisma.startup.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        overview: true,
      },
    });
  }

  // Fetch all innovations with detailed info
  let allInnovations = [];
  if (view === "all" && (category === "both" || category === "innovator")) {
    allInnovations = await prisma.innovation.findMany({
      include: {
        innovator: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });
  } else if (view === "my") {
    // Fetch only user's innovations
    allInnovations = await prisma.innovation.findMany({
      where: {
        innovatorId: user?.id,
      },
    });
  }

  return (
    <div className="container mx-auto">
      {/* Navigation Buttons */}
      <Flex
        className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
        justify="between"
        wrap="wrap"
        gap="4"
      >
        <Flex gap="2">
          <Link href="?view=all&category=both">
            <Button
              variant={
                view === "all" && category === "both" ? "solid" : "outline"
              }
              color={view === "all" && category === "both" ? "blue" : "gray"}
            >
              All Work
            </Button>
          </Link>
          <Link href="?view=all&category=entrepreneur">
            <Button
              variant={
                view === "all" && category === "entrepreneur"
                  ? "solid"
                  : "outline"
              }
              color={
                view === "all" && category === "entrepreneur" ? "blue" : "gray"
              }
            >
              All Entrepreneurs
            </Button>
          </Link>
          <Link href="?view=all&category=innovator">
            <Button
              variant={
                view === "all" && category === "innovator" ? "solid" : "outline"
              }
              color={
                view === "all" && category === "innovator" ? "blue" : "gray"
              }
            >
              All Innovators
            </Button>
          </Link>
        </Flex>

        <Flex gap="2">
          {user && (
            <>
              <Button
                variant={view === "my" ? "solid" : "outline"}
                color="green"
              >
                <Link
                  href="?view=my"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  My Work
                </Link>
              </Button>
              <Button
                variant={showAddStartup ? "solid" : "outline"}
                color="blue"
              >
                <Link
                  href={`?view=my&addStartup=true`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Add Startup
                </Link>
              </Button>
              <Button
                variant={showAddInnovation ? "solid" : "outline"}
                color="blue"
              >
                <Link
                  href={`?view=my&addInnovation=true`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Add Innovation
                </Link>
              </Button>
            </>
          )}
        </Flex>
      </Flex>

      {/* Add Startup Form when requested */}
      {showAddStartup && user && (
        <Card className="p-6 mb-6">
          <Heading size="5" align="center" className="mb-4">
            Create New Startup
          </Heading>
          <AddStartup id={user?.id!} />
        </Card>
      )}

      {/* Add Innovation Form when requested */}
      {showAddInnovation && user && (
        <Card className="p-6 mb-6">
          <Heading size="5" align="center" className="mb-4">
            Create New Innovation
          </Heading>
          <AddInnovation userId={user?.id!} />
        </Card>
      )}

      {/* Content Area */}
      <div className="space-y-8">
        {/* Entrepreneur Section */}
        {(category === "both" ||
          category === "entrepreneur" ||
          (view === "my" && allStartups.length >= 0)) && (
          <Card className="p-6">
            <Flex justify="between" align="center" className="mb-4">
              <Heading size="5">
                {view === "all" ? "All Startups" : "My Startups"}
              </Heading>
              {view === "my" && user && (
                <Link href={`?view=my&addStartup=true`}>
                  <Button variant="solid" color="green" size="3">
                    + Add New Startup
                  </Button>
                </Link>
              )}
            </Flex>
            <Flex direction="column" gap="6">
              {allStartups.length > 0 ? (
                <ListStartups startup={allStartups} />
              ) : (
                <Box className="p-4 text-center text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-md">
                  {view === "my"
                    ? "You haven't created any startups yet."
                    : "No startups found."}
                </Box>
              )}
            </Flex>
          </Card>
        )}

        {/* Innovator Section */}
        {(category === "both" ||
          category === "innovator" ||
          (view === "my" && allInnovations.length >= 0)) && (
          <Card className="p-6 mt-6">
            <Flex justify="between" align="center" className="mb-4">
              <Heading size="5">
                {view === "all" ? "All Innovations" : "My Innovations"}
              </Heading>
              {view === "my" && user && (
                <Link href={`?view=my&addInnovation=true`}>
                  <Button variant="solid" color="green" size="3">
                    + Add New Innovation
                  </Button>
                </Link>
              )}
            </Flex>
            <Flex direction="column" gap="6">
              {allInnovations.length > 0 ? (
                <ListInnovation innovation={allInnovations} />
              ) : (
                <Box className="p-4 text-center text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-md">
                  {view === "my"
                    ? "You haven't created any innovations yet."
                    : "No innovations found."}
                </Box>
              )}
            </Flex>
          </Card>
        )}

        {/* Show user info when viewing "My Work" */}
        {view === "my" && (
          <Card className="p-6 mt-6">
            <Heading size="5" align="center" className="mb-4">
              My Profile
            </Heading>
            <Flex direction="column" align="center" gap="3">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Text size="6">
                      {user?.fullName?.charAt(0) || user?.email?.charAt(0)}
                    </Text>
                  </div>
                )}
              </div>
              <Text size="5" weight="bold">
                {user?.fullName}
              </Text>
              <Text>{user?.email}</Text>
              <Box className="px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                {user?.userType}
              </Box>

              <Flex gap="4" mt="4">
                <Box className="text-center">
                  <Text size="4" weight="bold">
                    {user?.startups?.length || 0}
                  </Text>
                  <Text size="2" color="gray">
                    Startups
                  </Text>
                </Box>
                <Box className="text-center">
                  <Text size="4" weight="bold">
                    {user?.innovations?.length || 0}
                  </Text>
                  <Text size="2" color="gray">
                    Innovations
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
