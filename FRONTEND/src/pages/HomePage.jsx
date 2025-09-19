import { useSelector } from "react-redux"
import ChatContainer from "../components/ChatContainer"
import Sidebar from "../components/Sidebar"

const HomePage = () => {
    // TODO: real-time messaging functionationality pull messages from database

    return (
        <>
            <div className="flex ">
                <Sidebar />
                <ChatContainer />
            </div>
        </>

    )
}

export default HomePage
