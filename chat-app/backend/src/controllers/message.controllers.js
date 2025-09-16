import Message from "../models/Message.js";

export const sendMessage = async (req, res, next) => {
  try {
    let { conversationId } = req.params;
    let { text } = req.body;
    const message = await Message.create({
      sender: req.userId,
      text: text,
      conversationId: conversationId,
    });
    res.status(201).json(message);
  } catch (error) {
    console.log("error in message creation route", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
