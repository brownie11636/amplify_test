import https from "https";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const TAG = "NextAuth";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "portal301APIserver",
      type: "credentials",
      credentials: {
        id: { label: "ID", type: "text" },
        password: { label: "PW", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials.id === "admin" && credentials.password === "123") {
          return { id: "admin", name: "test", affiliation: "admin" };
        }
        const response = await axios.post(
          // "https://localhost:3333/api/mongo/login",
          "https://localhost:3333/identityapi/signin",
          {
            id: credentials.id,
            password: credentials.password,
          },
          { httpsAgent: new https.Agent({ rejectUnauthorized: false }) }
        );
        if (!response) {
          return null;
        } else {
          const { index, id, nickname, email, affiliation } = response.data.user;
          // console.log(TAG,"response.data success");
          // console.log(TAG,response.data);
          return { index, id, nickname, email, affiliation };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.user = user;
      }
      token.accessToken = "0000";
      return token;
    },
    async session(session, user, token, trigger) {
      return session;
    },
  },
  pages: {
    signIn: "/user/signin",
  },
  secret: process.env.NEXT_AUTH_SECRET,
});
