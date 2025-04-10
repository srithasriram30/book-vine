export const getIsLoggedIn = (status: string) => {
    return status === "authenticated" ? true : false
}