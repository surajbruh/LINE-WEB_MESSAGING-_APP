import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHeightContext } from "../utils/heightContext"


const DisplayMessage = () => {

    const { authUser } = useSelector(state => state.auth)
    const { messages } = useSelector(state => state.chatStore)

    const navHeight = useHeightContext()
    // useEffect(() => {

    // }, [])

    return (
        <div className="bg-[var(--color-bg-base)] text-[var(--color-text-primary)] h-screen overflow-y-scroll">
            <ul className="space-y-2 p-2 sm:p-3">
                {
                    messages.map((e, index) => {
                        const { senderId, receiverId, createdAt, text } = e
                        return (
                            <li
                                className={`w-full flex ${senderId === authUser.id ? "justify-end" : "justify-items-start"}`}
                                key={index} >
                                <div className="">
                                    <h1 className="font-extralight text-sm ">{createdAt}</h1>
                                    <div className={`px-4 py-2 rounded-[8px] w-max 
                                        ${senderId === authUser.id ? "bg-[var(--color-message-sender)]" : "bg-[var(--color-message-receiver)] "} 
                                        shadow-[var(--shadow-md)]`}>
                                        <p>{text} </p>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default DisplayMessage
