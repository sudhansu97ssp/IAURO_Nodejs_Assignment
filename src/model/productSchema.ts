import mongoose, { Mongoose } from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  hide: { type: Boolean, default: false },
  price: { type: Number },
  category: { type: String },
  stock: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Product = mongoose.model("product", ProductSchema);
