import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.ObjectId,
        ref:"user"
    }, 
    orderId:{
        type: String,
        required:[true, "Provide OrderId"],
        unique: true
    },
    productId:{
        type: mongoose.Schema.ObjectId,
        ref: "product"
    },
    product_details:{
        name: String,
        image:Array
    },
    payment_id:{
        type: String,
        default:""
    },
    payment_status:{
        type: String,
        default:""
    },
    delivery_address:{
        type: mongoose.Schema.ObjectId,
        ref:"address"
    },
    subTotalAmt:{
        type: Number,
        default: 0
    },
    totalAmt:{
        type: Number,
        default:0
    },
    invoice_recepit:{
        type: String,
        default:""
    }
}, {timestamps: true})

const orderModels = mongoose.model("order", orderSchema)

export { orderModels }