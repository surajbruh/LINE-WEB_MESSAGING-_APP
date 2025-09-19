import supabase from "../config/supbaseClient.js"
import { v4 as uuidv4 } from 'uuid'
import { userModel } from "../models/user.model.js"

export const setProfilePic = async (req, res) => {
    try {
        const file = req.file
        const { id } = req.user

        if (!file) return res.status(409).json({ error: "no file uploaded" })

        const filename = `${uuidv4()}-${file.originalname}`
        const fileOptions = {
            contentType: file.mimetype,
            cacheControl: '3600',
            upsert: false
        }

        const { data, error } = await supabase.storage
            .from("LINE")
            .upload(filename, file.buffer, fileOptions)

        if (error) return res.status(500).json({ error: error.message })

        const { data: signedUrl } = await supabase.storage
            .from("LINE")
            .createSignedUrl(filename, 3600)

        const user = await userModel.findByIdAndUpdate(id, { profilePic: filename }, { new: true }).select("+profilePic")

        res.status(200).json({
            success: true,
            message: "profile pic uploaded successfully",
            path: filename,
        })
    } catch (error) {
        console.error("PROFILE_PIC CONTROLLER ERROR:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }

}

export const getProfilePic = async (req, res) => {
    try {
        const { id } = req.user
        const user = await userModel.findById(id).select("+profilePic")

        if (!user || !user.profilePic) {
            return res.status(404).json({ error: "No profile picture found" })
        }

        const { data, error } = await supabase.storage
            .from("LINE")
            .createSignedUrl(user.profilePic, 1800)

        if (error) return res.status(500).json({ error: error.message })

        res.status(200).json({
            success: true,
            url: data.signedUrl
        })
    } catch (error) {
        console.error("GET_PROFILE_PIC ERROR:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }

}