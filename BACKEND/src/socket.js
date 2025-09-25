import express from "express"
import { createServer } from "http";
import { Server } from "socket.io";
import JWT from "jsonwebtoken"
import "dotenv/config"
import cookie from "cookie"
import { allowedOrigins } from "./utils/utils.js";

const app = express()
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: allowedOrigins,
        credentials: true
    }
});

const userSocketMap = {} //userId = socketId

export const getUserSocketId = (userId) => {
    return userSocketMap[userId]
}

io.use((socket, next) => {
    try {
        const cookies = cookie.parse(socket.handshake.headers.cookie || "")
        const token = cookies.userToken

        if (!token) return next(new Error("Unauthorized: No token found"))

        // Verify JWT
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        if (!decoded) return next(new Error("Unauthorized"))

        // Attach user data to socket for later use
        socket.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Socket auth error:", error.message);
        next(new Error("Unauthorized"));
    }


})

io.on("connection", (socket) => {
    console.log(`${socket.id} connected`)

    if (socket.userId) {
        userSocketMap[socket.userId] = socket.id
        console.log(`connected users: ${Object.keys(userSocketMap)}`)

        io.emit("onlineUsers", Object.keys(userSocketMap))
    }

    socket.on('typing', (e) => {
        const { sender, receiver } = e

        //if receiver is online then only emit the event
        if (Object.keys(userSocketMap).includes(receiver)) {
            const receiverSocketId = getUserSocketId(receiver)
            io.to(receiverSocketId).emit('typing', sender)
        }
    })

    socket.on("stopTyping", (e) => {
        const { sender, receiver } = e

        //if receiver is online then only emit the event
        if (Object.keys(userSocketMap).includes(receiver)) {
            const receiverSocketId = getUserSocketId(receiver)
            io.to(receiverSocketId).emit('stopTyping', sender)
        }
    })

    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`)
        if (socket.userId) {
            delete userSocketMap[socket.userId]

            io.emit("onlineUsers", Object.keys(userSocketMap))
            console.log(`connected users: ${Object.keys(userSocketMap)}`)
        }
    })
})

export { app, httpServer, io }