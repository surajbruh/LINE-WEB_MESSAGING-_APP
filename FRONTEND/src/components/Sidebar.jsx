import { useState, useEffect } from "react"
import {
    fetchConversationsThunk,
    fetchMessagesThunk, fetchUsersThunk, setActiveChat
} from "../features/chat/chatSlice"
import { useDispatch, useSelector } from "react-redux"
import Chat from "./Chat"
import SearchBar from "./Searchbar"

const Sidebar = () => {

    const [query, setQuery] = useState("");
    const [filteredUser, setFilteredUser] = useState([])

    const handleChange = (e) => {
        const value = e.target.value
        setQuery(value)

        if (!value.trim()) {
            setFilteredUser([])
            return;
        }

        const result = users.filter((user) => {
            if ((user.username).includes(value)) {
                return user
            }
        })
        setFilteredUser(result)
        console.log(query, filteredUser)
    }

    const { authUser } = useSelector(state => state.auth)
    const { users, activeChat, conversations, isLoading } = useSelector(state => state.chatStore)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsersThunk())
        dispatch(fetchConversationsThunk(authUser.id))
    }, [dispatch])

    const handleChat = async (user) => {
        filteredUser && setFilteredUser([])
        if (activeChat?._id === user._id) return
        dispatch(setActiveChat(user))
        dispatch(fetchMessagesThunk(user._id))
    }

    // TODO: MAYBE ADD A BETTER LOADER/LOADING COMPONENT

    return (
        <>
            <div className="relative overflow-y-scroll minimalist-scrollbar">
                <SearchBar handleChange={handleChange} />
                {/* <div>
                    {
                        isLoading.users ?
                            <h1>loading...</h1>
                            :
                            (filteredUser.length > 0) ?
                                filteredUser.map((user) => {
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
                                users.map((user) => {
                                    return (
                                        <li
                                            className="focus:border-2 border-e-amber-500"
                                            onClick={() => handleChat(user)}
                                            key={user._id}>
                                            < Chat user={user} />
                                        </li>
                                    )
                                })
                    }
                </div> */}
                {
                    isLoading.conversations ?
                        <h1>loading...</h1>
                        :
                        (filteredUser.length > 0) ?
                            filteredUser.map((user) => {
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
