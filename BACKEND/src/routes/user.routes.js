import express from "express"
import protectRoute from "../middlewares/auth.js"
import { getAvatar, setProfilePic } from "../controllers/user.controller.js"
import upload from "../config/multer.config.js"

const userRouter = express.Router()
export default userRouter

userRouter.use(protectRoute)

userRouter.post('/setProfilePic', upload.single('profilePic'), setProfilePic)
userRouter.get('/getAvatar', getAvatar)
