'use server'
import db from "@/lib/db/db"


export const getUsername = async (email: string) => {
    try {   
        const user = await db.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            return {error: 'User not found', success: false, username: null} 
        }


        return {success: true, username: user.username}
        
    } catch (error) {
        console.error("Error fetching username:", error);
        return {error: 'Error fetching username', success: false, username: null} 
    }
}