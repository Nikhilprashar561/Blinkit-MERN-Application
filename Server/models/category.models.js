import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        default:""
    },
    image:{
        type: String,
        default:""
    }
}, {timestamps: true})

const categoryModels = mongoose.model("category", categorySchema)

export { categoryModels }