// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { connectToDatabase } from "../../../../lib/mongodb";
import User from "../../../models/User"; 

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const db = await connectToDatabase();

        const user = await db.collection("users").findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with that email");
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return { id: user._id, email: user.email, role: user.role };
      },
    }),
  ],

  session: {
    jwt: true, // Use JWT for sessions
  },

  // Add the JWT callback here
  callbacks: {
    async jwt({ token, user }) {
      // If the user object is available (i.e., after sign-in), store user information in the token
      if (user) {
        token.id = user.id; // Store user id in the token
        token.role = user.role; // Store user role in the token
      }
      return token; // Return the updated token
    },

    async session({ session, token }) {
      // Add user information (id and role) to the session
      session.id = token.id;
      session.role = token.role;
      return session; // Return the updated session
    },
  },

  secret: process.env.NEXTAUTH_SECRET, // Secret for JWT encryption
});
