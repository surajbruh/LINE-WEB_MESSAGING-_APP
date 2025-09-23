import { useState, useEffect } from "react"
import {
    fetchConversationsThunk,
    fetchMessagesThunk, fetchUsersThunk, setActiveChat
} from "../features/chat/chatSlice"
import { useDispatch, useSelector } from "react-redux"
import Chat from "./Chat"
import SearchBar from "./Searchbar"
import { useShowContext } from "../utils/showContext"
import { useHeightContext } from "../utils/heightContext"

const Sidebar = () => {

    const [query, setQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([])

    const { authUser } = useSelector(state => state.auth)
    const { users, activeChat, conversations, isLoading } = useSelector(state => state.chatStore)
    const dispatch = useDispatch()

    const { show, setShow } = useShowContext()

    //filters conversation
    const handleChange = (e) => {
        const value = e.target.value
        setQuery(value)

        if (!value.trim()) {
            setFilteredUsers([])
            return;
        }

        const result = users.filter((user) => {
            if ((user.username).includes(value)) {
                return user
            }
        })

        setFilteredUsers(result)
        console.log(query, filteredUsers)
    }

    const handleChat = async (user) => {
        setShow(true)
        filteredUsers && setFilteredUsers([])
        if (activeChat?._id === user._id) return
        dispatch(setActiveChat(user))
        dispatch(fetchMessagesThunk(user._id))
    }

    //fetches all the users and conversations
    useEffect(() => {
        dispatch(fetchUsersThunk())
        dispatch(fetchConversationsThunk(authUser.id))
    }, [dispatch])

    // TODO: MAYBE ADD A BETTER LOADER/LOADING COMPONENT

    const navHeight = useHeightContext()

    return (
        <>
            <div
                style={{ minHeight: `calc(100vh - ${navHeight}px)` }}
                className="relative w-full sm:w-[30%] overflow-y-scroll minimalist-scrollbar">
                <SearchBar handleChange={handleChange} />
                {
                    isLoading.conversations ?
                        <h1>loading...</h1>
                        :
                        (filteredUsers.length > 0) ?
                            filteredUsers.map((user) => {
                                return (
                                    <li
                                        className="focus:border-2 border-e-amber-500"
                                        onClick={() => handleChat(user)}
                                        key={user._id}>
                                        < Chat user={user} />
                                    </li>
                                )
                            })
                            :
                            conversations?.map((conversation) => {
                                return (
                                    <li
                                        className="focus:border-2 border-e-amber-500"
                                        onClick={() => handleChat(conversation)}
                                        key={conversation._id}>
                                        < Chat user={conversation} />
                                    </li>
                                )
                            })
                }
            </div >
        </>
    )
}

export default Sidebar
