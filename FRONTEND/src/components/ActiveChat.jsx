import { useSelector } from "react-redux"

const ActiveChat = () => {

    const { activeChat } = useSelector(state => state.chatStore)
    const { username } = activeChat

    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-[var(--color-active-bg)] text-[var(--color-text-primary)] ">
            <div className="w-[3rem] h-[3rem] overflow-hidden rounded-full">
                <img
                    className="w-full h-full object-cover object-center"
                    src="https://i.pinimg.com/736x/18/b5/b5/18b5b599bb873285bd4def283c0d3c09.jpg" alt="" />
            </div>
            <div className="flex flex-col overflow-hidden">
                <h1 className="uppercase font-medium text-sm sm:text-base truncate">
                    {username}
                </h1>
                <h1 className="uppercase font-mono text-xs sm:text-sm truncate text-[var(--color-text-muted)] ">
                    last seen
                </h1>
            </div>
        </div>
    )
}

export default ActiveChat
