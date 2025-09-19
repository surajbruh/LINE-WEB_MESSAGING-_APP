import jwt from "jsonwebtoken";
import "dotenv/config";

const protectRoute = (req, res, next) => {
    try {
        const token = req.cookies?.userToken;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT ERROR:", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default protectRoute;
