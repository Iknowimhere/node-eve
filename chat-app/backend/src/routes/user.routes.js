import { Router } from "express";
import { getMe, getUsers } from "../controllers/user.contollers.js";
import { auth } from "../middlewares/auth.js";
let router=Router()

router.get("/me",auth,getMe) 
router.get("/",auth,getUsers)
export default router;