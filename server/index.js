import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import dbConnection from "./db/dbConnection.js";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js"; // ✅ NEW

const app = express();
const PORT = 3000;

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= DB ================= */
dbConnection();

/* ================= TEST ================= */
app.get("/", (req, res) => {
  res.send("Backend running");
});

/* ================= ROUTES ================= */
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter); // ✅ NEW ORDER ROUTE

/* ================= GLOBAL ERROR ================= */
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    message: err.message || "Server error",
  });
});

/* ================= START ================= */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
