import { Product } from "../model/productSchema";

export const addProduct = async (productData: any) => {
  const product = new Product(productData);
  return await product.save();
};

export const getVisibleProducts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const products = await Product.find({ hide: false }).skip(skip).limit(limit);
  const total_count = await Product.countDocuments({ hide: false });
  return { products, total_count };
};

export const updateProduct = async (productId: string, updateData: any) => {
  return await Product.findByIdAndUpdate(productId, updateData, { new: true });
};

export const deleteProduct = async (productId: string) => {
  return await Product.findByIdAndDelete(productId);
};
