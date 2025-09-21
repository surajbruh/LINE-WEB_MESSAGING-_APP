import { MessageSquare } from "lucide-react";
import { useSelector } from "react-redux";
import MessageInput from "./MessageInput";
import DisplayMessage from "./DisplayMessage";
import ActiveChat from "./ActiveChat";
import { useHeightContext } from "../utils/heightContext";


export default function ChatContainer() {

    const { activeChat } = useSelector(state => state.chatStore)
    const navHeight = useHeightContext()

    if (!activeChat) {
        return (
            <div
                style={{ minHeight: `calc(100vh - ${navHeight}px)` }}
                className="flex flex-1 items-center justify-center">
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
            <div className="w-full flex flex-col">
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
