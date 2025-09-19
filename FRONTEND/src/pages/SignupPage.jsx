import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpThunk } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { successToast, errorToast } from "../utils/notification";
import { UserRound, Mail, Key, Eye, EyeClosed } from "lucide-react";

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
        <div className="flex items-center justify-center min-h-screen px-4 bg-[var(--color-bg-base)] text-[var(--color-text-primary)]">
            <div className="w-full max-w-md rounded-xl shadow-md p-6 bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]">
                {/* Header */}
                <h1 className="uppercase font-semibold text-3xl text-center mb-6">
                    Signup
                </h1>

                {/* Form */}
                <form onSubmit={handleSignUp} className="space-y-4">
                    {/* Username */}
                    <div className="flex gap-2 items-center px-2 py-1 border border-[var(--color-primary-border)] rounded-lg focus-within:ring-2 focus-within:ring-green-500">
                        <UserRound className="text-inherit" />
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full outline-none px-2 py-1 bg-transparent placeholder:italic placeholder:uppercase text-sm sm:text-base"
                            placeholder="enter your username"
                            type="text"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="flex gap-2 items-center px-2 py-1 border border-[var(--color-primary-border)] rounded-lg focus-within:ring-2 focus-within:ring-green-500">
                        <Mail className="text-inherit" />
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full outline-none px-2 py-1 bg-transparent placeholder:italic placeholder:uppercase text-sm sm:text-base"
                            placeholder="enter your email"
                            type="email"
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
            </div >
        </div >
    );
};

export default SignupPage;
