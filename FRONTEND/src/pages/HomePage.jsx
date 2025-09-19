import ChatContainer from "../components/ChatContainer"
import Sidebar from "../components/Sidebar"
import { useHeightContext } from "../utils/heightContext"

const HomePage = () => {

    const navHeight = useHeightContext()

    return (
        <>
            <div
                style={{ maxHeight: `calc(100vh - ${navHeight}px)` }}
                className={` flex bg-[var(--color-bg-base)] text-[var(--color-text-muted)]`}>
                <Sidebar />
                <ChatContainer />
            </div>
        </>

    )
}

export default HomePage
