import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { socket } from "../socket"

const Chat = ({ user }) => {

    const { activeChat } = useSelector(state => state.chatStore)
    const { onlineUsers } = useSelector(state => state.auth)

    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
        const handleTyping = (senderId) => {
            if (senderId === user._id) {
                setIsTyping(true)
            }
        }

        const handleStopTyping = (senderId) => {
            if (senderId === user._id) {
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
        <div className="w-full bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] ">
            <div className={` px-3 sm:px-4 py-2 flex items-center gap-3 sm:gap-4 
                transition-colors cursor-pointer text-[var(--color-text-primary)]
                ${!(activeChat?._id === user._id) && "hover:bg-[var(--color-hover-bg)]"} 
                ${activeChat?._id === user._id && "bg-[var(--color-active-bg)]"}
                `}>
                {/* Avatar */}
                <div className="relative">
                    {onlineUsers?.includes(user._id) && <div className="absolute z-10 right-0 bottom-0 rounded-full bg-green-500 w-[1rem] h-[1rem]" />}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                        <img
                            className="w-full h-full object-cover object-center"
                            src={"/avatar.png" || "https://i.pinimg.com/736x/18/b5/b5/18b5b599bb873285bd4def283c0d3c09.jpg"}
                            alt="user avatar"
                        />
                    </div>
                </div>

                {/* User Info */}
                <div className="flex flex-col overflow-hidden">
                    <h1 className="uppercase font-medium text-sm sm:text-base truncate">
                        {user.username}
                    </h1>
                    <h1 className="uppercase font-mono text-xs sm:text-sm truncate text-[var(--color-text-muted)]">
                        {isTyping ? <p className="italic text-[var(--color-text-muted)]" >{`${user.username} is typing...`}</p> : "last message goes here and will truncate if too long"}
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Chat
