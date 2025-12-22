import express from "express"
import { auth } from "../middlewares/auth.middleware.js"
import { AddCategoryController, deleteCateGoryController, getCategoryController, updateCategoryController } from "../controllers/category.controllers.js"

const router = express.Router()

router.post("/add-category", auth, AddCategoryController)
router.get("/get-category", getCategoryController)
router.put("/update-category", auth, updateCategoryController)
router.delete("/delete-category", auth, deleteCateGoryController)

export default router