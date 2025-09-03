import mongoose from "mongoose";

//schema for simple-app
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: ["stationery", "kitchen", "electronics", "apparels"],
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    isFastMoving: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
); //createdAt updatedAt

//model
let Product = mongoose.model("Product", productSchema);

export default Product