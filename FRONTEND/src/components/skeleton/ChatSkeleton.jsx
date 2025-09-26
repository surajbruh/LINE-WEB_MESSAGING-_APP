const ChatSkeleton = () => {
    return (
        <div className="w-full bg-[var(--color-bg-surface)]">
            <div
                className={`px-3 sm:px-4 py-2 flex items-center gap-3 sm:gap-4 
          transition-colors cursor-pointer
        `}
            >
                {/* Avatar Skeleton */}
                <div className="relative">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                        <div className="w-full h-full bg-[var(--color-hover-bg)] animate-pulse rounded-full" />
                    </div>
                </div>

                {/* User Info Skeleton */}
                <div className="flex flex-col overflow-hidden flex-1 gap-1">
                    {/* Username skeleton */}
                    <div className="w-24 sm:w-32 h-4 bg-[var(--color-hover-bg)] animate-pulse rounded" />

                    {/* Last message skeleton */}
                    <div className="w-32 sm:w-48 h-3 bg-[var(--color-hover-bg)] animate-pulse rounded" />
                </div>
            </div>
        </div>
    )
}

export default ChatSkeleton
