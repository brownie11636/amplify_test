import https from "https";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const TAG = "NextAuth";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      // id: "portal301APIserver",
      id: "testLogin",
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
        console.log(response)
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
      if (account?.provider === "google") {
        if (user) {
          const account = await axios.get(
            baseURL + `/api/mongo/user?name=${user.name}&email=${user.email}`,
            { httpsAgent: new https.Agent({ rejectUnauthorized: false }) }
          );
          if (account?.data?.result === 0) {
            token.user = { ...user, from: "google", registered: false };
          } else {
            await axios
              .post(
                baseURL + `/api/mongo/login`,
                { id: account?.data?.data?.id, from: "google" },
                { httpsAgent: new https.Agent({ rejectUnauthorized: false }) }
              )
              .then((res) => {
                delete account.data.data.password;
                token = { ...token, accessToken: res.data.accessToken };
                token.user = { ...account.data.data, from: "google", registered: true };
                // console.log(res);
              })
              .catch((err) => {
                // console.log(err);
              });
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
    // signIn: "/user/signin",
    signIn: "/main/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
