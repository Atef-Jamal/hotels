import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "./models/user";
import { connectToDB } from "./lib/database";
import bcrypt from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "text" },
        id: { label: "id", type: "text" },
      },
      authorize: async ({ email, password }) => {
        if (!email || !password) {
          throw new Error("credentials Required");
        }

        await connectToDB();
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Invalid Credentials");
        }
        const isMatch = await bcrypt.compare(
          password as string,
          user.password as string
        );

        if (!isMatch) {
          throw new Error("Password Was Wrong!");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.type === "oidc" && profile) {
        try {
          await connectToDB();
          let existingUser = await User.findOne({ email: profile.email });

          if (!existingUser) {
            existingUser = new User({
              name: profile.name,
              email: profile.email,
            });
          }
          const savedUser = await existingUser.save();

          user.id = savedUser.id;
          user.name = savedUser.name;
          user.email = savedUser.email;

          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
