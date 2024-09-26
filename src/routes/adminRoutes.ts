import express from "express";
import { updateUser, deleteUser } from "../controllers/adminController";
import { isAdmin } from "../middlewares/auth";

const router = express.Router();

router.delete("/user/:id", isAdmin, deleteUser);
router.patch("/user/:id", isAdmin, updateUser);

export default router;
