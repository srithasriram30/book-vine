import { auth } from '@/lib/auth'


export const getIsLoggedIn = (status: string) => {
    return status === "authenticated" ? true : false
}
