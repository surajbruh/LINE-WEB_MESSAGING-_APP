import { userModel } from "../models/user.model.js"
import { messageModel } from "../models/message.model.js"
import { getUserSocketId, io } from "../socket.js"

export const getUserChats = async (req, res) => {
    const { id: userId } = req.user
    try {
        const filteredUsers = await userModel.find({ _id: { $ne: userId } })
        res.status(200).json({
            success: true,
            users: filteredUsers
        })
    } catch (error) {
        console.error("CHAT ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: receiverId } = req.params
        const { id: senderId } = req.user

        const messages = await messageModel.find({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId },
            ]
        })
        res.status(200).json({
            success: true,
            messages
        })
    } catch (error) {
        console.error("GET MESSAGES ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params
        const { id: senderId } = req.user

        const { text } = req.body

        const newMessage = await messageModel.create({
            senderId,
            receiverId,
            text,
        })

        res.status(201).json({
            success: true,
            message: "text sent",
            newMessage
        })

        const receiverSocketId = getUserSocketId(receiverId)
        console.log(getUserSocketId(receiverId))

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

    } catch (error) {
        console.error("SEND MESSAGE ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }

}