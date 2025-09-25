export const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL]
export const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: (process.env.NODE_ENV === "production") ? "none" : "strict",
    maxAge: 60 * 60 * 1000
}
