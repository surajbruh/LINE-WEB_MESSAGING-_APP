import { useEffect } from "react"
import { useSelector } from "react-redux"

const ActiveChat = () => {

    const { onlineUsers } = useSelector(state => state.auth)
    const { activeChat } = useSelector(state => state.chatStore)
    const { username } = activeChat

    useEffect(() => {
        console.log(onlineUsers.includes(activeChat._id))
    }, [onlineUsers])

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
                    {onlineUsers?.includes(activeChat._id) ? "online" : "offline"}
                </h1>
            </div>
        </div>
    )
}

export default ActiveChat
