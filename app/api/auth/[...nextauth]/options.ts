import { axios } from "@/app/apis/axiosInstance";
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
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        try {
          const data = await axios.post("/login", credentials);
          if (data.data.token) {
            // Any object returned will be saved in `user` property of the JWT
            return data.data.token;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
};

export default options;
