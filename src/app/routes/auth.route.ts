import { Router } from "express";
import { login2fa, loginUser, registerUser } from "../controllers/auth.controller";
const router = Router();
router.route('/login').post(loginUser)
router.route('/login2fa').post(login2fa)
router.route('/register').post(registerUser)
export default router;