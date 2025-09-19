import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpThunk } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { successToast, errorToast } from "../utils/notification";

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false)

    const { isSigningUp } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault();
        const result = await dispatch(signUpThunk({ username, email, password }));

        if (signUpThunk.fulfilled.match(result)) {
            successToast("Signed up successfully");
            navigate('/login')
        } else {
            errorToast(result.payload || "Sign up failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100 text-gray-900 dark:bg-[#111b21] dark:text-white">
            <div className="w-full max-w-md rounded-xl shadow-md p-6 bg-white dark:bg-[#202c33]">
                {/* Header */}
                <h1 className="uppercase font-semibold text-3xl text-center mb-6">
                    Signup
                </h1>

                {/* Form */}
                <form onSubmit={handleSignUp} className="space-y-4">
                    {/* Username */}
                    <div className="flex gap-2 items-center px-2 py-1 border rounded-lg focus-within:ring-2 focus-within:ring-green-500 dark:border-gray-600">
                        <i className="ri-user-line text-xl"></i>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full outline-none px-2 py-1 bg-transparent placeholder:italic placeholder:uppercase text-sm sm:text-base"
                            placeholder="enter your username"
                            type="text"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="flex gap-2 items-center px-2 py-1 border rounded-lg focus-within:ring-2 focus-within:ring-green-500 dark:border-gray-600">
                        <i className="ri-mail-line text-xl"></i>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full outline-none px-2 py-1 bg-transparent placeholder:italic placeholder:uppercase text-sm sm:text-base"
                            placeholder="enter your email"
                            type="email"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="flex gap-2 items-center px-2 py-1 border rounded-lg focus-within:ring-2 focus-within:ring-green-500 dark:border-gray-600">
                        <i className="ri-key-line text-xl"></i>
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
                            {showPassword ? <i className="ri-eye-line"></i> : <i className="ri-eye-close-line"></i>}
                        </button>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={isSigningUp ? true : false}
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition text-sm sm:text-base font-bold uppercase"
                    >
                        {isSigningUp ? "Signing up.." : "Sign Up"}
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-center text-sm opacity-80">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-green-500 hover:underline font-medium"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div >
    );
};

export default SignupPage;
