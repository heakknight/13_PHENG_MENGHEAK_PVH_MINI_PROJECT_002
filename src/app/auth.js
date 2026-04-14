import { loginService } from "../service/auth.service";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      async authorize(credentials) {
        const response = await loginService(credentials);
        
        if (response && response.payload) {
          return response;
        }
        
        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user; 
        if (user.payload) {
          token.firstName = user.payload.firstName; 
          token.lastName = user.payload.lastName;
          token.name = `${user.payload.firstName} ${user.payload.lastName}`;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          firstName: token.firstName,
          lastName: token.lastName,
          name: token.name,
          id: token.user?.payload?.userId,
          accessToken: token.user?.payload?.token
        };
      }
      return session;
    }
  }
});