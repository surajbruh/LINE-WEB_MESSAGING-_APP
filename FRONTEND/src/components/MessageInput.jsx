import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Send } from "lucide-react"
import { sendMessageThunk } from "../features/chat/chatSlice"

const MessageInput = () => {
    const [text, setText] = useState("")
    const inputRef = useRef(null)

    // const { user } = useSelector((state) => state.user)
    const { activeChat } = useSelector((state) => state.chatStore)

    const dispatch = useDispatch()

    // const senderId = user.id
    const receiverId = activeChat?._id

    const handleMessage = async (e) => {
        e.preventDefault()
        if (!text.trim() || !receiverId) return

        dispatch(sendMessageThunk({ receiver_id: receiverId, payload: text }))
    }

    return (
        <form
            onSubmit={handleMessage}
            className="w-full py-2 px-8 my-4"
        >
            <div className="flex items-center gap-2 sm:gap-3 text-[var(--color-text-primary)] ">
                {/* Input */}
                <input
                    ref={inputRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full outline-none text-sm sm:text-base
                     bg-[var(--color-bg-surface)] placeholder:text-[var(--color-text-muted)] "
                />

                {/* Send Button */}
                <button
                    type="submit"
                    className="p-2 sm:p-3 rounded-full bg-green-600 hover:bg-green-700 
                               active:bg-green-800 text-white transition-colors 
                               flex items-center justify-center"
                >
                    <Send size={18} className="sm:size-5" />
                </button>
            </div>
        </form>
    )
}

export default MessageInput
