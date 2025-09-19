import express from "express"
import protectRoute from "../middlewares/auth.js"
import { getMessages, getUserChats, sendMessage } from "../controllers/chat.controller.js"

const chatRouter = express.Router()
export default chatRouter

chatRouter.use(protectRoute)

chatRouter.get('/chats', getUserChats)
chatRouter.get('/:id', getMessages)
chatRouter.post('/send/:id', sendMessage)
