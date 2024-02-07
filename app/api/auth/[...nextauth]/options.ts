import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const options: AuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const data = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
            credentials,
          );
          if (data.data.data.token) {
            // Any object returned will be saved in `user` property of the JWT
            return data.data.data.token;
          } else {
            return null;
          }
        } catch (error: any) {
          if (error.response.status === 401) {
            console.error("Wrong credentials!");
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.accessToken = user;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: {
    signIn: "../../../sign-in",
  },
};

export default options;
