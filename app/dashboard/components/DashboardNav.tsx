"use client";

import { Flex, Button } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardNav = () => {
  const pathname = usePathname();

  const links = [
    { label: "Startups", href: "/dashboard/startups" },
    { label: "Innovations", href: "/dashboard/innovations" },
    { label: "Research", href: "/dashboard/research" },
    { label: "IPR", href: "/dashboard/ipr" },
  ];

  return (
    <Flex gap="4" className="border-b mb-5 px-5 py-3 bg-white dark:bg-gray-800">
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          <Button
            variant={pathname === link.href ? "solid" : "soft"}
            color={pathname === link.href ? "blue" : "gray"}
          >
            {link.label}
          </Button>
        </Link>
      ))}
    </Flex>
  );
};

export default DashboardNav; 