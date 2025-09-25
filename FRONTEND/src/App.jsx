import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import PrivateRoute from "./components/PrivateRoute"
import { ToastContainer } from "react-toastify"
import Navbar from "./components/Navbar"
import ProfilePage from "./pages/ProfilePage"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setOnlineUsers } from "./features/auth/authSlice"
import { socket } from "./socket"
import { addMessage } from "./features/chat/chatSlice"
import heightContext from "./utils/heightContext"
import { getElementHeight } from "./utils/script"
import LandingPage from "./pages/landingPage"

const App = () => {

  const { authUser } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [navHeight, setNavHeight] = useState(null)

  useEffect(() => {
    if (!authUser) return

    socket.on("onlineUsers", (users) => {
      dispatch(setOnlineUsers(users))
    })

    socket.on("newMessage", (msg) => {
      dispatch(addMessage(msg))
    })

    return () => {
      socket.off("onlineUsers")
      socket.off("newMessage")
    }
  }, [authUser, dispatch])

  //TODO: IMPROVE THIS FUNCTON 
  useEffect(() => {
    setNavHeight(getElementHeight("navbar"))
  }, [])

  return (
    <>
      <div className="min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)]">
        <heightContext.Provider value={navHeight}>
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
            <Route index element={<LandingPage />} />
            <Route path="/home" element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            } />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } />
          </Routes >
        </heightContext.Provider>
      </div>
    </>
  )
}

export default App
