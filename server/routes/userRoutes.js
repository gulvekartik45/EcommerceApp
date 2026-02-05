import { Router } from "express";
import authentication, { authorization } from "../middleware/authentication.js";
import {
  getUserDetails,
  getCurrentUserProfile,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controller/userController.js";

const userRouter = Router();

userRouter.get("/profile", authentication, getCurrentUserProfile);
userRouter.get("/", authentication, authorization, getAllUsers);
userRouter.get("/:id", authentication, authorization, getUserDetails);
userRouter.put("/:id", authentication, authorization, updateUser);
userRouter.delete("/:id", authentication, authorization, deleteUser);

export default userRouter;
