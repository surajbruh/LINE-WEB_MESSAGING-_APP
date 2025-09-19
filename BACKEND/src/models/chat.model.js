import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    lastMessage: {
        type: String
    }
}, { timestamps: true })

export const chatModel = mongoose.model("Chat", chatSchema)