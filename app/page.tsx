"use client";

import { useState } from "react";
import { Flex, Heading, Skeleton, Text, Button } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AboutPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("home");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      // Check if user is admin and redirect accordingly
      if (session.user.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
    
    // Apply dark mode by default
    document.documentElement.classList.add('dark');
  }, [status, session, router]);

  if (status === "loading") {
    return <Skeleton className="min-h-screen" />;
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <Flex direction="column" className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Navigation */}
      <Flex 
        direction="row" 
        justify="between" 
        align="center" 
        className="sticky top-0 z-10 py-4 px-6 bg-blue-100 dark:bg-blue-950 shadow-md"
      >
        <Heading size="3" className="text-blue-700 dark:text-blue-300">
          Tamil Nadu Innovation Portal
        </Heading>
        
        <Flex gap="4">
          <Button 
            variant={activeSection === "home" ? "solid" : "outline"} 
            onClick={() => setActiveSection("home")}
            className="dark:text-blue-300"
          >
            Home
          </Button>
          <Button 
            variant={activeSection === "about" ? "solid" : "outline"} 
            onClick={() => setActiveSection("about")}
            className="dark:text-blue-300"
          >
            About
          </Button>
          <Button 
            variant="outline" 
            onClick={toggleDarkMode}
            className="ml-4 dark:text-blue-300"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </Flex>
      </Flex>

      {/* Banner */}
      <Flex
        direction="column"
        className="py-10 text-center bg-blue-100 dark:bg-blue-900"
      >
        <Heading size="3" className="text-blue-700 dark:text-blue-300">
          Innovating Tamil Nadu: Empowering Progress through Technology
        </Heading>
      </Flex>

      {/* Main Content Area */}
      <Flex direction="column" className="container mx-auto p-6 md:p-12 flex-grow">
        {activeSection === "home" && (
          <>
            <Flex
              direction="column"
              className="mb-8 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
            >
              <Heading size="2" className="text-gray-800 dark:text-gray-200">
                Welcome to Tamil Nadu Innovation Portal
              </Heading>
              <Text className="mt-3 text-gray-600 dark:text-gray-400">
                This platform serves as a unified hub for researchers, entrepreneurs, innovators, 
                and policymakers across Tamil Nadu. Here, you can access resources, track projects, 
                and connect with the vibrant innovation ecosystem of our state.
              </Text>
            </Flex>

            <Flex
              direction="column"
              className="mb-8 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
            >
              <Heading size="2" className="text-gray-800 dark:text-gray-200">
                Recent Achievements
              </Heading>
              <Text className="mt-3 text-gray-600 dark:text-gray-400">
                <ul className="list-disc pl-5">
                  <li>Over 500 startups supported across Tamil Nadu</li>
                  <li>150+ patents filed through our IPR assistance program</li>
                  <li>₹200 Crore in funding facilitated for innovation projects</li>
                  <li>25 university partnerships established for research collaboration</li>
                </ul>
              </Text>
            </Flex>

            <Flex
              direction="column"
              className="mb-8 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
            >
              <Heading size="2" className="text-gray-800 dark:text-gray-200">
                Upcoming Events
              </Heading>
              <Text className="mt-3 text-gray-600 dark:text-gray-400">
                <ul className="list-disc pl-5">
                  <li><strong>Tamil Nadu Innovation Summit 2025</strong> - Chennai, April 15-17</li>
                  <li><strong>Startup Pitch Competition</strong> - Coimbatore, May 5</li>
                  <li><strong>Research Collaboration Workshop</strong> - Madurai, May 20</li>
                  <li><strong>Innovation Policy Roundtable</strong> - Trichy, June 10</li>
                </ul>
              </Text>
            </Flex>
          </>
        )}

        {activeSection === "about" && (
          <>
            <Flex
              direction="column"
              className="mb-8 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
            >
              <Heading size="2" className="text-gray-800 dark:text-gray-200">
                Our Mission
              </Heading>
              <Text className="mt-3 text-gray-600 dark:text-gray-400">
                Our mission is to create a centralized platform that enhances the
                efficiency, transparency, and productivity of Tamil Nadu&apos;s
                innovation ecosystem. By integrating various functions into a
                seamless interface, we empower researchers, entrepreneurs, and
                policymakers to access the information and resources they need to
                succeed.
              </Text>
            </Flex>

            <Flex
              direction="column"
              className="mb-8 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
            >
              <Heading size="2" className="text-gray-800 dark:text-gray-200">
                What We Do
              </Heading>
              <Text className="mt-3 text-gray-600 dark:text-gray-400">
                <ul className="list-disc pl-5">
                  <li>
                    <strong>Unified Data Repository:</strong> A centralized database
                    where all research projects, patents, innovations, and start-up
                    information are stored.
                  </li>
                  <li>
                    <strong>Transparent Monitoring:</strong> Tools to track the
                    progress of research projects, innovations, and start-ups.
                  </li>
                  <li>
                    <strong>Efficient Resource Allocation:</strong> Mechanisms to
                    optimize resource allocation through real-time data and
                    insights.
                  </li>
                  <li>
                    <strong>IPR Management:</strong> A streamlined process for
                    managing intellectual property rights.
                  </li>
                  <li>
                    <strong>Support for Innovators and Start-ups:</strong> Access to
                    resources, mentorship, and support services.
                  </li>
                  <li>
                    <strong>Collaboration Tools:</strong> Features to enhance
                    collaboration among stakeholders.
                  </li>
                  <li>
                    <strong>Data-Driven Insights:</strong> Analytics and reporting
                    tools for informed decision-making.
                  </li>
                </ul>
              </Text>
            </Flex>

            <Flex
              direction="column"
              className="mb-8 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
            >
              <Heading size="2" className="text-gray-800 dark:text-gray-200">
                Why Choose Us?
              </Heading>
              <Text className="mt-3 text-gray-600 dark:text-gray-400">
                In an increasingly competitive and fast-paced world, Tamil Nadu&apos;s
                growth depends on our ability to innovate and adapt. Our platform
                addresses inefficiencies and fragmentation, offering a dynamic
                solution to the challenges we face. By uniting the state&apos;s
                brightest minds and most ambitious entrepreneurs, we are not just
                keeping pace with the future—we are shaping it.
              </Text>
            </Flex>

            <Flex
              direction="column"
              className="mb-8 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
            >
              <Heading size="2" className="text-gray-800 dark:text-gray-200">
                Our Vision
              </Heading>
              <Text className="mt-3 text-gray-600 dark:text-gray-400">
                We envision a Tamil Nadu where innovation is not just encouraged but
                enabled. A state where the brightest ideas receive the support they
                need to flourish, where intellectual property is protected, and
                where economic growth is driven by the success of our start-ups and
                the brilliance of our research.
              </Text>
            </Flex>
          </>
        )}
      </Flex>

      {/* Footer */}
      <Flex
        direction="column"
        className="text-center py-10 bg-gray-100 dark:bg-gray-800"
      >
        <Text className="text-gray-700 dark:text-gray-300">
          Join us on this journey as we build a more efficient, transparent, and
          supportive environment for research, innovation, and entrepreneurship
          in Tamil Nadu.
        </Text>
      </Flex>
    </Flex>
  );
};

export default AboutPage;