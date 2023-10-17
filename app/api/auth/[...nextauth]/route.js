import { verifyPassword } from "@/lib/utils/auth";
import { conntectToDatabase } from "@/lib/utils/db";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const client = await conntectToDatabase();

        const collection = client.db().collection("users");
        const user = await collection.findOne({ email: credentials.email });

        if (!user) {
          client.close();
          throw new Error("No User Found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Invalid Password");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
