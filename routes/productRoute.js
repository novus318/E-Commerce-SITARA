import express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, getProductController, getSingleProductController, productPhotoController } from "../controller/productController.js";
import ExpressFormidable from "express-formidable";


const router = express.Router()

//routes
router.post('/create-product',requireSignIn,isAdmin,ExpressFormidable(),createProductController)

//get products
router.get('/get-product',getProductController)
//single product
router.get('/get-product/:slug',getSingleProductController)
//get-photo
router.get('/product-photo/:pid',productPhotoController)
//delete product


export default router