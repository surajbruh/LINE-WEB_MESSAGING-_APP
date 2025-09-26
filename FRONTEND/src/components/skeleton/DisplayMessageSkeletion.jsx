const DisplayMessageSkeleton = () => {
    return (
        <div className="minimalist-scrollbar bg-[var(--color-bg-base)] text-[var(--color-text-primary)] h-screen overflow-y-scroll px-4">
            <ul className="space-y-8 p-2 sm:p-3 animate-pulse">
                {/* Repeat skeleton bubbles */}
                {[...Array(6)].map((_, i) => (
                    <li
                        key={i}
                        className={`w-full flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
                    >
                        <div className="relative max-w-[70%] sm:max-w-[60%] md:max-w-[45%]">
                            {/* Time skeleton */}
                            <div
                                className={`h-3 w-12 mb-1 rounded bg-[var(--color-hover-bg)] ${i % 2 === 0 ? "ml-auto" : ""
                                    }`}
                            ></div>

                            {/* Message bubble skeleton */}
                            <div
                                className={`p-2 w-max rounded-[8px] shadow-[var(--shadow-md)] ${i % 2 === 0
                                    ? "bg-[var(--color-message-sender)]/40"
                                    : "bg-[var(--color-message-receiver)]/40"
                                    }`}
                            >
                                {/* Optional image skeleton */}
                                {i % 3 === 0 && (
                                    <div className="w-[60vw] sm:w-[40vw] md:w-[25vw] lg:w-[15vw] max-w-[300px] h-32 rounded-xl bg-[var(--color-hover-bg)] mb-2" />
                                )}

                                {/* Text lines */}
                                <div className="h-3 w-28 rounded bg-[var(--color-hover-bg)] mb-1" />
                                <div className="h-3 w-20 rounded bg-[var(--color-hover-bg)]" />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DisplayMessageSkeleton
