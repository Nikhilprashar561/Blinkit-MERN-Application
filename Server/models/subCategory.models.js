import mongoose from "mongoose";

const subCategotySchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  category: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "category",
    },
  ],
});

const subCategotyModels = mongoose.model("subCategory", subCategotySchema);

export { subCategotyModels };
