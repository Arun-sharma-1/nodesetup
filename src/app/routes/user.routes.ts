import { Router } from "express";
import { getUserDetailById } from "../controllers/user.controllers";

const router = Router();

router.get('/getmemberdetail', getUserDetailById)

export default router;