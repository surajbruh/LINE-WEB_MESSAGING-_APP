import express from "express"
import protectRoute from "../middlewares/auth.js"
import multer from "multer"
import { getProfilePic, setProfilePic } from "../controllers/user.controller.js"

const userRouter = express.Router()
export default userRouter

const upload = multer({ storage: multer.memoryStorage() })

userRouter.use(protectRoute)

userRouter.post('/setProfilePic', upload.single('profilePic'), setProfilePic)
userRouter.get('/getProfilePic', getProfilePic)
