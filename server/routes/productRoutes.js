import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

import { authentication, authorization } from "../middleware/authentication.js";

const router = Router();

router.get("/", getAllProducts);

router.post("/", authentication, authorization, createProduct);
router.put("/:id", authentication, authorization, updateProduct);
router.delete("/:id", authentication, authorization, deleteProduct);

export default router;
