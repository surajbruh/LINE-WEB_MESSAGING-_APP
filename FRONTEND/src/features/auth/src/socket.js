import express from "express"
import { createServer } from "http";
import { Server } from "socket.io";

const app = express()
const httpServer = createServer(app);

const allowedOrigins = ["http://localhost:5173"]
const io = new Server(httpServer, {
    cors: {
        origin: allowedOrigins,
        credentials: true
    }
});

const userSocketMap = {}

io.on("connection", (socket) => {
    console.log(`${socket.id} connected`)

    const userId = socket.handshake.auth.userId
    if (userId) userSocketMap[userId] = socket.id

    io.emit("onlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`)
        delete userSocketMap.userId
        
        io.emit("onlineUsers", Object.keys(userSocketMap))

    })
})

export { app, httpServer, io }