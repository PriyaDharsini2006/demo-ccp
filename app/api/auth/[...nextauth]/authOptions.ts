import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // First check if it's an admin
        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });

        if (admin) {
          // Check admin credentials
          if (credentials.password === admin.password) {
            return {
              id: admin.id.toString(),
              email: admin.email,
              isAdmin: true, // Flag to identify admin users
            };
          }
          throw new Error("Invalid admin credentials");
        }

        // If not admin, check regular user
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        if (credentials.password !== user.password) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          userType: user.userType,
          isAdmin: false,
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.isAdmin = user.isAdmin;
        if (!user.isAdmin) {
          token.userType = user.userType;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string | null,
        isAdmin: token.isAdmin as boolean,
      };

      if (!token.isAdmin) {
        session.user.userType = token.userType as string;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export default authOptions;

