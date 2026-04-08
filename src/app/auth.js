import { loginService } from "../service/auth.service";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers:[
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text"},
        password: {label: "Password", type: "password"}
      },

      async authorize(credentials){
        const response = await loginService(credentials);
        if(!response){
          return null;
        }
        return response;
      }
    })
  ],

  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },

  callbacks:{
    async jwt({token,user}){
      if(user){
        token.user = user
      }
      return token;
    },

    async session({session,token}){
      if(token){
        session.user = {
          ...session.user,
          id: token.user.id,
          accessToken: token.user.payload?.token
        };
      }
      return session;
    }
  }
});