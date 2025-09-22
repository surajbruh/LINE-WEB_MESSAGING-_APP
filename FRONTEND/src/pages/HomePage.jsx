import { useState } from "react"
import ChatContainer from "../components/ChatContainer"
import Sidebar from "../components/Sidebar"
import { useHeightContext } from "../utils/heightContext"
import { showContext } from "../utils/showContext"

const HomePage = () => {

    const [show, setShow] = useState(false)
    const navHeight = useHeightContext()

    return (
        <>
            <showContext.Provider value={{ show, setShow }}>
                <div
                    style={{ maxHeight: `calc(100vh - ${navHeight}px)` }}
                    className={` flex bg-[var(--color-bg-base)] text-[var(--color-text-muted)]`}>
                    <Sidebar />
                    <ChatContainer />
                </div>
            </showContext.Provider>
        </>

    )
}

export default HomePage
