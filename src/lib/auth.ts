import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
export const { auth, handlers, signIn } = NextAuth({ providers: [Google,
    Credentials({
        credentials: {
            email: {},
            password: {}
        },
        authorize: async(Credentials) => {
            const email = 'alice123@gmail.com';
            const password = 'password123';

            if(Credentials.email === email && Credentials.password === password) {
                return { email, password }
            } else {
                throw new Error('Invalid credentials')
            }
        }
    })
] })