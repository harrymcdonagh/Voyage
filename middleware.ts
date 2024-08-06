export {default} from "next-auth/middleware";

export const config ={
    matcher: ['/portfolio/:id*', '/watchlist/:id*', '/profile/:id*']
}
