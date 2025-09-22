import { MessageSquare } from "lucide-react";
import { useSelector } from "react-redux";
import MessageInput from "./MessageInput";
import DisplayMessage from "./DisplayMessage";
import ActiveChat from "./ActiveChat";
import { useHeightContext } from "../utils/heightContext";
import { useShowContext } from "../utils/showContext";


export default function ChatContainer() {

    const { activeChat } = useSelector(state => state.chatStore)
    const navHeight = useHeightContext()

    const { show, setShow } = useShowContext()

    if (!activeChat) {
        return (
            <div
                style={{ minHeight: `calc(100vh - ${navHeight}px)` }}
                className={`hidden absolute z-20 w-full sm:relative sm:flex flex-1 items-center justify-center`}>
                <div className="text-center p-6 max-w-md">
                    <MessageSquare className="mx-auto h-16 w-16 mb-4" />
                    <h2 className="text-2xl font-semibold">
                        Welcome to Chat
                    </h2>
                    <p className="mt-2">
                        Select a conversation from the sidebar to start messaging, or create a new chat to begin.
                    </p>
                </div>
            </div>
        )
    }


    return (
        <>
            <div
                style={{ maxHeight: `calc(100vh - ${navHeight}px)` }}
                className={`absolute z-20 sm:relative w-full flex-col ${show ? "flex" : "hidden"}`}>
                {/* activeChat */}
                <ActiveChat />
                {/* display-messages */}
                <DisplayMessage />
                {/* message-input */}
                <MessageInput />
            </div>
        </>
    );
}
