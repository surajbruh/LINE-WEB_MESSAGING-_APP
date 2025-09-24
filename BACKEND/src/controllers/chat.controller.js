import { userModel } from "../models/user.model.js"
import { messageModel } from "../models/message.model.js"
import { getUserSocketId, io } from "../socket.js"
import mongoose from "mongoose"
import supabase from "../config/supbaseClient.js"
import { v4 as uuidv4 } from 'uuid'

const { Types } = mongoose

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

        const { message } = req.body
        let mediaUrl = null;

        if (req.file) {
            const { file } = req
            const filename = `${uuidv4()}-${file.originalname}`
            const fileOptions = {
                contentType: file.mimetype,
                cacheControl: '3600',
                upsert: false
            }

            const { data, error } = await supabase.storage
                .from("LINE_AVATAR")
                .upload(filename, file.buffer, fileOptions)

            if (error) return res.status(500).json({
                success: false,
                error: error.message
            })

            const { data: publicUrlData } = supabase.storage
                .from("LINE_AVATAR")
                .getPublicUrl(filename)

            mediaUrl = publicUrlData.publicUrl
        }

        const newMessage = await messageModel.create({
            senderId,
            receiverId,
            text: message || "",
            image: mediaUrl
        })

        res.status(201).json({
            success: true,
            message: "text sent",
            newMessage
        })

        const receiverSocketId = getUserSocketId(receiverId)

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

export const getConversation = async (req, res) => {
    const { userId } = req.params
    const ObjectId = Types.ObjectId

    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, error: "Invalid userId" })
    }

    try {
        const conversations = await messageModel.aggregate([
            {
                $match: {
                    $or: [
                        { senderId: new ObjectId(userId) },
                        { receiverId: new ObjectId(userId) }
                    ]
                }
            },
            {
                $group: {
                    _id: {
                        $cond: {
                            if: { $eq: ["$senderId", new ObjectId(userId)] },
                            then: "$receiverId",
                            else: "$senderId"
                        }
                    },
                    lastMessageTime: { $max: "$createdAt" },
                    lastMessage: { $last: "$text" },
                    lastMessageSender: { $last: "$senderId" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails"
            },
            {
                $project: {
                    partnerId: "$_id",
                    username: "$userDetails.username",
                    avatar: "$userDetails.profilePic",
                    lastMessage: 1,
                    lastMessageTime: 1,
                    lastMessageSender: 1
                }
            }
        ])

        res.status(200).json({
            success: true,
            conversations
        })

    } catch (error) {
        console.error("GET CONVERSATIONS ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}