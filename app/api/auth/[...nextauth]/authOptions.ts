import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Add these type declarations to ensure TypeScript recognizes custom fields
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string | null;
      isAdmin: boolean;
      userType?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    isAdmin: boolean;
    userType?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    isAdmin: boolean;
    userType?: string;
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
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
              isAdmin: true,
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
          id: user.id.toString(), // Ensure ID is always a string
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
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.isAdmin = user.isAdmin;
        if (!user.isAdmin && user.userType) {
          token.userType = user.userType;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.isAdmin = token.isAdmin;
        if (!token.isAdmin && token.userType) {
          session.user.userType = token.userType;
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export default authOptions;

