import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./config/db";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import productRoutes from "./routes/productRoutes";
import { auth } from "./middlewares/auth";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const url = process.env.DB_URL || "";

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/admin", auth, adminRoutes);
app.use("/api/product", auth, productRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  dbConnect(url);
});
