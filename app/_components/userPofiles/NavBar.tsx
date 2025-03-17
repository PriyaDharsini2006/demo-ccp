"use client";

import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Debug output
  useEffect(() => {
    console.log("Navbar - Session Status:", status);
    console.log("Navbar - Session Data:", session);
  }, [session, status]);

  // Force a re-render when the path changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Handle sign out
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-blue-600 dark:text-blue-400"
              >
                Innovation Hub
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  pathname === "/"
                    ? "border-blue-500 text-gray-900 dark:text-white"
                    : "border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                Home
              </Link>
              
              {session?.user && !session?.user?.isAdmin && (
                <Link
                  href="/dashboard"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                    pathname === "/dashboard"
                      ? "border-blue-500 text-gray-900 dark:text-white"
                      : "border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  Dashboard
                </Link>
              )}
              {session?.user?.isAdmin && (
                <Link
                  href="/admin"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                    pathname === "/admin"
                      ? "border-blue-500 text-gray-900 dark:text-white"
                      : "border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {status === "loading" ? (
              <div className="h-8 w-20 bg-gray-200 dark:bg-gray-600 animate-pulse rounded-md"></div>
            ) : status === "authenticated" && session?.user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 dark:text-gray-300 flex items-center">
                  <FaUserCircle className="mr-2" />
                  {session.user.email}
                </span>
                <Button
                  onClick={handleSignOut}
                  className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md"
                >
                  <FaSignOutAlt className="mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/signin">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                  Sign In / Sign Up
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className={`block pl-3 pr-4 py-2 border-l-4 ${
              pathname === "/"
                ? "border-blue-500 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-gray-700"
                : "border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`block pl-3 pr-4 py-2 border-l-4 ${
              pathname === "/about"
                ? "border-blue-500 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-gray-700"
                : "border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            About
          </Link>
          {session?.user && !session?.user?.isAdmin && (
            <Link
              href="/dashboard"
              className={`block pl-3 pr-4 py-2 border-l-4 ${
                pathname === "/dashboard"
                  ? "border-blue-500 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-gray-700"
                  : "border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              Dashboard
            </Link>
          )}
          {session?.user?.isAdmin && (
            <Link
              href="/admin"
              className={`block pl-3 pr-4 py-2 border-l-4 ${
                pathname === "/admin"
                  ? "border-blue-500 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-gray-700"
                  : "border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              Admin
            </Link>
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          {status === "loading" ? (
            <div className="h-8 w-20 bg-gray-200 dark:bg-gray-600 animate-pulse rounded-md mx-4"></div>
          ) : status === "authenticated" && session?.user ? (
            <div className="flex flex-col space-y-3 px-4">
              <div className="flex items-center">
                <FaUserCircle className="mr-2 text-gray-500 dark:text-gray-300" />
                <span className="text-gray-700 dark:text-gray-300">
                  {session.user.email}
                </span>
              </div>
              <Button
                onClick={handleSignOut}
                className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md"
              >
                <FaSignOutAlt className="mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="px-4">
              <Link href="/signin">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                  Sign In / Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
