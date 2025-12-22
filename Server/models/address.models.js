import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    address_line: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    pincode: {
      type: String,
    },
    mobile: {
      type: Number,
      default: null,
    },
    country: {
      type: String,
    },
    status:{
        type: Boolean,
        default: true
    }
  },
  { timestamps: true }
);

const addressModel = mongoose.model("address", addressSchema);

export { addressModel };