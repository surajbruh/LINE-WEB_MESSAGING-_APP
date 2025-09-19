import { io } from "socket.io-client";
// import store from "./app/store";
// import { setOnlineUsers } from "./features/auth/authSlice";

const BASE_URL = "http://localhost:4000"
export const socket = io(BASE_URL, {
    withCredentials: true,
    autoConnect: false,
})

export const connectSocket = (userId) => {
    if (socket.connected) return
    socket.connect()
}

export const disconnectSocket = () => {
    if (!socket.connected) return
    socket.disconnect()
}