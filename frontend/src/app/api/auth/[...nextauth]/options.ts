import { LOGIN_URL, NEXT_AUTH_SECRECT } from "@/lib/apiEndPoints";
import axios from "axios";
import { AuthOptions, ISODateString, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
// import credentialsProvider from "next-auth/providers/credentials";

export type CustomSession = {
  user?: CustomUser;
  expires: ISODateString;
};

export type CustomUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  token?: string | null;
};

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  debug: true,
  // Configure one or more authentication providers
  callbacks: {
    async session({
      session,
      token,
    }: // user
    {
      session: CustomSession;
      token: JWT;
      user: User;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },
    async jwt({ token, user }: { token: JWT; user: CustomUser }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  secret: NEXT_AUTH_SECRECT,
  providers: [
    Credentials({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { data } = await axios.post(LOGIN_URL, credentials);
        const user = data?.data;
        if (user) {
          return user;
        }
        return null;
      },
    }),

    // ...add more providers here
  ],
};
