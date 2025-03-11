import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Logo from "./Logo";
import ThemeSwitch from "./ThemeSwitch";
import UserProf from "./UserProf";
import LoginBtn from "./LoginBtn";

const Header = async () => {
  const session = await getServerSession();
  let user;
  if (session) {
    user = await prisma.user.findUnique({
      where: { email: session?.user.email! },
    });
  }

  return (
    <Flex justify="between" align="center" className="px-2 py-3 shadow-md">
      <Logo />
      <Flex align={"center"} gap="3" className="mx-2">
        <ThemeSwitch />
        {session ? <UserProf user={user} /> : <LoginBtn />}
      </Flex>
    </Flex>
  );
};

export default Header;
