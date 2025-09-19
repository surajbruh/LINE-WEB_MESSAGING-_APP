import express from "express"
import { login, logout, register, verify } from "../controllers/auth.controller.js"
import handleValidation from "../middlewares/validate.js"
import { loginValidation, registerValidation } from "../validators/auth.validators.js"
import protectRoute from "../middlewares/auth.js"

const authRoutes = express.Router()
export default authRoutes

authRoutes.post('/register', registerValidation, handleValidation, register)
authRoutes.post('/login', loginValidation, handleValidation, login)
authRoutes.post('/logout', protectRoute, logout)
authRoutes.get('/verify', protectRoute, verify)