import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import db from "./db/db"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { loginSchema } from "./validate"
import bcryptjs from "bcryptjs"

import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";

const adapter = PrismaAdapter(db)

export const { signIn, signOut, auth, handlers  } = NextAuth({ 
    adapter,
    providers: [
    Credentials({
        credentials: {
            email: { label: "email", type: "email" },
            password: { label: "password", type: "password" }
        },
        authorize: async(credentials) => {
            const validateCredentials = loginSchema.safeParse(credentials);
            const user = await db.user.findFirst({
                where: {
                    email: credentials.email,
                }
            })


            if(!user){
                throw new Error("Invalid credentials")
            }

            const isValidPassword = bcryptjs.compare(validateCredentials.data.password, user?.password)
            if(!isValidPassword){
                throw new Error("Invalid credentials")
            }

            return user
        }
    })
], 
callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
});