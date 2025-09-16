import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
//create a conversation
//group
//one-one
export const createConversation = async (req, res, next) => {
  let { members, name, isGroup } = req.body;
  console.log(members);

  //check whether members is an array and do we atleast one member to initiate chat
  if (!members || !Array.isArray(members) || members.length <= 0) {
    res.status(400).json({ message: "at least one member is required" });
    return;
  }
  //loggedin user is not part of members we need to add him to members array
  if (!members.includes(req.userId)) {
    members.push(req.userId);
  }
  try {
    if (isGroup) {
      if (!name) {
        res
          .status(400)
          .json({ message: "name is required for group conversation" });
        return;
      }
      const newConversation = await Conversation.create({
        members,
        isGroup: true,
        name,
      });
      res.status(201).json(newConversation);
    } else {
      if (members.length !== 2) {
        res.status(400).json({
          message: "for one-one conversation atleast two people are required",
        });
        return;
      }
      let existingConversation = await Conversation.findOne({
        members: { $all: members, $size: 2 },
        isGroup: false,
      });
      if (existingConversation) {
        res.status(200).json(existingConversation);
        return;
      }
      let newConversation = await Conversation.create({
        members,
        isGroup: false,
      });
      res.status(201).json(newConversation);
    }
  } catch (error) {
    console.log("error in convo creation route", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//conversationId--messages
export const getConversation = async (req, res, next) => {
  let { conversationId } = req.params;
  try {

    let messages = await Message.find({ conversationId }).populate(
      "sender",
      "username"
    );
    res.status(200).json(messages);
  } catch (error) {
    console.log("error in convo creation route", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//get all convos
export const getAllConversation = async (req, res, next) => {
  try {
    let conversations = await Conversation.find({ members: req.userId });
    if (!conversations) {
      res.status(400).json({ message: "no conversations found for this user" });
      return;
    }
    res.status(200).json(conversations);
  } catch (error) {
    console.log("error in convo getting route", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//conversationId-Delete
