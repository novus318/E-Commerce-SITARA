import express  from "express";
import {signupController,loginController,testController} from '../controller/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router=express.Router()

router.post('/signup',signupController)

router.post('/login',loginController)

//test routes
router.get('/test',requireSignIn,isAdmin,testController)
export default router