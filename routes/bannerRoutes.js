import express  from "express";
import ExpressFormidable from "express-formidable";
import { createBannerController, getBannerController, getBannersController, updateBannerController } from "../controller/bannerController.js";


const router = express.Router()
router.post('/create-banner',ExpressFormidable(),createBannerController)

router.put('/update-banner/:pid',ExpressFormidable(),updateBannerController)
router.get('/get-banners',getBannersController)
router.get('/get-banner/:pid',getBannerController)


export default router