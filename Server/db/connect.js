import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({
    path:'./.env'
})

const MongoConnection = process.env.MONGODB_URL

if(!MongoConnection){
    throw new Error(
        "Sorry MongoDB was not connected"
    )
}

async function connectDB(){
    try {
        const connectionInstances = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`MongoDB was connect at ${connectionInstances.connection.host}`)
    } catch (error) {
        console.log("Database was not Connected" , error)
    }
}

export default connectDB