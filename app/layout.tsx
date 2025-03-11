import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "./_components/ThemeProvider";
import NavBar from "./_components/userPofiles/NavBar";
import "./globals.css";
import Session from "./api/auth/[...nextauth]/Session";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Innovative Hub",
  description: "Gujarat RISE(Research, IPR, Start-ups, Entreprenurship)",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={inter.className + "max-h-svh p-0 m-0"}>
        <Session>
          <ThemeProvider>
            <NavBar />
            {children}
            <Toaster position="top-center" />
          </ThemeProvider>
        </Session>
      </body>
    </html>
  );
}
