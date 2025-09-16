import express from 'express'
import { auth } from '../middlewares/auth.js';
import { sendMessage } from '../controllers/message.controllers.js';
let router=express.Router()

//create message--convoId,sender,text
router.post("/:conversationId",auth,sendMessage)

export default router;