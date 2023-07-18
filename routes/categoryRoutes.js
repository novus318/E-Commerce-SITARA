import express from "express";
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
router.get('/single-category/:pid',singleCategoryController)
//delete category
router.delete('/delete-category/:id',deleteCategoryController)

export default router