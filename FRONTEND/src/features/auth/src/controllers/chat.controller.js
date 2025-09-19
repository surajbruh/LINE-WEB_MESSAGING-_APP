import { userModel } from "../models/user.model.js"
import { messsageModel } from "../models/message.model.js"

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

        const messages = await messsageModel.find({
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
    // TODO: DATA VALIDATION AND ERROR HANDLING
    try {
        const { id: receiverId } = req.params
        const { id: senderId } = req.user

        const { text } = req.body

        const newMessage = await messsageModel.create({
            senderId,
            receiverId,
            text,
        })

        res.status(201).json({
            success: true,
            message: "text sent",
            newMessage
        })

    } catch (error) {
        console.error("SEND MESSAGE ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }

}