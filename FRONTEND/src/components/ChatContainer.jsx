import { MessageSquare } from "lucide-react";
import { useSelector } from "react-redux";
import MessageInput from "./MessageInput";
import DisplayMessage from "./DisplayMessage";
import ActiveChat from "./ActiveChat";

export default function ChatContainer() {

    const { activeChat } = useSelector(state => state.chatStore)

    if (!activeChat) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <div className="text-center p-6 max-w-md">
                    <MessageSquare className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        Welcome to Chat
                    </h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
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
