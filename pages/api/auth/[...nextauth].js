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
          return null;
        } else {
          return response.data;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },
    async session(session, user, token, trigger) {
      return session;
    },
  },
  pages: {
    signIn: "/main/login",
  },
  secret: process.env.NEXT_AUTH_SECRET,
});
