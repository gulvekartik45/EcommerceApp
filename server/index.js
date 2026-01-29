import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import dbConnection from "./db/dbConnection.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

dbConnection();


app.get("/", (req, res) => {
  res.send("Backend running");
});


app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
