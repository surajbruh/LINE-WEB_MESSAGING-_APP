const Chat = ({ active, username }) => {

    return (
        <div className="w-full bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] ">
            <div className={` px-3 sm:px-4 py-2 flex items-center gap-3 sm:gap-4 
                transition-colors cursor-pointer text-[var(--color-text-primary)]
                ${!active && "hover:bg-[var(--color-hover-bg)]"} 
                ${active && "bg-[var(--color-active-bg)]"}
                `}>
                {/* <div className={` px-3 sm:px-4 py-2 flex items-center gap-3 sm:gap-4 
                transition-colors cursor-pointer text-[var(--color-text-primary)]
                hover:bg-gray-200 dark:hover:bg-[#242e36]
                ${active && "bg-[rgb(24,38,47)]"}
                `}> */}
                {/* Avatar */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                        className="w-full h-full object-cover object-center"
                        src="https://i.pinimg.com/736x/18/b5/b5/18b5b599bb873285bd4def283c0d3c09.jpg"
                        alt="user avatar"
                    />
                </div>

                {/* User Info */}
                <div className="flex flex-col overflow-hidden">
                    <h1 className="uppercase font-medium text-sm sm:text-base truncate">
                        {username}
                    </h1>
                    <h1 className="uppercase font-mono text-xs sm:text-sm truncate text-[var(--color-text-muted)]">
                        last message goes here and will truncate if too long
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Chat
