import { userModel } from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const existingUser = await userModel.findOne({ $or: [{ username }, { email }] }).lean()
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'user already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error("SIGNUP ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 60 * 1000
}

export const login = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await userModel.findOne({ username }).select("+password").lean()
        if (!user) return res.status(401).json({
            success: false,
            message: "username or password is incorrect"
        })

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) return res.status(401).json({
            success: false,
            message: "username or password is incorrect"
        })

        //generate token
        const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
        }, process.env.JWT_SECRET, { expiresIn: "30min" })

        //saves token on the client side (browser)
        res.cookie('userToken', token, cookieOptions)

        res.status(200).json({
            success: true,
            message: 'user logged in successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

export const logout = (req, res) => {
    const { id, username, email } = req.user
    res.clearCookie('userToken', cookieOptions);
    res.json({
        success: true,
        message: 'user logged out successfully',
        user: {
            id,
            username,
            email
        }
    });
}

export const verify = (req, res) => {
    const { user } = req
    res.status(200).json({
        success: true,
        message: "authorized",
        user
    })
}