import express from 'express'
import { createConversation, getConversation } from '../controllers/conversation.controllers.js';
import { auth } from '../middlewares/auth.js';
let router=express.Router()

router.post("/",auth,createConversation)
router.get("/:conversationId",auth,getConversation)

export default router;