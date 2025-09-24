import express from "express"
import protectRoute from "../middlewares/auth.js"
import { getMessages, getUserChats, getConversation, sendMessage } from "../controllers/chat.controller.js"
import upload from "../config/multer.config.js"

const chatRouter = express.Router()
export default chatRouter

chatRouter.use(protectRoute)

chatRouter.get('/chats', getUserChats)
chatRouter.get('/conversations/:userId', getConversation)
chatRouter.get('/:id', getMessages)
chatRouter.post('/send/:id', upload.single("media"), sendMessage)
