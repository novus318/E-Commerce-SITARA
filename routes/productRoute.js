import express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController } from "../controller/productController.js";
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

export default router