import { axios } from "@/app/api/axiosInstance";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
          const data = await axios.post("/auth/login", credentials);
          if (data.data.data.token) {
            // Any object returned will be saved in `user` property of the JWT
            return data.data.data.token;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
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
};

export default options;
