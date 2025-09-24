import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Send } from "lucide-react"
import { sendMessageThunk } from "../features/chat/chatSlice"
import { socket } from "../socket"
import { Image, X } from "lucide-react"

const MessageInput = () => {

    const [text, setText] = useState("")
    const inputRef = useRef(null)
    const typingTimeoutRef = useRef(null)

    const [selectedFile, setSelectedFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    const { authUser } = useSelector(state => state.auth)
    const { activeChat } = useSelector((state) => state.chatStore)
    const dispatch = useDispatch()

    const receiverId = activeChat?._id

    const handleMessage = async (e) => {
        e.preventDefault()
        if (!(text.trim() || selectedFile) || !receiverId) return

        const formData = new FormData()
        formData.append('media', selectedFile)
        formData.append('message', text)

        dispatch(sendMessageThunk({ receiver_id: receiverId, payload: formData }))

        setText("")
        setPreviewUrl(null)
        setSelectedFile(null)

        socket.emit('stopTyping', {
            sender: authUser.id,
            receiver: receiverId
        })
    }

    const handleInput = (e) => {
        setText(e.target.value)
        if (!receiverId) return
        socket.emit('typing', {
            sender: authUser.id,
            receiver: receiverId
        })

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit('stopTyping', {
                sender: authUser.id,
                receiver: receiverId
            })
        }, 1500)
    }

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setSelectedFile(file)
        }
    }

    //creates a temp url
    useEffect(() => {
        if (!selectedFile) return
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreviewUrl(objectUrl)

        return () => { URL.revokeObjectURL(objectUrl) }
    }, [selectedFile])

    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current)
            }
        }
    }, [])

    return (
        <>
            {
                previewUrl && (
                    <div className="bg-[var(--color-bg-glass)] w-full p-2 flex justify-center">
                        <div className="relative w-[10vw] max-w-[200px] aspect-square rounded-[1vmax] overflow-hidden">
                            <button
                                onClick={() => {
                                    setPreviewUrl(null)
                                    setSelectedFile(null)
                                }}
                                className="absolute z-10 top-1 right-1 bg-black/70 hover:bg-black text-white rounded-full p-1 transition"
                                type="button"
                            >
                                <X size={18} />
                            </button>
                            <img
                                className="w-full h-full object-cover object-center"
                                src={previewUrl}
                                alt="Preview"
                            />
                        </div>
                    </div>
                )
            }
            <form
                onSubmit={handleMessage}
                className="w-full py-2 px-8 mb-4"
            >
                <div className="flex items-center gap-2 sm:gap-3 text-[var(--color-text-primary)] ">
                    {/* Input */}
                    <input
                        ref={inputRef}
                        value={text}
                        onChange={handleInput}
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full outline-none text-sm sm:text-base
                     bg-[var(--color-bg-surface)] placeholder:text-[var(--color-text-muted)] "
                    />

                    <button
                        className="p-2 sm:p-3 rounded-full bg-green-600 hover:bg-green-700 
                               active:bg-green-800 text-white transition-colors 
                               flex items-center justify-center"
                        type="button">
                        <label htmlFor="image">
                            <Image />
                        </label>
                        <input
                            onChange={handleChange}
                            hidden
                            type="file"
                            id="image" />
                    </button>

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
        </>
    )
}

export default MessageInput
