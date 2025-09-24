import "dotenv/config"
import mongoose from "mongoose"

const URI = process.env.MONGO_URI || "mongodb://localhost:27017/line"

const connectDB = async () => {
    mongoose.connect(URI)
        .then(() => {
            console.log('DATABASE CONNECTED')
        })
        .catch((err) => {
            console.error('MONGO ERROR', err.message)
        })
}

export default connectDB