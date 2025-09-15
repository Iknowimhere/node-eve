import { Router } from "express";
import { getMe } from "../controllers/user.contollers.js";
import { auth } from "../middlewares/auth.js";
let router=Router()

router.get("/me",auth,getMe) 
// router.get("/search",auth,getUsers)//not equal 
export default router;