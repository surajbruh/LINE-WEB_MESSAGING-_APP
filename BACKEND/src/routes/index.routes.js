import express from "express"
import authRoutes from "./auth.routes.js"
import chatRouter from "./chat.routes.js"
import userRouter from "./user.routes.js"

const router = express.Router()
export default router

router.use('/api/auth', authRoutes)
router.use('/api/user', userRouter)
router.use('/api', chatRouter)