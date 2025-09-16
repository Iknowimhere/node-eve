import express from 'express'
import { createConversation, getAllConversation, getConversation } from '../controllers/conversation.controllers.js';
import { auth } from '../middlewares/auth.js';
let router=express.Router()

router.post("/",auth,createConversation)
router.get("/",auth,getAllConversation)
router.get("/:conversationId/messages",auth,getConversation)


export default router;