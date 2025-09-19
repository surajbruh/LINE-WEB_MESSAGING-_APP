import { useSelector } from "react-redux"

const DisplayMessage = () => {

    const { authUser } = useSelector(state => state.auth)
    const { messages } = useSelector(state => state.chatStore)

    return (
        <div>
            <ul className="space-y-2 p-2 sm:p-3">
                {
                    messages.map((e, index) => {
                        const { senderId, receiverId, createdAt, text } = e
                        return (
                            <li
                                className={`w-full flex ${senderId === authUser.id ? "justify-end" : "justify-items-start"}`}
                                key={index} >
                                <div>
                                    <h1 className="font-extralight text-sm ">{createdAt}</h1>
                                    <div className="px-4 py-2 rounded-[8px] w-max bg-[#144D37]">
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
