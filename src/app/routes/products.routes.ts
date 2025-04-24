import { Router } from "express";
import {getProductInfo} from '../controllers/product.controllers'
const router = Router();

router.get('/productInfo' , getProductInfo)

export default router;