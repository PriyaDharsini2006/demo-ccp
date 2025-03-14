import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string | null;
      name?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
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
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        // Direct string comparison (INSECURE)
        if (credentials.password !== user.password) {
          throw new Error("Invalid credentials");
        }

        return { id: user.id, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks:{
    jwt: ({ token, user }: any) => {
      console.log(token)

      if (user) {
        token.id = user.id; // ✅ Ensure token stores user.id
      }
      console.log("After jwt callback:", token);
      return token;
    },
    session: ({ session, token }: any) => {
      if (session?.user) {
        console.log("Before session callback:", session);
        session.user.id = token.id;  // ✅ Use `token.id`
      }
      console.log("After session callback:", session);
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET, // Set this in your .env file
  debug: process.env.NODE_ENV === "development",
};

export default authOptions;