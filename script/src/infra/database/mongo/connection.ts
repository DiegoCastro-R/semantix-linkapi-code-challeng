import mongoose from "mongoose";

const MONGO_DB = process.env.MONGO_DB || "";



const connect = async () => {
    await mongoose.connect(MONGO_DB)
}

connect().then(() => {
    console.info("Connected to MongoDB")
}).catch(e => {
    console.error("Error connecting to MongoDB", e)
})