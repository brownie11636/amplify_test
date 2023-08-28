import https from "https";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_URL;
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      id: "testLogin",
      name: "testLogin",
      type: "credentials",
      credentials: {
        id: { label: "ID", type: "text" },
        password: { label: "PW", type: "password" },
        autoLogin: { label: "자동 로그인", type: "checkbox" },
      },
      async authorize(credentials, req) {
        if (credentials.id === "admin" && credentials.password === "123") {
          return {
            id: "admin",
            accessToken: "admin",
            user: { name: "admin", affiliation: "admin" },
          };
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
      console.log(token, user, account);
      if (account?.provider === "google") {
        if (user) {
          const account = await axios.get(
            baseURL + `/api/mongo/user?name=${user.name}&email=${user.email}&id=${user.id}`
          );
          if (account?.data) {
            token.user = { ...user, ...account.data };
          } else {
            await axios
              .get(baseURL + `/api/mongo/token?name=${user.name}&email=${user.email}`)
              .then((res) => {
                console.log(res.data);
                token.user = { ...user, ...res.data };
              })
              .catch((err) => {
                console.log(err);
              });
            token.user = { ...user, from: "google" };
          }
        }
        return token;
      } else {
        if (user) {
          token = { ...token, ...user };
        }
        return token;
      }
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
