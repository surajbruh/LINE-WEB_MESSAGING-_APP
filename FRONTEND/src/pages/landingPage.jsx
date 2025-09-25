import { useSelector } from "react-redux"
import { useHeightContext } from "../utils/heightContext"
import { useNavigate } from "react-router-dom"

export default function LandingPage() {

    const { authUser } = useSelector(state => state.auth)
    const navHeight = useHeightContext()

    const navigate = useNavigate()

    const handleClick = () => {
        authUser ? navigate("/home") : navigate("/signup")
    }

    return (
        <div
            style={{ minHeight: `calc(100vh - ${navHeight}px)` }}
            className="min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)] flex flex-col">
            {/* Hero Section */}
            <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-8 py-16 lg:py-28 gap-12">
                <div className="w-full lg:max-w-xl space-y-6 text-center lg:text-left">
                    <h2 className="uppercase text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tighter">
                        Connect with <p className="text-green-500 inline-block">Friends</p>  <br /> Anytime, Anywhere
                    </h2>
                    <p className="text-base sm:text-lg text-[var(--color-text-secondary)] ">
                        LINE is your secure and fast web messaging app. Stay connected, share moments, and chat seamlessly with your friends.
                    </p>
                    <div className="flex justify-center lg:justify-start gap-4">
                        {
                            !authUser &&
                            <button
                                onClick={handleClick}
                                className="px-8 py-2 bg-green-500 hover:bg-green-600 active:bg-green-800 text-white font-bold w-full sm:w-auto">GET STARTED</button>
                        }
                    </div>
                </div>
                <div className="flex flex-1 justify-center">
                    <img
                        src="./LINE_CHAT.png"
                        alt="Messaging app illustration"
                        className="w-56 sm:w-72 lg:w-[50rem] drop-shadow-xl"
                    />
                </div>
            </section>
            {/* Footer */}
            <footer className="mt-auto py-6 bg-[var(--color-bg-surface)] text-center text-sm sm:text-base">
                <p>© {new Date().getFullYear()} LINE Messaging App. All rights reserved.</p>
            </footer>
        </div>
    )
}
