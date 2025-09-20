import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuthThunk } from "../features/auth/authSlice";
import { errorToast } from "../utils/notification";

const PrivateRoute = ({ children }) => {

    const location = useLocation()

    const { authUser, isLoading, initialized } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const verifyUser = async () => {
        const result = await dispatch(checkAuthThunk())
        checkAuthThunk.rejected.match(result) && errorToast(result.payload || "AUTHENTICATION FAILED")
    }

    useEffect(() => {
        if (!initialized) {
            verifyUser()
        }
    }, [dispatch, initialized])

    if (!initialized || isLoading.checkAuth) {
        return (
            <>
                <div className="flex items-center justify-center min-h-screen px-4 bg-[var(--color-bg-base)] text-[var(--color-text-primary)]">
                    <h1 className="uppercase font-light text-3xl text-center my-8">loading...</h1>
                </div >
            </>
        )
    }

    return authUser ? children : <Navigate to={"/login"} replace state={{ from: location }} />
}

export default PrivateRoute
