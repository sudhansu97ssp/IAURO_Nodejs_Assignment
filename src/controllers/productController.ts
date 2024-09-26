import { Request, Response } from "express";
import * as productServices from "../services/productService";

/**
 * Adds a new product based on the provided product data.
 * 
 * @param {Request} req - Express request object containing product details in `req.body` and the authenticated user's ID in `req.user`.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns a success message and the created product if successful, otherwise an error message.
 */
const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productData = { ...req.body, userId: req.user!.id };
    const product = await productServices.addProduct(productData);
    res.status(201).send({ message: "Product created successfully", product });
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
};

/**
 * Fetches a list of products with pagination support.
 * 
 * @param {Request} req - Express request object containing optional `page` and `limit` query parameters for pagination.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns a success message, the list of products, and the total count of products if successful, otherwise an error message.
 */
const fetchProduct = async (req: Request, res: Response): Promise<void> => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const { products, total_count } = await productServices.getVisibleProducts(
      Number(page),
      Number(limit)
    );
    res.status(200).send({
      message: "Products fetched successfully",
      products,
      total_count,
    });
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
};

/**
 * Updates an existing product based on the provided product ID and new data.
 * 
 * @param {Request} req - Express request object containing the product ID in `req.params.id` and updated product data in `req.body`.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns a success message and the updated product if successful, otherwise an error message.
 */
const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productServices.updateProduct(
      req.params.id,
      req.body
    );
    res.status(200).send({ message: "Product updated successfully", products });
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
};

/**
 * Deletes a product based on the provided product ID.
 * 
 * @param {Request} req - Express request object containing the product ID in `req.params.id`.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns a success message and the deleted product if successful, otherwise an error message.
 */
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productServices.deleteProduct(req.params.id);
    res.status(200).send({ message: "Product removed successfully", products });
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
};

export { addProduct, fetchProduct, updateProduct, deleteProduct };
