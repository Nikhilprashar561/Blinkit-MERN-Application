import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  AddSubCategoryController,
  deleteSubCategoryController,
  getSubCategoryController,
  updateSubCategoryController,
} from "../controllers/subCategory.controllers.js";

const router = express.Router();

router.post("/upload-subCategory", auth, AddSubCategoryController);
router.post("/get-subCategory", getSubCategoryController);
router.put("/update", auth, updateSubCategoryController);
router.delete("/delete", auth, deleteSubCategoryController);

export default router;
