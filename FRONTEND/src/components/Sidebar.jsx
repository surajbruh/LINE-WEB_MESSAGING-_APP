import { useEffect } from "react"
import { fetchMessagesThunk, fetchUsersThunk, setActiveChat } from "../features/chat/chatSlice"
import { useDispatch, useSelector } from "react-redux"
import Chat from "./Chat"
import { useHeightContext } from "../utils/heightContext"

const Sidebar = () => {

    const dispatch = useDispatch()

    const { users, activeChat, loadingUsers } = useSelector(state => state.chatStore)

    useEffect(() => {
        dispatch(fetchUsersThunk())
    }, [dispatch])

    const handleChat = async (user) => {
        if (activeChat?._id === user._id) return
        dispatch(setActiveChat(user))
        dispatch(fetchMessagesThunk(user._id))
    }

    // TODO: MAYBE ADD A BETTER LOADER/LOADING COMPONENT

    return (
        <>
            <div className="overflow-y-scroll">
                {
                    loadingUsers ?
                        <h1>loading...</h1>
                        :
                        users.map((user) => {
                            return (
                                <li
                                    className="focus:border-2 border-e-amber-500"
                                    onClick={() => handleChat(user)}
                                    key={user._id}>
                                    < Chat active={activeChat?._id === user._id} username={user.username} />
                                </li>
                            )
                        })
                }
            </div >
        </>
    )
}

export default Sidebar
