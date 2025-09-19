import { useSelector } from "react-redux"

const ActiveChat = () => {

    const { activeChat } = useSelector(state => state.chatStore)
    const { username } = activeChat

    return (
        <div className="bg-[#0a0f13] flex items-center gap-2 px-4 py-2">
            <div className="w-[3rem] h-[3rem] overflow-hidden rounded-full">
                <img
                    className="w-full h-full object-cover object-center"
                    src="https://i.pinimg.com/736x/18/b5/b5/18b5b599bb873285bd4def283c0d3c09.jpg" alt="" />
            </div>
            <div className="flex flex-col overflow-hidden">
                <h1 className="uppercase font-medium text-sm sm:text-base truncate 
                        text-gray-800 dark:text-gray-100">
                    {username}
                </h1>
                <h1 className="uppercase font-mono text-xs sm:text-sm truncate
                        text-gray-500 dark:text-gray-400">
                    last seen
                </h1>
            </div>
        </div>
    )
}

export default ActiveChat
