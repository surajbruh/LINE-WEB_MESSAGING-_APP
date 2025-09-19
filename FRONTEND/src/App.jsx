import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import PrivateRoute from "./components/PrivateRoute"
import { ToastContainer } from "react-toastify"
import Navbar from "./components/Navbar"
import ProfilePage from "./pages/ProfilePage"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkAuthThunk } from "./features/auth/authSlice"
import { socket } from "./socket"
import { addMessage } from "./features/chat/chatSlice"

const App = () => {

  const { authUser } = useSelector(state => state.auth)
  const { messages } = useSelector(state => state.chatStore)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!authUser) return

    socket.on("onlineUsers", (users) => {
      console.log(users)
    })

    socket.on("newMessage", (msg) => {
      dispatch(addMessage(msg))
    })

    return () => {
      socket.off("onlineUsers")
      socket.off("newMessage")
    }
  }, [authUser, dispatch])

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-[#111b21] dark:text-white">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Navbar />
        < Routes >
          <Route index element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
            // authUser ? < HomePage /> : <Navigate to="login" />
          } />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />
        </Routes >
      </div>
    </>
  )
}

export default App
