import { Router } from "express";
import authentication, { authorization } from "../middleware/authentication.js";
import upload from "../middleware/upload.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post(
  "/",
  authentication,
  authorization,
  upload.single("image"),
  createProduct
);

router.put(
  "/:id",
  authentication,
  authorization,
  upload.single("image"),
  updateProduct
);

router.delete("/:id", authentication, authorization, deleteProduct);

export default router;
