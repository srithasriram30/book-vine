import db from "./db/db"
import { executeAction } from "./executeAction"
import {  registerSchema } from "./validate"
import bcryptjs from "bcryptjs"

export const signUp = async (formData) => {
    return executeAction({
        actionFn: async () => {
            const email = formData.get("email")
            const password = formData.get("password")
            const username = formData.get("username")

            const validateCredentials = registerSchema.safeParse({
                email,
                password,
                username
            });

            if (!validateCredentials.success) {
                throw new Error("Invalid credentials")
            }

            const existingUser = await db.user.findFirst({
                where: {
                    email: validateCredentials.data.email
                }
            })
            if (existingUser) {
                throw new Error("User already exists")
            }

           const hashedPassword = await bcryptjs.hash(validateCredentials.data.password, 10)

            const user = await db.user.create({
                data: {
                    email: validateCredentials.data.email,
                    password: hashedPassword,
                    username: validateCredentials.data.username
                }
            })

            if (!user) {
                throw new Error("User creation failed")
            }
            
            return user;

        }
    })
}
