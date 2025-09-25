import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_API_URL
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