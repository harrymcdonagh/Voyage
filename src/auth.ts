import NextAuth from "next-auth"
import prisma from "./prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  theme:{
    logo: "/logo.png",
  },
  adapter: PrismaAdapter(prisma),
  providers: [Google, GitHub],
})