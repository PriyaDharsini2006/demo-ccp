"use client";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { GoSignIn } from "react-icons/go";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { useRouter } from "next/navigation";

const SigninComp = () => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    // Check if user is already logged in and redirect accordingly
    if (session?.user) {
      if (session.user.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  }, [session, router]);

  const handleSubmit = async () => {
    if (!mail || !pass) {
      toast.error("Email and password are required");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: mail,
        password: pass,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials");
      } else {
        toast.success("Login successful");

        // The redirect will be handled by the useEffect above
        // We just need to wait for the session to be updated
      }
    } catch (error) {
      toast.error("An error occurred during login");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      direction="column"
      gap="4"
      className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      <TextField.Root
        placeholder="sample@gmail.com"
        type="email"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
        className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md"
      >
        <TextField.Slot>
          <MdOutlineAlternateEmail
            size={18}
            className="text-gray-500 dark:text-gray-300"
          />
        </TextField.Slot>
      </TextField.Root>
      <div className="relative">
        <TextField.Root
          placeholder="Password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="flex items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md"
        >
          <TextField.Slot>
            <IoKeyOutline
              size={18}
              className="text-gray-500 dark:text-gray-300"
            />
          </TextField.Slot>
        </TextField.Root>
      </div>
      <Button
        variant="solid"
        onClick={handleSubmit}
        disabled={isLoading}
        className={`mt-4 w-full py-2 ${
          isLoading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
        } text-white rounded-lg transition-colors duration-300`}
      >
        {isLoading ? "Signing In..." : "Sign In"}
        {!isLoading && <GoSignIn size={18} className="ml-2" />}
      </Button>
    </Flex>
  );
};

export default SigninComp;
