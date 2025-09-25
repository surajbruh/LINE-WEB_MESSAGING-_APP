import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../features/auth/authSlice";
import { successToast, errorToast } from "../utils/notification";
import { UserRound, Key, Eye, EyeClosed } from "lucide-react";
import { useHeightContext } from "../utils/heightContext";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false)

    const { isLoading } = useSelector(state => state.auth)
    const isLoggingIn = isLoading.login

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginThunk({ username, password }));

        if (loginThunk.fulfilled.match(result)) {
            successToast("Logged in successfully");
            navigate('/home')
        } else {
            errorToast(result.payload || "Login failed");
        }
    };

    const navHeight = useHeightContext()

    return (
        <>
            <div
                style={{ minHeight: `calc(100vh - ${navHeight}px)` }}
                className="flex items-center justify-center px-4 bg-[var(--color-bg-base)] text-[var(--color-text-primary)]">
                <div className="w-full max-w-md rounded-xl shadow-md p-6 bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]">
                    {/* Header */}
                    <h1 className="uppercase font-semibold text-3xl text-center mb-6">
                        Login
                    </h1>
                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Username */}
                        <div className="flex gap-2 items-center px-2 py-1 border border-[var(--color-primary-border)] rounded-lg focus-within:ring-2 focus-within:ring-green-500">
                            {/* <i className="ri-user-line text-xl"></i> */}
                            <UserRound className="text-inherit" />
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full outline-none px-2 py-1 bg-transparent placeholder:italic placeholder:uppercase text-sm sm:text-base"
                                placeholder="enter your username"
                                type="text"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="flex gap-2 items-center px-2 py-1 border border-[var(--color-primary-border)] rounded-lg focus-within:ring-2 focus-within:ring-green-500">
                            <Key className="text-inherit" />
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full outline-none px-2 py-1 bg-transparent placeholder:italic placeholder:uppercase text-sm sm:text-base"
                                placeholder="enter your password"
                                type={showPassword ? "text" : "password"}
                                required
                            />
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setShowPassword(!showPassword)
                                }}>
                                {showPassword ? <Eye className="text-inherit" /> : <EyeClosed className="text-inherit" />}
                            </button>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={isLoggingIn ? true : false}
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition text-sm sm:text-base font-bold uppercase"
                        >
                            {isLoggingIn ? "logging in..." : "login"}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="mt-6 text-center text-sm opacity-80">
                        Don’t have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-green-500 hover:underline font-medium"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
