import { Callout, Heading, Tabs } from "@radix-ui/themes";
import { BiInfoCircle } from "react-icons/bi";
import SigninComp from "./SigninComp";
import SignupComp from "./SignupComp";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions"; // Import your auth options
import "server-only";

const Signin = async () => {
  // Pass the auth options to getServerSession for proper typing and session handling
  const session = await getServerSession(authOptions);

  // Redirect authenticated users based on their role
  if (session?.user) {
    if (session.user.isAdmin) {
      redirect("/admin");
    } else {
      redirect("/dashboard");
    }
  }

  return (
    <div className="flex flex-col gap-4 py-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      <Heading
        align="center"
        size="8"
        weight="bold"
        className="text-blue-600 dark:text-blue-400 mt-8"
      >
        Innovation Hub
      </Heading>
      <Heading
        align="center"
        weight="light"
        size="4"
        className="text-gray-700 dark:text-gray-300"
      >
        Unifying Gujarat&apos;s innovation management.
      </Heading>
      <div className="mx-5 sm:mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl my-6 min-h-[33rem] md:h-full flex flex-col justify-center bg-white dark:bg-gray-800 px-6 py-8 rounded-lg shadow-lg">
        <Callout.Root className="mb-6 border-l-4 border-blue-500 bg-blue-50 dark:bg-gray-700">
          <Callout.Icon className="text-blue-500">
            <BiInfoCircle size={24} />
          </Callout.Icon>
          <Callout.Text className="text-blue-700 dark:text-gray-200">
            Login to Register Innovation / Startup / Invest on startup
          </Callout.Text>
        </Callout.Root>
        <Tabs.Root defaultValue="signin">
          {" "}
          {/* Changed default to signin since that's the page name */}
          <Tabs.List
            justify="center"
            highContrast
            className="bg-gray-200 dark:bg-gray-700 rounded-lg p-1 mb-6"
          >
            <Tabs.Trigger
              value="signin"
              className="px-4 py-2 text-gray-700 dark:text-gray-200"
            >
              Sign In
            </Tabs.Trigger>
            <Tabs.Trigger
              value="signup"
              className="px-4 py-2 text-gray-700 dark:text-gray-200"
            >
              Sign Up
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="signin">
            <SigninComp />
          </Tabs.Content>
          <Tabs.Content value="signup">
            <SignupComp />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default Signin;
