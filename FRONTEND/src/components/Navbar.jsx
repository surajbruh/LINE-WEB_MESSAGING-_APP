import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { logoutThunk } from "../features/auth/authSlice"
import { successToast, errorToast } from "../utils/notification"
import ThemeToggle from "./ThemeToggle"


const Navbar = () => {
    const { authUser } = useSelector(state => state.auth)
    const { isLoading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()

    const handleLogout = async () => {
        if (isLoading.logout) return
        const result = await dispatch(logoutThunk());

        if (logoutThunk.fulfilled.match(result)) {
            successToast("Logged out successfully");
            navigate('/')
        } else {
            errorToast(result.payload || "Logout failed");
        }
    }

    return (
        <nav id="navbar" className="px-4 py-2 flex items-center justify-between bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] shadow-[var(--shadow-sm)] ">
            {/* Logo */}
            <h1 className="uppercase font-bold text-2xl">
                <Link
                    disabled={isLoading.checkAuth}
                    to={authUser ? "/home" : "/"}>LINE</Link>
            </h1>

            <ul className="flex items-center">
                <li><ThemeToggle /> </li>
                <li>
                    {/* Desktop Menu */}
                    <ul className="hidden md:flex uppercase font-bold gap-6 text-lg">
                        {authUser ? (
                            <>
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <Link to="">Settings</Link>
                                </li>
                                <li>
                                    <button
                                        disabled={isLoading.logout}
                                        onClick={handleLogout}
                                        className="hover:text-red-500 transition uppercase font-bold text-lg"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/signup">Signup</Link>
                                </li>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </li>
                <li>
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden focus:outline-none text-[var(--color-text-primary)] "
                    >
                        {isOpen ? <X size={28} className="text-inherit" /> : <Menu size={28} className="text-inherit" />}
                    </button>

                    {/* Mobile Menu */}
                    {
                        isOpen && (
                            <div className="absolute top-14 left-0 w-full bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] shadow-[var(--shadow-sm)] z-50 md:hidden">
                                <ul className="flex flex-col items-center gap-4 px-4 py-4 uppercase font-bold text-lg">
                                    {authUser ? (
                                        <>
                                            <li>
                                                <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
                                            </li>
                                            <li>
                                                <Link to="" onClick={() => setIsOpen(false)}>Settings</Link>
                                            </li>
                                            <li className="w-full">
                                                <button
                                                    disabled={isLoading.logout}
                                                    onClick={handleLogout}
                                                    className="transition uppercase font-bold text-lg active:bg-[var(--color-text-muted)] text-center w-full"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <Link to="/signup" onClick={() => setIsOpen(false)}>Signup</Link>
                                            </li>
                                            <li>
                                                <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        )
                    }
                </li>
            </ul>
        </nav >
    )
}

export default Navbar
