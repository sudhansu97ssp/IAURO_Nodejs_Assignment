import express from "express";
import {
  addProduct,
  fetchProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { isAdmin } from "../middlewares/auth";

const router = express.Router();

router.post("/", addProduct);
router.get("/", fetchProduct);
router.patch("/:id", isAdmin, updateProduct);
router.delete("/:id", isAdmin, deleteProduct);

export default router;
