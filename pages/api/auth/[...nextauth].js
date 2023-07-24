import https from "https";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "test login",
      credentials: {
        id: { label: "ID", type: "text", placeholder: "" },
        password: { label: "PW", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await axios
          .post(
            "https://localhost:3333/api/mongo/login",
            {
              id: credentials.id,
              password: credentials.password,
            },
            { httpsAgent: new https.Agent({ rejectUnauthorized: false }) }
          )
          .then((response) => {
            console.log(response);
            return response;
          })
          .catch((error) => {
            console.log(error);
          });
        if (user) {
          return user.data.user;
        } else {
          console.log(user.data);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXT_AUTH_SECRET,
});
