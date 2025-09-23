import supabase from "../config/supbaseClient.js"
import { v4 as uuidv4 } from 'uuid'
import { userModel } from "../models/user.model.js"

export const setProfilePic = async (req, res) => {
    try {
        const file = req.file
        const { id } = req.user

        if (!file) return res.status(409).json({
            success: false,
            error: "no file uploaded"
        })

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

        const user = await userModel.findByIdAndUpdate(id, { profilePic: publicUrlData.publicUrl }, { new: true }).select("+profilePic")

        res.status(200).json({
            success: true,
            message: "profile pic uploaded successfully",
            user
        })
    } catch (error) {
        console.error("PROFILE_PIC CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }

}

export const getAvatar = async (req, res) => {
    try {
        const user = await userModel.findById(req.user?.id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!user.profilePic) {
            return res.status(404).json({
                success: false,
                message: "No profile picture found"
            });
        }

        res.status(200).json({
            success: true,
            avatar: user.profilePic
        })
    } catch (error) {
        console.error("GET_AVATAR CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}
