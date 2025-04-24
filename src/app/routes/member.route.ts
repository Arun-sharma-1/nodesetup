import { Router } from "express";
import { createMember, getUsersOfMember } from "../controllers/member.controller";

const router = Router();

router.post('/create', createMember)
router.get('/userdetails/:id', getUsersOfMember)

export default router;