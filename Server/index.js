import express from "express"
import helmet from "helmet"
import dotenv from "dotenv"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"

import connectDB from "./db/connect.js";

import userRouter from "./routes/user.routee.js"
import cateGoryRouter from "./routes/category.routee.js"
import uploadImageRouter from "./routes/upload.routee.js"
import subCategory from "./routes/subCategory.routee.js"
import productRouter from './routes/product.routee.js'
import cartRouter from './routes/cart.routee.js'
import addressRouter from './routes/address.routee.js'
import orderRouter from './routes/order.routee.js'

dotenv.config({
    path:'./.env'
})

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}))

app.use(helmet({
    crossOriginResourcePolicy: false
}))

app.use("/api/user", userRouter)
app.use("/api/category", cateGoryRouter)
app.use("/api/file", uploadImageRouter)
app.use("/api/subCategory", subCategory)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)
app.use('/api/order',orderRouter)

const PORT = 8080 || process.env.PORT

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server Started at ${PORT}`)
    })
}).catch(()=>{
    throw new Error(
        "Sorry to connect server"
    )
})