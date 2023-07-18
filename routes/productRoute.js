import express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productCountController, productFilterController, productListController, productPhotoController, searchProductController, updateProductController } from "../controller/productController.js";
import ExpressFormidable from "express-formidable";


const router = express.Router()

//routes
router.post('/create-product',ExpressFormidable(),createProductController)
router.put('/update-product/:pid',ExpressFormidable(),updateProductController)
//get products
router.get('/get-product',getProductController)
//single product
router.get('/get-product/:slug',getSingleProductController)
//get-photo
router.get('/product-photo/:pid',productPhotoController)
//delete product
router.delete('/delete-product/:pid',deleteProductController)
//filter product
router.post('/product-filters',productFilterController)
// product count
router.get('/product-count',productCountController)
//product per page
router.get('/product-list/:page',productListController)
//search product
router.get('/search/:keyword',searchProductController)

export default router