import https from "https";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "testLogin",
      name: "testLogin",
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
          baseURL + "/api/mongo/login",
          {
            id: credentials.id,
            password: credentials.password,
          },
          { httpsAgent: new https.Agent({ rejectUnauthorized: false }) }
        );
        if (!response) {
          console.log(response.data);
          return null;
        } else {
          const { index, id, name, affiliation, part } = response.data.user;
          return { index, id, name, affiliation, part };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session(session, user, token, trigger) {
      console.log(user);
      console.log(token);
      return session;
    },
  },
  pages: {
    signIn: "/main/login",
  },
  secret: process.env.NEXT_AUTH_SECRET,
});
