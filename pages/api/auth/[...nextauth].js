import https from "https";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

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
        const response = await axios.post(
          "https://localhost:3333/api/mongo/login",
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
          return response.data.user;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      // console.log(1);
      // console.log(token);
      // console.log(2);
      // console.log(user);
      // console.log(3);
      // console.log(account);
      // console.log(4);
      // console.log(profile);
      // console.log(5);
      // console.log(isNewUser);

      return token;
    },
    async session(session, user, token, trigger) {
      console.log(trigger);
      return session;
    },
  },
  pages: {
    signIn: "/main/login",
  },
  secret: process.env.NEXT_AUTH_SECRET,
});
