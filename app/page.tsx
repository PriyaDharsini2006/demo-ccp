"use client";

import { Flex, Heading, Skeleton, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const AboutPage = () => {
  const session = useSession();

  if (session.status === "loading") {
    return <Skeleton className="min-h-screen" />;
  }
  if (session.status === "authenticated") {
    redirect("/dashboard");
  }

  return (
    <Flex direction="column" className="bg-gray-50 dark:bg-gray-900">
      <Flex
        direction="column"
        className="py-10 text-center bg-blue-100 dark:bg-blue-900"
      >
        <Heading size="3" className="text-blue-700 dark:text-blue-300">
          Innovating Gujarat: Empowering Progress through Technology
        </Heading>
      </Flex>

      <Flex direction="column" className="container mx-auto p-6 md:p-12">
        <Flex
          direction="column"
          className="mb-8 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
        >
          <Heading size="2" className="text-gray-800 dark:text-gray-200">
            Our Mission
          </Heading>
          <Text className="mt-3 text-gray-600 dark:text-gray-400">
            Our mission is to create a centralized platform that enhances the
            efficiency, transparency, and productivity of Gujarat&apos;s
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
            In an increasingly competitive and fast-paced world, Gujarat&apos;s
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
            We envision a Gujarat where innovation is not just encouraged but
            enabled. A state where the brightest ideas receive the support they
            need to flourish, where intellectual property is protected, and
            where economic growth is driven by the success of our start-ups and
            the brilliance of our research.
          </Text>
        </Flex>
      </Flex>

      <Flex
        direction="column"
        className="text-center py-10 bg-gray-100 dark:bg-gray-800"
      >
        <Text className="text-gray-700 dark:text-gray-300">
          Join us on this journey as we build a more efficient, transparent, and
          supportive environment for research, innovation, and entrepreneurship
          in Gujarat.
        </Text>
      </Flex>
    </Flex>
  );
};

export default AboutPage;
