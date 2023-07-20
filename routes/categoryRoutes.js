import express from "express";
import ExpressFormidable from "express-formidable";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, singleCategoryPhotoController, updateCategoryController } from "../controller/categoryController.js";
const router=express.Router()

//routes
//createcategory
router.post('/create-category',ExpressFormidable(),createCategoryController)

//update
router.put('/update-category/:pid',ExpressFormidable(),updateCategoryController)
//get all category
router.get('/get-category',categoryController)
//single category
router.get('/single-category/:pid',singleCategoryController)
//category photo
router.get('/category-photo/:pid',singleCategoryPhotoController)
//delete category
router.delete('/delete-category/:id',deleteCategoryController)

export default router