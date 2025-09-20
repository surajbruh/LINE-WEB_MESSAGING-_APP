import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { socket } from "../socket"

const ActiveChat = () => {

    const { onlineUsers } = useSelector(state => state.auth)
    const { activeChat } = useSelector(state => state.chatStore)
    const { username } = activeChat

    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
        const handleTyping = (senderId) => {
            console.log(senderId, activeChat._id)
            if (senderId === activeChat._id) {
                setIsTyping(true)
            }
        }

        const handleStopTyping = (senderId) => {
            if (senderId === activeChat._id) {
                setIsTyping(false)
            }
        }

        socket.on('typing', handleTyping)
        socket.on('stopTyping', handleStopTyping)

        return () => {
            socket.off('typing')
            socket.off('stopTyping')
        }
    }, [activeChat])

    return (
        <div className=" flex items-center gap-2 px-4 py-2 bg-[var(--color-active-bg)] text-[var(--color-text-primary)] ">
            <div className="relative">
                <div className="w-[3rem] h-[3rem] overflow-hidden rounded-full">
                    {onlineUsers?.includes(activeChat._id) && <div className="absolute z-10 right-0 bottom-0 rounded-full bg-green-500 w-[1rem] h-[1rem]"></div>}
                    <img
                        className="w-full h-full object-cover object-center"
                        src={"/avatar.png"} alt="" />
                </div>
            </div>
            <div className="flex flex-col overflow-hidden">
                <h1 className="uppercase font-medium text-sm sm:text-base truncate">
                    {username}
                </h1>
                <h1 className="uppercase font-mono text-xs sm:text-sm truncate text-[var(--color-text-muted)] ">
                    {onlineUsers?.includes(activeChat._id) ? `${isTyping ? "typing..." : "online"}` : "offline"}
                </h1>
            </div>
        </div>
    )
}

export default ActiveChat
