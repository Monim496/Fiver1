import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectToDatabase } from "../../../lib/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("login");

        // Fetch all users from the collection
        const users = await usersCollection.find().toArray();
        console.log(users);

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("User does not exist with this gmail");
        }

        const isValid = await usersCollection.findOne({
          password: credentials.password,
        });

        if (!isValid) {
          throw new Error("Incorrect password!");
        }

        return { email: user.email };
      },
    }),
  ],

  session: {
    maxAge: 30 * 60, // Set maxAge to 10 seconds
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
