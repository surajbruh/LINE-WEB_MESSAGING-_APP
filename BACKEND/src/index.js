import dotenv from "dotenv"
dotenv.config({
    path: "../.env"
})

import express from "express"
import connectDB from "./config/db.config.js"
import router from "./routes/index.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"

import { app, httpServer } from "./socket.js"

const PORT = process.env.PORT || 3000

const allowedOrigins = ["http://localhost:5173"]

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

app.use(cookieParser())

app.use('/', router)

connectDB().then(() => {
    httpServer.listen(PORT, () => {
        console.log(`SERVER IS RUNNING AT PORT ${PORT}`)
    })
})