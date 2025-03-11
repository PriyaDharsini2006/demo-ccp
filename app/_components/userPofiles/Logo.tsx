"use client";

import { Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Text
      size="4"
      weight="bold"
      className="cursor-pointer text-blue-600 dark:text-blue-400"
      onClick={() => router.push("/")}
    >
      Innovation Hub
    </Text>
  );
};

export default Logo;
