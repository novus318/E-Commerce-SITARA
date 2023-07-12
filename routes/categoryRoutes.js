import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controller/categoryController.js";
const router=express.Router()

//routes
//createcategory
router.post('/create-category',createCategoryController)

//update
router.put('/update-category/:id',updateCategoryController)
//get all category
router.get('/get-category',categoryController)
//single category
router.get('/single-category/:slug',singleCategoryController)
//delete category
router.delete('/delete-category/:id',deleteCategoryController)

export default router