import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuthThunk } from "../features/auth/authSlice";
import { errorToast } from "../utils/notification";

const PrivateRoute = ({ children }) => {

    const { authUser, isLoading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const verifyUser = async () => {
        const result = await dispatch(checkAuthThunk())
        checkAuthThunk.rejected.match(result) && errorToast(result.payload || "AUTHENTICATION FAILED")
    }

    useEffect(() => {
        console.log('verify')
        verifyUser()
    }, [dispatch])

    if (isLoading.checkAuth) {
        return (
            <>
                <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100 text-gray-900 dark:bg-[#111b21] dark:text-white">
                    <h1 className="uppercase font-light text-3xl text-center my-8">loading...</h1>
                </div >
            </>
        )
    }

    return authUser ? children : <Navigate to={"/login"} />
}

export default PrivateRoute
