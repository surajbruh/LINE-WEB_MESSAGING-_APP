import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { formatMessageTime } from "../utils/script"

const DisplayMessage = () => {

    const { authUser } = useSelector(state => state.auth)
    const { messages } = useSelector(state => state.chatStore)

    const bottomRef = useRef(null)

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])


    return (
        <div className="minimalist-scrollbar bg-[var(--color-bg-base)] text-[var(--color-text-primary)] h-screen overflow-y-scroll px-4">
            <ul className="space-y-8 p-2 sm:p-3">
                {
                    messages.map((msg, index) => {
                        const { senderId, createdAt, text } = msg
                        return (
                            <li
                                className={`w-full flex ${senderId === authUser.id ? "justify-end" : "justify-items-start"}`}
                                key={index} >
                                <div className="relative">
                                    <p className={`text-xs text-[var(--color-text-muted)] ${senderId === authUser.id && "text-right"} `}>{formatMessageTime(createdAt)}</p>
                                    <div className={`px-2 py-1 rounded-[8px] w-max 
                                        ${senderId === authUser.id ? "bg-[var(--color-message-sender)]" : "bg-[var(--color-message-receiver)]"} 
                                        shadow-[var(--shadow-md)]`}>
                                        <p className="">{text} </p>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <div ref={bottomRef} />
        </div>
    )
}

export default DisplayMessage
